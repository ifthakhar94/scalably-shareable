import NewsUI from '@/components/newsComponents/NewsUI/NewsUI';
import { Grid } from '@mui/material';
import { Roboto } from 'next/font/google';
import Head from 'next/head';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={roboto.className}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            {/* <MediaTopUI /> */}
            {/* <NewsAssetsDetails /> */}
            {/* <Login /> */}
            {/* <MediaTopUI /> */}
            <NewsUI />
            {/* <NewsAssetsDetails /> */}
          </Grid>
        </Grid>
      </main>
    </>
  );
}
