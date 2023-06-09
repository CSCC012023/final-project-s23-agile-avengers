import { ReactNode } from 'react';
import {Link, useColorModeValue } from '@chakra-ui/react';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: '#FFFFFF',
    }}
    href={'#'}>
    {children}
  </Link>
);
export default NavLink;