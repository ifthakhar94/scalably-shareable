import client from '@/GraphqlClient/client';
import { updateNewsAssetInfo } from '@/queries/queries';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

function useNewsAssetUpdateHook(
  editNewsData: any,
  setOpen: any,
  selectedValue: string,
  catArrStr: string,
  updateModalNumber: any,
  gotNewsAssetsID: number
) {
  const formik = useFormik({
    initialValues: {
      hub_name: editNewsData?.asseetName,
      url: editNewsData?.assetURL,
      explanation: editNewsData?.description
    },
    onSubmit: (values) => {
      setOpen(false);
      {
        values.explanation == null && values.explanation == '';
      }
      let allData = {
        name: values.hub_name,
        urlValue: values.url,
        description: values.explanation,
        accessibility: selectedValue,
        categories: JSON.parse(catArrStr)
      };
      console.log('Categories finally sending:', JSON.parse(catArrStr));
      console.log('Description finally sending:', values.explanation);

      //update news asset api----------
      client
        .mutate({
          mutation: updateNewsAssetInfo,
          variables: {
            newsAssetId: gotNewsAssetsID,
            name: values.hub_name,
            url: values.url,
            description: values.explanation,
            public_status: selectedValue,
            newsAssetCategory: JSON.parse(catArrStr)
          }
        })
        .then((result: any) => {
          toast.success(result.data.updateNewsAsset.message);
          updateModalNumber(2);
        })
        .catch((error: any) => {
          toast.error(error.message);
          console.log(error.message);
          updateModalNumber(0);
        });

      //   dispatch(setNewsData(allData)); //sending this modal's all data to redux state
      // props.updateModalNumber(2);
    },

    validationSchema: Yup.object({
      hub_name: Yup.string()
        .required('ニュースアセットのの名称を入力してください。')
        .max(100, 'ニュースアセットの名称は100文字以内で入力してください'),
      url: Yup.string().required('URLを入力してください。'),
      explanation: Yup.string().max(300, '300文字以内で設定とする')
      // .matches(
      //   /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?\/?$/,
      //   'ハイフン「-」、アンダーバー「_」のみ)'
      // )
    })
  });
  return { formik };
}

export default useNewsAssetUpdateHook;
