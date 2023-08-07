import React from 'react';
import { useRouter } from 'next/router';
const errorHandler = () => {
  const router = useRouter();
  router.push('/');
  return <div></div>;
};

export default errorHandler;
