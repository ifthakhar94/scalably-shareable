import { login_url } from '@/navCentralization/nav_url';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import loginLogo from './../../../assets/images/login-logo.png';
import commonStyles from './../authCommon.module.css';
import Styles from './Forget_password_complete.module.css';
import LogoComponent from '@/components/LogoComponent';
const Forget_password_complete = () => {
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
          <p className={Styles.password_reset_message}>
            入力いただいたメールアドレスに、パスワードの再発行の
            <br />
            URLをお送りしました。 <br />
            ※対象のメールアドレスが設定されたアカウントが存在し
            <br />
            ない場合はメールは送付されません。
          </p>
          <p className={Styles.back}>
            <Link href={login_url}>ログイン画面に戻る</Link>
          </p>
        </div>
        {/* </Row>
        </Container> */}
      </main>
    </>
  );
};

export default Forget_password_complete;
