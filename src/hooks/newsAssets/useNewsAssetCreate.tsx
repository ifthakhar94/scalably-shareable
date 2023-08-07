import { AppDispatch, RootState } from '@/redux/app/store';
import { setNewsData } from '@/redux/features/NewsAssetDataSlice/NewsAssetDataSlice';
import { useFormik } from 'formik';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

function useNewsAssetCreate(setOpen: any, selectedValue: string, catArrStr: string, updateModalNumber: any) {
  const dispatch = useAppDispatch();
  const gotAllInputData = useAppSelector((state) => state?.getAssetData);

  const formik = useFormik({
    initialValues: {
      hub_name: gotAllInputData?.name,
      url: gotAllInputData?.url,
      explanation: gotAllInputData?.description,
      accessibility: 'EVERYONE'
    },
    onSubmit: (values) => {
      setOpen(false);
      // const UserToken = LSHelper.getItem('UserToken');

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

      // console.log('------', allData);

      dispatch(setNewsData(allData)); //sending this modal's all data to redux state
      updateModalNumber(2);
    },

    validationSchema: Yup.object({
      hub_name: Yup.string()
        .required('ニュースアセットのの名称を入力してください。')
        .max(100, 'ニュースアセットの名称は100文字以内で入力してください'),
      explanation: Yup.string().max(300, '300文字以内で設定とする'),
      url: Yup.string()
        .matches(
          /^[0-9A-Za-z\-_\.]+$/,
          'URLとして使用可能な文字であること(具体的な文字は半角英数(0-9、a-z、A-Z),ハイフン「-」、アンダーバー「_」のみ'
        )
        .max(100, '100文字以内の入力とすること')
        //.url('URLとして使用可能な文字であること(具体的な文字は半角英数(0-9、a-z、A-Z),ハイフン「-」、アンダーバー「_」のみ')
        .required('URLを入力してください。')
      // .matches(
      //   /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?\/?$/,
      //   'ハイフン「-」、アンダーバー「_」のみ)'
      // )
    })
  });

  return { formik };
}

export default useNewsAssetCreate;
