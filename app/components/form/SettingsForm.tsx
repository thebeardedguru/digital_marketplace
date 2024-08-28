'use client';

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { type State, UpdateUserSettings } from '@/app/actions';
import { Submitbutton } from '../SubmitButtons';

interface iAppProps {
  firstName: string;
  lastName: string;
  email: string;
}

export function SettingsForm({ email, firstName, lastName }: iAppProps) {
  const initialState: State = { message: '', status: undefined };
  const [state, formAction] = useFormState(UpdateUserSettings, initialState);

  useEffect(() => {
    if (state?.status === 'error') {
      toast.error(state.message);
    } else if (state?.status === 'success') {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Here you will find the settings to manage your account.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-5'>
        <div className='flex flex-col gap-y-2'>
          <Label>First Name</Label>
          <Input defaultValue={firstName} name='firstName' type='text' />
        </div>
        <div className='flex flex-col gap-y-2'>
          <Label>Last Name</Label>
          <Input defaultValue={lastName} name='lastName' type='text' />
        </div>
        <div className='flex flex-col gap-y-2'>
          <Label>Email</Label>
          <Input defaultValue={email} name='email' type='text' disabled />
        </div>
      </CardContent>
      <CardFooter>
        <Submitbutton title='Update your settings' />
      </CardFooter>
    </form>
  );
}
