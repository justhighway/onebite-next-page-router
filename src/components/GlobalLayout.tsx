import Link from 'next/link';
import { ReactNode } from 'react';

const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='bg-white max-w-[60rem] py-6 mx-auto min-h-[100dvh] shadow-xl px-[1.5rem]'>
      <header className='text-3xl h-24 font-bold leading-24'>
        <Link href={'/'}>📚 ONEBITE BOOKS</Link>
      </header>
      <main className='pt-4'>{children}</main>
      <footer className='text-2xl py-40 text-gray-600'>
        제작 @justhighway
      </footer>
    </div>
  );
};

export default GlobalLayout;
