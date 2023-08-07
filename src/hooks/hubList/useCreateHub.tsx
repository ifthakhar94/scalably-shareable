import client from '@/GraphqlClient/client';
import { gql } from 'apollo-boost';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
const useCreateHub = (
  setOpen: any,
  parentStatus: any,
  parentCreateStatus: any,
  catArrStr: any,
  scope: any,
  handleHubCreateConfirmOpen: any
) => {
  const formik = useFormik({
    initialValues: {
      hub_name: '',
      url: ''
    },
    onSubmit: (values) => {
      setOpen(false);
      parentStatus(false);
      parentCreateStatus(false);

      client
        .mutate({
          mutation: gql`
            mutation {
              createHub(
                hubName: "${values.hub_name}"
                url: "${values.url}"
                hubCategory:${catArrStr}
                publicScope: ${scope} # GENERAL_PUBLIC/LIMITED_PUBLIC
              ) {
                message
              }
            }
          `
        })
        .then((result: any) => {
          // console.log(result.data.createHub);
          toast.success(result.data.createHub.message);
          handleHubCreateConfirmOpen(true);
          setOpen(false);
          parentStatus(false);
          parentCreateStatus(true);
          values.hub_name = '';
          values.url = '';
          // secureLocalStorage.setItem('hub_id67', values.hub_name);
        })
        .catch((error: any) => {
          toast.error(error.message);
          setOpen(true);
          parentCreateStatus(false);
        });
    },
    validationSchema: Yup.object({
      hub_name: Yup.string().required('ハブの名称を入力してください。').max(100, 'ハブの名称は100文字以内で入力してください。'),
      url: Yup.string()
        .required('URLを入力してください。')
        .matches(/^[0-9a-zA-Z-_]{1,}$/, 'URLは半角英数(0-9、a-z、A-Z)、ハイフン「-」、アンダーバー「_」のみを使用してください。')
    })
  });
  return { formik };
};

export default useCreateHub;
