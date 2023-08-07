/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: [
  //     ` ${process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
  //     `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`
  //   ]
  // }

  i18n: {
    locales: ['en', 'ja', 'fr'], // Your supported locales
    defaultLocale: 'ja', // The default locale
    localeSubpaths: {}
  }
};

module.exports = nextConfig;
