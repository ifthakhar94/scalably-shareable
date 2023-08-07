import { updateHubInfo } from '@/queries/queries';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage';
import * as Yup from 'yup';

function useHubUpdateDataHook(gotHubIdForEdit: any, catArr: any, setOpen: any, setEditFunction: any, setEditConfirmFunction: any) {
  const [hubDataUpdate, { loading: dataLoading, error: dataError }] = useMutation(updateHubInfo);
  const hubName = secureLocalStorage.getItem('getHubName');
  const formik = useFormik({
    initialValues: {
      hub_name: `${hubName}`
    },
    onSubmit: (values) => {
      setOpen(false);

      hubDataUpdate({
        variables: {
          hubId: gotHubIdForEdit,
          hubName: values.hub_name,
          hubCategory: catArr
        }
      })
        .then((response) => {
          toast.success(response.data.updateHubInfo.message);
          setEditFunction(false);
          setEditConfirmFunction(true);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      hub_name: Yup.string().required('※必須入力').max(100, '100 文字以内で設定とする')
    })
  });

  return { formik, dataLoading, dataError };
}

export default useHubUpdateDataHook;
