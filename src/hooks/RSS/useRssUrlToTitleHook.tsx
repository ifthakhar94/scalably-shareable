import client from '@/GraphqlClient/client';
import { GetRssUrlToFetchSiteTitle } from '@/queries/queries';
import { AppDispatch, RootState } from '@/redux/app/store';
import { setRssValue } from '@/redux/features/Rss/rssSlice';

import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function useRssUrlToTitleHook(rssName: string) {
  function hasDuplicateValue(arr: any, value: string): boolean {
    return arr.some((obj: { url: string }) => obj.url === value);
  }

  const dispatch = useAppDispatch();
  const rssNew = useAppSelector((state) => state.rssNew);

  const rssFormik = useFormik({
    initialValues: {
      rss_url: ''
    },
    onSubmit: (value) => {
      const hasDuplicate = hasDuplicateValue(rssNew.rss, value.rss_url);
      if (hasDuplicate === true) {
        toast.error('URL is Duplicate');
      } else {
        console.log(value);
        client
          .query({
            query: GetRssUrlToFetchSiteTitle,
            variables: {
              rssUrl: value.rss_url
            }
          })
          .then((result: any) => {
            dispatch(
              setRssValue({
                url: value.rss_url,
                sitename: result?.data.getRssUrlToTitle.siteTitle,
                favicon: ''
              })
            );
            rssFormik.resetForm();
          })
          .finally(() => rssFormik.resetForm())
          .catch((error: any) => {
            toast.error(error.message);
          });
      }
    }
  });

  return { rssFormik };
}
