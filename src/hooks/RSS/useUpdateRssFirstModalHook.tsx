import { AppDispatch, RootState } from '@/redux/app/store';
import { setUpdateOutputRssData } from '@/redux/features/UpdateOutputRss/UpdateOutputRss';
import { useFormik } from 'formik';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
function useUpdateRssFirstModalHook(setExportModal1: any, setExportModal2: any, setCategory: any) {
  // Getting existing Data
  const getExistingData: any = useAppSelector((state) => state.getExistingRssDataSlice);
  const rssCategoryId: any = [];
  getExistingData?.existingRssCategories?.map((rssSingleCat: { id: string }) => rssCategoryId.push(rssSingleCat.id));
  //   console.log(rssCategoryId);
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
      setUpdateOutputRssData({
        updateRssCategories: values.options
      })
    );
    setCategory(values.options);
    setExportModal1(false);
    setExportModal2(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit
  });
  return { formik };
}

export default useUpdateRssFirstModalHook;
