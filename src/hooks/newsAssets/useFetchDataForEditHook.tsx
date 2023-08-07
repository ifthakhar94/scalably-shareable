import client from '@/GraphqlClient/client';
import { singleNewsAssetInfo } from '@/queries/queries';
import LSHelper from '@/utils/LSHelper';

function useFetchDataForEditHook(gotNewsAssetsID: number, setEditNewsData: any, setLoader: any) {
  const UserToken = LSHelper.getItem('UserToken');
  client
    .query({
      query: singleNewsAssetInfo,
      variables: {
        newsAssetId: gotNewsAssetsID
      },
      context: {
        headers: {
          Authorization: `Bearer ${UserToken}`
        }
      }
    })
    .then((result) => {
      setEditNewsData(result.data.getNewsAssetDetails.newsAssetDetails);
      console.log(result.data.getNewsAssetDetails.newsAssetDetails);
    })
    .then(() => setLoader(false))
    .catch((error) => {
      console.log(gotNewsAssetsID);
    });
}
export default useFetchDataForEditHook;
