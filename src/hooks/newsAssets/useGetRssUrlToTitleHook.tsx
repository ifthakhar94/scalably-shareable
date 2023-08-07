import client from '@/GraphqlClient/client';
import { GetRssUrlToFetchSiteTitle } from '@/queries/queries';
import { useFormik } from 'formik';

import toast from 'react-hot-toast';
import * as Yup from 'yup';
function useGetRssUrlToTitleHook(rssUrl: any, setRssUrl: any) {
  // RSS URL Update/Edit
  function hasDuplicateValue(arr: { url: string }[], value: string): boolean {
    return arr.some((obj) => obj.url === value);
  }

  const formik = useFormik({
    initialValues: {
      rss_url: ''
    },
    onSubmit: (values) => {
      const newUrl = [...rssUrl];
      const hasDuplicate = hasDuplicateValue(newUrl, values.rss_url);

      if (hasDuplicate) {
        toast.error('Url is duplicate', {
          id: 'duplicate-url-toast'
        });
      } else {
        if (values.rss_url.length > 0) {
          client
            .query({
              query: GetRssUrlToFetchSiteTitle,
              variables: {
                rssUrl: values.rss_url
              }
            })
            .then((result) => {
              formik.resetForm();
              console.log(result.data.getRssUrlToTitle.siteTitle);
              newUrl.push({
                url: values.rss_url,
                sitename: result.data.getRssUrlToTitle.siteTitle,
                favicon: ''
              });

              setRssUrl(newUrl);
              formik.resetForm();
            })
            .finally(() => formik.resetForm())
            .catch((error) => {
              toast.error(error.message, {
                id: 'duplicate-url-toast'
              });
            });
        }
      }
    },
    validationSchema: Yup.object({
      rss_url: Yup.string().required('※必須入力').min(1).trim().max(100, 'max value is  100')
    })
  });

  return { formik };
}

export default useGetRssUrlToTitleHook;
