import { navLinkProps } from '@/types/components/Navigation-Bar/types';
import { Link } from '@chakra-ui/react';


const NavLink = ({ href, name }: navLinkProps) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'brand.white',
    }}
    href={href}>
    {name}
  </Link>
);
export default NavLink;
