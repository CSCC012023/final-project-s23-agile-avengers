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

import style from '@/styles/components/Navbar.module.scss';
import logoImg from '@/public/Logo_Transparent_Dark.png';

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
            src={logoImg.src}
            alt="Logo"
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
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                size={'sm'}
                src={
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem>My Account</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
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
