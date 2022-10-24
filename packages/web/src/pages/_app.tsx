import '@payless/ui/src/styles/app.css';
import type { AppProps } from 'next/app';
import { Suspense, useEffect } from 'react';
import { NotifierContextProvider } from 'react-headless-notifier';
import { RecoilRoot } from 'recoil';
import Preloader from '../components/shared/Preloader';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  });
  return (
      <NotifierContextProvider
        config={{
          max: null,
          duration: 5000,
          position: 'bottomRight',
        }}
      >
        <RecoilRoot>
            <Suspense fallback={<Preloader />}>
              <Component {...pageProps} />
              <ToastContainer />
            </Suspense>
        </RecoilRoot>
      </NotifierContextProvider>
  );
}

export default MyApp
