import client from '@/GraphqlClient/client';
import { inputpassword_url } from '@/navCentralization/nav_url';
import { checkLoginEmail } from '@/queries/queries';
import LSHelper from '@/utils/LSHelper';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
const useLogin = () => {
  const router = useRouter();
  return useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: (values: any) => {
      client
        .mutate({
          mutation: checkLoginEmail,
          variables: {
            email: values.email
          }
        })
        .then((result) => {
          LSHelper.setItem('LoginEmail', values.email);

          {
            toast.success(result.data.checkLoginEmail.message);
          }
        })
        .then(() => router.push(inputpassword_url))
        .catch((error) => {
          // setEmailError(error.message);
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().required('メールアドレスの形式で入力してください').email('メールアドレスの形式で入力してください')
    })
  });
};
export default useLogin;
