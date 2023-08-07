import client from '@/GraphqlClient/client';
import { resettingPasswordComplete_url } from '@/navCentralization/nav_url';
import { resetPassword } from '@/queries/queries';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
const useResettingPass = () => {
  const router = useRouter();

  return useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    onSubmit: (values: any) => {
      console.log(values);
      console.log(router.query.resetToken);
      client
        .mutate({
          mutation: resetPassword,
          variables: {
            resetToken: router.query.resetToken,
            password: values.password,
            confirmPassword: values.confirm_password
          }
        })
        .then((result) => {
          {
            toast.success(result.data.resetPassword.message);
          }
          router.push(resettingPasswordComplete_url);
        })

        .catch((error) => {
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('※パスワードが必須入力')
        .min(8, 'パスワードは8文字以上100文字以下で入力してください')
        .matches(
          /^[a-zA-Z0-9!@#$%^&*.()]+$/g,
          'アルファベット（a～z と A～Z）、数字（0～9）、特殊文字（!@#$%^&*.()）のみを使用してください。'
        )
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[! @#$%^&*. ()])[A-Za-z\d! @#$%^&*. ()]{8,}$/,
          '文字、数字、記号の組み合わせて設定してください。'
        ),
      confirm_password: Yup.string().oneOf([Yup.ref('password')], 'パスワードが一致しません。')
    })
  });
};
export default useResettingPass;
