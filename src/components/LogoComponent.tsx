import React from 'react';
import Image from 'next/image';
import loginLogo from './../assets/images/login-logo.png';
function LogoComponent() {
  return <Image src={loginLogo} alt="Login Page Logo" height={35} />;
}

export default LogoComponent;
