import { DeleteNewsAssetQuery } from '@/queries/queries';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

const useDeleteNewsAssetsHook = (
  setShowDeleteConfirm: (value: boolean) => void,
  setOpen: (value: boolean) => void,
  parentStatus: (value: boolean) => void,
  setEnableDeleteConfirm: (value: boolean) => void,
  gotHubId: string,
  setHubDeleteUpdate: (value: string) => void
) => {
  const [deleteNewsAssets, { loading, error }] = useMutation(DeleteNewsAssetQuery);

  const formik = useFormik({
    initialValues: {
      news_delete_content: ''
    },

    onSubmit: (values) => {
      setShowDeleteConfirm(true);
      setOpen(false);
      parentStatus(false);
      setEnableDeleteConfirm(true);
      deleteNewsAssets({
        variables: {
          newsAssetId: gotHubId,
          confirmText: values.news_delete_content
        }
      })
        .then((result: any) => {
          values.news_delete_content = '';
          toast.success(result.data.deleteNewsAsset.message);
          setHubDeleteUpdate('confirmed');
        })
        .catch((error: any) => {
          // toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      news_delete_content: Yup.string()
        .required('”Delete this news asset”と完全一致で入力してください')
        .matches(/Delete this news asset/, '”Delete this news asset”と完全一致で入力してください')
    })
  });
  return { formik };
};

export default useDeleteNewsAssetsHook;
