import useForgetPassword from '@/hooks/authHooks/useForgetPassword';
import { login_url } from '@/navCentralization/nav_url';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import loginLogo from './../../../assets/images/login-logo.png';
import commonStyles from './../authCommon.module.css';
import Styles from './Forget_password.module.css';
import LogoComponent from '@/components/LogoComponent';
const Forget_password = () => {
  const formik = useForgetPassword();

  return (
    <>
      <Head>
        <title>Forget Password</title>
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
          <h1 className={Styles.password_reset_title}>パスワードをリセットします</h1>
          <p className={Styles.password_reset_subtitle}>
            メールアドレスを入力すると、パスワードの再設定のURL
            <br />
            をお送りします。
          </p>

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
            {formik.errors.email && <div className={commonStyles.error}>{formik.errors.email as string}</div>}
            <button type="submit" className="common_btn common_btn_width">
              送信する
            </button>
          </form>
          <p className={Styles.back}>
            <Link href={login_url}>戻る</Link>
          </p>
        </div>
        {/* </Row>
        </Container> */}
      </main>
    </>
  );
};

export default Forget_password;
