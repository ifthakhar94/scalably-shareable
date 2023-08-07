import { login_url } from '@/navCentralization/nav_url';
import Link from 'next/link';
import React from 'react';

const Error404 = () => {
  return (
    <>
      <h3> Error - 404 </h3>
      <Link href={login_url}>Back to Login</Link>
    </>
  );
};

export default Error404;
