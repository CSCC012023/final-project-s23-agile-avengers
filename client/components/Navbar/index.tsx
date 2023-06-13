'use client';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Image,
  MenuDivider,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NavLink from './NavLink';
import style from '../../styles/components/navbar.module.scss';
import { SignUpButton, SignInButton, UserButton, useAuth } from '@clerk/nextjs';

import UserAvatar from './UserAvatar';

const navLinks = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Learning',
    href: '/learning',
  },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg="brand.gray"
      px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack
          spacing={8}
          alignItems={'center'}>
          <Image
            className={style.logo}
            src="FinLearn_logo_light_transparent.png"
            alt="logo"
          />
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                href={link.href}
                name={link.name}
              />
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <UserAvatar />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box
          pb={4}
          display={{ md: 'none' }}>
          <Stack
            as={'nav'}
            spacing={4}>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                href={link.href}
                name={link.name}
              />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
export default Navbar;
