import { Providers } from "./providers";

import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FinLearn',
	description: 'A Financial Learning Site'
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
