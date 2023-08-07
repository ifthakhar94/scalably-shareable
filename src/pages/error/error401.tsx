import { login_url } from '@/navCentralization/nav_url';
import Link from 'next/link';
import React from 'react';

const Error401 = () => {
  return (
    <>
      <h3> Error - 401 </h3>
      <Link href={login_url}>Back to Login</Link>
    </>
  );
};

export default Error401;
