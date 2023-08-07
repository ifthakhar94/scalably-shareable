import useInputPassword from '@/hooks/authHooks/useInputPassword';
import { forgetpassword_url } from '@/navCentralization/nav_url';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import hidden from './../../../assets/images/eye-hidden.png';
import eye from './../../../assets/images/eye.png';
import loginLogo from './../../../assets/images/login-logo.png';
import commonStyles from './../authCommon.module.css';
import Styles from './Input_password.module.css';
import LogoComponent from '@/components/LogoComponent';

const Input_password = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const formik = useInputPassword();
  return (
    <>
      <Head>
        <title>Input Password</title>
      </Head>
      <main className={commonStyles.login_body}>
        {/* <Container>
          <Row> */}
        {/* Login Page Logo   */}
        <div className={commonStyles.login_logo}>
          <LogoComponent />
        </div>

        {/* Login Card  */}

        <div className={commonStyles.modal_content}>
          <h1 className={Styles.brand_title}>パスワードを入力</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className={Styles.email_input}>
              <p>メールアドレス</p>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="メールアドレスを入力してください"
              />
            </div>
            {formik.errors.email && <div className={commonStyles.error}>{formik.errors.email && Boolean(formik.errors.email)}</div>}
            <div className={Styles.password_input}>
              <p>パスワード</p>
              <input
                type={passwordShown ? 'text' : 'password'}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="パスワードを入力してください"
              />
              {passwordShown ? (
                <Image src={hidden} alt="hidden Icon" onClick={togglePassword} className={Styles.hidden} />
              ) : (
                <Image src={eye} alt="eye Icon" onClick={togglePassword} className={Styles.eye} />
              )}
            </div>
            {formik.errors.password && <div className={commonStyles.error}>{formik.errors.password as string}</div>}

            <p className={Styles.is_loged_in}>
              <Link href={forgetpassword_url}>パスワードをお忘れですか？</Link>
            </p>
            <button type="submit" className="common_btn common_btn_width">
              ログイン
            </button>
          </form>
        </div>
        {/* </Row>
        </Container> */}
      </main>
    </>
  );
};

export default Input_password;
