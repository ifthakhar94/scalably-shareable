import { rssUrlUpdate } from '@/queries/queries';
import { useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';

const useNewsAssetsRSSEditHook = (gotNewsAssetsID: string, rssUrl: any, setrssUrlEditModal: any) => {
  const [urlUpdateRss, { loading: rssUrlLoading, error }] = useMutation(rssUrlUpdate);
  const handleSubmit = () => {
    urlUpdateRss({
      variables: {
        newsAssetId: `${gotNewsAssetsID}`,
        rss: rssUrl
      }
    })
      .then((results) => {
        setrssUrlEditModal(false);

        toast.success(results.data.updateRss.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return { handleSubmit };
};

export default useNewsAssetsRSSEditHook;
