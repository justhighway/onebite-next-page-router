import GlobalLayout from '@/components/GlobalLayout';

import '@/styles/globals.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

// NextPage 컴포넌트 타입에 getLayout 메서드를 확장(&)
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout =
    Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <>
      <GlobalLayout>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </GlobalLayout>
    </>
  );
}
