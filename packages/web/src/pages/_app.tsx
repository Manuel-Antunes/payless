import '@payless/ui/src/styles/app.css';
import type { AppProps } from 'next/app';
import { NotifierContextProvider } from 'react-headless-notifier';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
      <NotifierContextProvider
        config={{
          max: null,
          duration: 5000,
          position: 'bottomRight',
        }}
      >
        <RecoilRoot>
              <Component {...pageProps} />
              <ToastContainer />
        </RecoilRoot>
      </NotifierContextProvider>
}

export default MyApp
