import client from '@/GraphqlClient/client';
import { createNewsAssetQuery } from '@/queries/queries';
import { AppDispatch, RootState } from '@/redux/app/store';
import { setNewsData } from '@/redux/features/NewsAssetDataSlice/NewsAssetDataSlice';
import { deleteNewRssData } from '@/redux/features/Rss/rssSlice';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

function useNewsAssetCreate2Hook(
  gotAllInputData: any,
  registeredAseetID: any,

  updateModalNumber: any
) {
  const dispatch = useAppDispatch();
  const rssNew = useAppSelector((state) => state.rssNew);
  console.log(rssNew.rss);
  const formik = useFormik({
    initialValues: {
      rss_url: ''
    },
    onSubmit: (values) => {
      // const UserToken = LSHelper.getItem('UserToken');

      client
        .mutate({
          mutation: createNewsAssetQuery,
          variables: {
            name: gotAllInputData.name,
            url: gotAllInputData.url,
            description: gotAllInputData.description,
            public_status: gotAllInputData.accessibility,
            newsAssetCategory: gotAllInputData.categoryarray,
            rss: rssNew.rss
          }
        })
        .then((result) => {
          {
            toast.success(result.data.createNewsAsset.message);
          }
          dispatch(deleteNewRssData([]));

          registeredAseetID(result.data.createNewsAsset.newsAssetId);
          updateModalNumber(3);
          dispatch(
            setNewsData({
              name: '',
              urlValue: '',
              description: '',
              accessibility: 'EVERYONE',
              categories: []
            })
          ); //sending this modal's all data to redux state
        })
        .catch((error) => {
          console.log('Errorr--------');
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      rss_url: Yup.string()
        .trim()
        .max(100, '100文字以内の入力とすること')
        .matches(
          /^[0-9A-Za-z\-_\.]+$/,
          'URLとして使用可能な文字であること(具体的な文字は半角英数(0-9、a-z、A-Z),ハイフン「-」、アンダーバー「_」のみ)'
        )
    })
  });

  return { formik };
}

export default useNewsAssetCreate2Hook;
