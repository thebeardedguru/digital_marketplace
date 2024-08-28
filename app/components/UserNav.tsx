import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import Link from 'next/link';

interface iAppProps {
  email: string;
  name: string;
  userImage: string | undefined;
}

export async function UserNav({ email, name, userImage }: iAppProps) {
  const avatarName = () => {
    //console.log('name is: ', name);
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];

    return firstName.charAt(0) + lastName.charAt(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative size-10 rounded-full'>
          <Avatar>
            <AvatarImage src={userImage} alt='User Image' />
            <AvatarFallback>{avatarName()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/sell'>Sell your Product</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/settings'>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/my-products'>My Products</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/billing'>Billing</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink>Logout</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
