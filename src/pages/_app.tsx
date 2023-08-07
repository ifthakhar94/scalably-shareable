import '@/styles/globals.css';
import '@/styles/styleVariables.css';
import '@/styles/utility.css';

import client from '@/GraphqlClient/client';
import { persistor, store } from '@/redux/app/store';
import { ApolloProvider } from '@apollo/client';
import { LicenseInfo } from '@mui/x-license-pro';
import type { AppProps } from 'next/app';
import { appWithI18Next } from 'ni18n';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ni18nConfig } from '../../ni18n.config';

LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_LICENSE_KEY as string);

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}></PersistGate>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <Toaster />
      </ApolloProvider>
    </Provider>
  );
}
export default appWithI18Next(App, ni18nConfig);
