import { updateOutputRssQuery } from '@/queries/queries';
import { AppDispatch, RootState } from '@/redux/app/store';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import useOutputRssExistingDataHook from './useOutputRssExistingDataHook';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
function useOutputUpdateRssFourthModal(
  setPublishedTypeExplanation: any,
  publishedType: any,
  setSuccessModal: any,
  outputRssIdForEdit: any
  // refetchOutputRssExistingData: any
) {
  const dispatch = useAppDispatch();

  // Getting  Data from Toolkit Store
  const getExistingData: any = useAppSelector((state) => state.getExistingRssDataSlice);
  const getUpdateData: any = useAppSelector((state) => state.getUpdateOutputRssDataSlice);
  const { refetchOutputRssExistingData } = useOutputRssExistingDataHook(outputRssIdForEdit);
  const outputRssHubData: any = useAppSelector((state) => state?.getOutputRssHubData?.OutputRssData);
  const outputRSSHubId = outputRssHubData?.hubId;

  // Create RSS API Implementation
  const [updateRssData, { loading: updateOutputRssLoading, error: updateOutputRssError }] = useMutation(updateOutputRssQuery);
  const initialValues = {
    explanation: getExistingData?.existingdescription
  };
  const validationSchema = Yup.object().shape({
    explanation: Yup.string().max(50, '50文字以内で入力してください。')
  });

  const handleSubmit = (values: any) => {
    // Handle form submission

    setPublishedTypeExplanation(values.explanation);

    // Create RSS API Implementation

    updateRssData({
      variables: {
        outputRssId: outputRssIdForEdit,
        hubId: outputRSSHubId,
        categories: getUpdateData?.updateRssCategories,
        socialServiceId: getUpdateData?.updatesocialServiceId,
        languageTranslationId: getUpdateData?.updatelanguageId,
        export_type: publishedType,
        use_case: values.explanation
      }
    })
      .then((response) => {
        toast.success(response?.data?.updateOutputRss?.message);
        // console.log('response', response);

        setSuccessModal(true);
      })
      .catch((error) => {
        toast.error(error?.message);
      })
      .finally(() => {
        refetchOutputRssExistingData();
      });
  };

  const rssformik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit
  });
  return { rssformik };
}

export default useOutputUpdateRssFourthModal;
