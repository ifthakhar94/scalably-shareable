import { AppDispatch } from '@/redux/app/store';
import { setCreateRssData } from '@/redux/features/CreateRssDataSlice/CreateRssDataSlice';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
function useRssCreateFirstModalHook(setExportModal1: any, setExportModal2: any, setCategory: any, getRssCategories: any) {
  const rssCategoryId: any = [];
  getRssCategories?.map((rssSingleCat: { id: string }) => rssCategoryId.push(rssSingleCat.id));

  const initialValues = {
    options: rssCategoryId
  };
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    options: Yup.array().min(1, '必ず1つ以上のカテゴリを選択してください。')
  });

  const handleSubmit = (values: any) => {
    // Handle form submission
    dispatch(
      setCreateRssData({
        createRssCategories: values.options
      })
    );
    setCategory(values.options);
    setExportModal1(false);
    setExportModal2(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });
  return { formik };
}

export default useRssCreateFirstModalHook;
