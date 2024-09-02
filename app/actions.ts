'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { z } from 'zod';
import prisma from './lib/db';
import { CategoryTypes, Condition } from '@prisma/client';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';

export type State = {
  status: 'error' | 'success' | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'The name has to be a min character length of 3' }),
  category: z.string().min(1, { message: 'Category is required' }),
  price: z.number().min(1, { message: 'The Price has to be a min value of 1' }),
  condition: z.string().min(1, { message: 'Condition is required' }),
  smallDescription: z.string().min(10, {
    message: 'Please enter a summary of at least 10 characters',
  }),
  description: z.string().min(1, {
    message: 'Please enter a description of at least 10 characters',
  }),
  images: z.array(z.string(), {
    message: 'You need at least one image for your product',
  }),
  productFile: z
    .string()
    .min(1, { message: 'Please upload a zip of your product' }),
});

const userSettingsSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'Minimum length of 3 required' })
    .or(z.literal(''))
    .optional(),
  lastName: z
    .string()
    .min(3, { message: 'Minimum length of 3 required' })
    .or(z.literal(''))
    .optional(),
});

export async function SellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error('Something went wrong');
  }

  const validateFields = productSchema.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    price: Number(formData.get('price')),
    condition: formData.get('condition'),
    smallDescription: formData.get('smallDescription'),
    description: formData.get('description'),
    images: JSON.parse(formData.get('images') as string),
    productFile: formData.get('productFile'),
  });

  if (!validateFields.success) {
    const state: State = {
      status: 'error',
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Oops, I think there is a mistake with your inputs.',
    };

    return state;
  }

  const data = await prisma.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CategoryTypes,
      smallDescription: validateFields.data.smallDescription,
      condition: validateFields.data.condition as Condition,
      price: validateFields.data.price,
      images: validateFields.data.images,
      productFile: validateFields.data.productFile,
      userId: user.id,
      description: JSON.parse(validateFields.data.description),
    },
  });

  return redirect(`/product/${data.id}`);
}

export async function UpdateUserSettings(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error('Something went wrong');
  }

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  });

  if (!validateFields.success) {
    const state: State = {
      status: 'error',
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Oops, I think there is a mistake with your inputs.',
    };
    return state;
  }

  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });

  const state: State = {
    status: 'success',
    message: 'Your settings have been updated successfully!',
  };

  return state;
}

export async function BuyProduct(formData: FormData) {
  const id = formData.get('id') as string;
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      smallDescription: true,
      price: true,
      images: true,
      User: {
        select: {
          connectedAccountId: true,
        },
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'USD',
          unit_amount: Math.round((data?.price as number) * 100),
          product_data: {
            name: data?.name as string,
            description: data?.smallDescription,
            images: data?.images,
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: Math.round((data?.price as number) * 100) * 0.1,
      transfer_data: {
        destination: data?.User?.connectedAccountId as string,
      },
    },
    success_url:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/payment/success'
        : 'https://digital-marketplace-blond-iota.vercel.app/payment/success',
    cancel_url:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/payment/cancel'
        : 'https://digital-marketplace-blond-iota.vercel.app/payment/cancel',
  });

  return redirect(session.url as string);
}

export async function CreateStripeAccountLink() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error('Something went wrong');
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  console.log('');
  console.log('Environment is: ', process.env.NODE_ENV);
  console.log('CreateStripeAccountLink data is: ', data);

  const accountLink = await stripe.accountLinks.create({
    account: data?.connectedAccountId as string,
    refresh_url:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/billing'
        : 'https://digital-marketplace-blond-iota.vercel.app/billing',
    return_url:
      process.env.NODE_ENV === 'development'
        ? `http://localhost:3000/return/${data?.connectedAccountId as string}`
        : `https://digital-marketplace-blond-iota.vercel.app/return/${
            data?.connectedAccountId as string
          }`,
    type: 'account_onboarding',
  });

  console.log('');
  console.log('account link URL is: ', accountLink.url);

  return redirect(accountLink.url);
}

export async function GetStripeDashboardLink() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error('Something went wrong');
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const loginLink = await stripe.accounts.createLoginLink(
    data?.connectedAccountId as string
  );

  return redirect(loginLink.url);
}
