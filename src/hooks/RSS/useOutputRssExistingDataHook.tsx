import { updateRssExistingDataQuery } from '@/queries/queries';
import { AppDispatch } from '@/redux/app/store';
import { setExistingOutputRssData } from '@/redux/features/OutputRssExistingDataSlice/OutputRssExistingDataSlice';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
const useOutputRssExistingDataHook = (outputRssIdForEdit: string) => {
  const dispatch = useAppDispatch();
  const {
    loading: updateRssExistingDataLoader,
    data: updateRssExistingData,
    refetch: refetchOutputRssExistingData
  } = useQuery(updateRssExistingDataQuery, {
    variables: { outputRssId: outputRssIdForEdit }
  });

  dispatch(
    setExistingOutputRssData({
      existingRssCategories: updateRssExistingData?.getOutputRssInfo?.outputRss?.categories,
      existingdescription: updateRssExistingData?.getOutputRssInfo?.outputRss?.description,
      existingexport_type: updateRssExistingData?.getOutputRssInfo?.outputRss?.export_type,
      existinglanguage_id: updateRssExistingData?.getOutputRssInfo?.outputRss?.language_id,
      existingoutput_rss_id: updateRssExistingData?.getOutputRssInfo?.outputRss?.output_rss_id,
      existingplatform_icon: updateRssExistingData?.getOutputRssInfo?.outputRss?.platform_icon,
      existingplatform_id: updateRssExistingData?.getOutputRssInfo?.outputRss?.platform_id,
      existingrss_url: updateRssExistingData?.getOutputRssInfo?.outputRss?.rss_url
    })
  );
  return { updateRssExistingData, refetchOutputRssExistingData };
};

export default useOutputRssExistingDataHook;
