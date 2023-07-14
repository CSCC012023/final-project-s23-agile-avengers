type Props = {
  children: React.ReactNode;
};

export type NavLinkProps = {
  href: string;
  name: string;
};

type ErrorResponse = {
  type: string;
  message: string;
};