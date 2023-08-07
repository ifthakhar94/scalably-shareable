import client from '@/GraphqlClient/client';
import { hubtop_url } from '@/navCentralization/nav_url';
import LSHelper from '@/utils/LSHelper';
import { gql } from 'apollo-boost';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

function useHubDeleteHook(
  setOpen: any,
  parentStatus: any,
  setEnableDeleteConfirm: any,
  hubId: any,
  gotHubId: any,
  handleHubConfirmOpen: any
) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      hub_delete_content: ''
    },
    onSubmit: (values) => {
      setOpen(false);
      parentStatus(false);
      setEnableDeleteConfirm(true);
      const UserToken = LSHelper.getItem('UserToken');

      client
        .mutate({
          mutation: gql`
          mutation {
            deleteHub(hubId: "${hubId}", confirmText: "${values.hub_delete_content}",) {
              message
            }
          }
        `,
          context: {
            headers: {
              Authorization: `Bearer ${UserToken}`
            }
          }
        })
        .then((result: any) => {
          values.hub_delete_content = '';
          toast.success(result.data.deleteHub.message);
          gotHubId && router.push(`${hubtop_url}?id=${hubId}`);
          handleHubConfirmOpen(true);
          // setHubDeleteUpdate('confirmed');
        })
        .catch((error: any) => {});
    },
    validationSchema: Yup.object({
      hub_delete_content: Yup.string()
        .required('”Delete this hub”と完全一致で入力してください')
        .matches(/Delete this hub/, '”Delete this hub”と完全一致で入力してください')
    })
  });

  return { formik };
}

export default useHubDeleteHook;
