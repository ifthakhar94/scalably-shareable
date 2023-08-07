import useResettingPass from '@/hooks/authHooks/useResettingPass';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import hidden from './../../../assets/images/eye-hidden.png';
import eye from './../../../assets/images/eye.png';
import loginLogo from './../../../assets/images/login-logo.png';
import commonStyles from './../authCommon.module.css';
import Styles from './Re_setting_password.module.css';
import LogoComponent from '@/components/LogoComponent';
const Re_setting_password = () => {
  const [resettingError, setResettingError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfrmPasswordShown] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const toggleConfirmPassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setConfrmPasswordShown(!confirmPasswordShown);
  };
  const formik = useResettingPass();
  return (
    <>
      <Head>
        <title>ReSetting Password</title>
      </Head>
      <main className={commonStyles.login_body}>
        {/* <Container>
          <Row> */}
        {/* Login Page Logo   */}
        <div className={commonStyles.login_logo}>
          <LogoComponent />
        </div>
        {/* Login Card  */}
        <form onSubmit={formik.handleSubmit}>
          <div className={commonStyles.modal_content}>
            {resettingError && <div className={commonStyles.error}>{resettingError}</div>}
            <h1 className={Styles.brand_title}>パスワードを再設定してください</h1>
            <div className={Styles.password_input}>
              <p>パスワード</p>
              <input
                type={passwordShown ? 'text' : 'password'}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {passwordShown ? (
                <Image src={hidden} alt="hidden Icon" onClick={togglePassword} className={Styles.hidden} />
              ) : (
                <Image src={eye} alt="eye Icon" onClick={togglePassword} className={Styles.eye} />
              )}
            </div>
            {formik.errors.password && <div className={commonStyles.error}>{formik.errors.password as string}</div>}
            <div className={Styles.password_input}>
              <p>確認用</p>
              <input
                type={confirmPasswordShown ? 'text' : 'password'}
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {confirmPasswordShown ? (
                <Image src={hidden} alt="hidden Icon" onClick={toggleConfirmPassword} className={Styles.hidden} />
              ) : (
                <Image src={eye} alt="eye Icon" onClick={toggleConfirmPassword} className={Styles.eye} />
              )}
            </div>
            {formik.errors.confirm_password && <div className={commonStyles.error}>{formik.errors.confirm_password as string}</div>}
            <button type="submit" className="common_btn common_btn_width mg_t20">
              次へ
            </button>
          </div>
        </form>
        {/* </Row>
        </Container> */}
      </main>
    </>
  );
};

export default Re_setting_password;
