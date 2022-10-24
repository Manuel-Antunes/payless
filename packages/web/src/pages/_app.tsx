import '@payless/ui/src/styles/app.css';
import type { AppProps } from 'next/app';
import { NotifierContextProvider } from 'react-headless-notifier';

function MyApp({ Component, pageProps }: AppProps) {
      <NotifierContextProvider
        config={{
          max: null,
          duration: 5000,
          position: 'bottomRight',
        }}
      >
              <Component {...pageProps} />
              <ToastContainer />
      </NotifierContextProvider>
}

export default MyApp
