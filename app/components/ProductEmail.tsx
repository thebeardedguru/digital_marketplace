import {
  Body,
  Button,
  Container,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Head,
} from '@react-email/components';

export default function ProductEmail({ link }: { link: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your product is here...</Preview>
      <Tailwind>
        <Body className='bg-white font-sans'>
          <Text className='text-2xl font-semibold'>
            <Container style={container}>
              <Text className='text-2xl font-semibold'>
                Your product is here...
              </Text>
              <Text className='text-lg text-gray-600'>
                Thank you for buying your product at Chattys Closet
              </Text>
              <Section className='w-full flex justify-center mt-7'>
                <Button
                  href={link}
                  className='text-white bg-blue-500 rounded-lg px-10 py-4'
                >
                  Your Download Link
                </Button>
              </Section>
              <Text className='text-lg text-gray-600'>
                Best, <br /> Chattys Closet Team
              </Text>
            </Container>
          </Text>
        </Body>
      </Tailwind>
    </Html>
  );
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};
