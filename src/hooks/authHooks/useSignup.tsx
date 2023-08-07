import client from '@/GraphqlClient/client';
import { emailOTP_url } from '@/navCentralization/nav_url';
import { signupCheckEmail } from '@/queries/queries';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage';
import * as Yup from 'yup';

const useSignup = () => {
  const router = useRouter();
  const [signUpEmailError, setSignUpEmailError] = useState('');
  return useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: (values: any) => {
      client
        .mutate({
          mutation: signupCheckEmail,
          variables: {
            email: values.email,
            resend: false
          }
        })
        .then((result) => {
          setSignUpEmailError('');
          secureLocalStorage.setItem('singupEmail', values.email);
          {
            toast.success(result.data.checkEmail.message);
          }
        })
        .then(() => router.push(emailOTP_url))
        .catch((error) => {
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().required('メールアドレスの形式で入力してください。').email('メールアドレスの形式で入力してください。')
    })
  });
};
export default useSignup;
