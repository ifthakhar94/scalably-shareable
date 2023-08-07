import client from '@/GraphqlClient/client';
import { forgetpasswordcomplete_url } from '@/navCentralization/nav_url';
import { forgetPassword } from '@/queries/queries';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

const useForgetPassword = () => {
  const router = useRouter();
  return useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: (values: any) => {
      client
        .query({
          query: forgetPassword,
          variables: {
            email: values.email
          }
        })
        .then((result) => {
          {
            toast.success(result.data.forgetPassword.message);
          }
          setTimeout(() => {
            router.push(forgetpasswordcomplete_url);
          }, 3000);
        })

        .catch((error) => {
          //As per the requirements, If the email address account does not exist, the error message will not be displayed.
          //Do not send the email, and let the user transition to the "01.Login - Forget Password - Complete" screen.
          // toast.error(error.message);
          router.push(forgetpasswordcomplete_url);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().required('メールアドレスの形式で入力してください。').email('メールアドレスの形式で入力してください。')
    })
  });
};
export default useForgetPassword;
