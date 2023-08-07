import useSignup from '@/hooks/authHooks/useSignup';
import { login_url, privacypolicy, terms } from '@/navCentralization/nav_url';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import discord_icon from './../../../assets/images/discord_icon.png';
import google_icon from './../../../assets/images/google_icon.png';
import loginLogo from './../../../assets/images/login-logo.png';
import commonStyles from './../authCommon.module.css';
import Styles from './Signup.module.css';
import LogoComponent from '@/components/LogoComponent';

const Signup = () => {
  const formik = useSignup();

  return (
    <>
      <Head>
        <title>SignUp</title>
      </Head>
      <main className={commonStyles.login_body}>
        <div className={commonStyles.login_logo}>
          <LogoComponent />
        </div>
        {/* Login Card  */}
        <div className={commonStyles.modal_content}>
          <h1 className={Styles.brand_title}>EcoMediaにようこそ</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className={Styles.email_input}>
              <p>メールアドレス</p>
              <input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.email && <div className={commonStyles.error}>{formik?.errors?.email as string}</div>}
            <p className={Styles.is_loged_in}>
              続行することでEcoMediaの
              <Link href={terms} target="_blank">
                利用規約
              </Link>
              に同意し、<br></br>
              <Link href={privacypolicy} rel="noopener noreferrer" target="_blank">
                プライバシーポリシー
              </Link>
              を読んだものとみなされます。
            </p>
            <button className="common_btn common_btn_width" type="submit">
              メールアドレスで登録
            </button>
          </form>
          <div className={Styles.has_already_account}>
            すでにアカウントがありますか？ <Link href={login_url}>ログイン</Link>
          </div>
          <div className={Styles.social_login}>
            <div className={Styles.social_login_title}>または</div>
            <div className={Styles.social_handles}>
              <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`}>
                <div className={Styles.login_width_social_handle}>
                  <Image src={google_icon} alt="Google Icon" width={20} height={20} />
                  <p className="social_handle_name">Google で作成</p>
                </div>
              </Link>
              <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/discord`}>
                <div className={Styles.login_width_social_handle}>
                  <Image src={discord_icon} alt="Google Icon" width={20} height={20} />
                  <p className="social_handle_name">Discord で作成</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* </Row>
        </Container> */}
      </main>
    </>
  );
};

export default Signup;
