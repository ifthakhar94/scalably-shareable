import { CreatOutputRSSQuery } from '@/queries/queries';
import { AppDispatch, RootState } from '@/redux/app/store';
import { setCreateRssData } from '@/redux/features/CreateRssDataSlice/CreateRssDataSlice';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
function useRssCreateFourthModalHook(setPublishedTypeExplanation: any, publishedType: any, setSuccessModal: any) {
  const dispatch = useAppDispatch();

  // Fetching Data from Toolkit Store
  const getCreateRssDataFromStore: any = useAppSelector((state) => state.getCreateRssDataSlice);
  const outputRssHubData: any = useAppSelector((state) => state?.getOutputRssHubData?.OutputRssData);
  const outputRSSHubId = outputRssHubData?.hubId;

  // console.log('---getCreateRssDataFromStore', getCreateRssDataFromStore?.createRssCategories);
  // Create RSS API Implementation
  const [createOutputRss, { loading: createOutputRssLoading, error: createOutputRssError }] = useMutation(CreatOutputRSSQuery);
  const initialValues = {
    explanation: ''
  };
  const validationSchema = Yup.object().shape({
    explanation: Yup.string().max(50, '50文字以内で入力してください。')
  });

  const handleSubmit = (values: any) => {
    // Handle form submission

    setPublishedTypeExplanation(values.explanation);

    // Create RSS API Implementation

    createOutputRss({
      variables: {
        hubId: outputRSSHubId,
        categories: getCreateRssDataFromStore?.createRssCategories,
        socialServiceId: getCreateRssDataFromStore?.socialServiceId,
        languageTranslationId: getCreateRssDataFromStore?.languageId,
        export_type: publishedType,
        use_case: values?.explanation
      }
    })
      .then((response) => {
        toast.success(response?.data?.createOutputRss?.message);
        dispatch(
          setCreateRssData({
            createRssCategories: '',
            socialServiceName: '',
            socialServiceId: '',
            languageValue: '',
            languageId: '',
            PublishedType: '',
            publishedTypeExplanation: ''
          })
        );
        setSuccessModal(true);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const rssformik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });
  return { rssformik };
}

export default useRssCreateFourthModalHook;
