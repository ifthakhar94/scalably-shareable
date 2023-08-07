import client from '@/GraphqlClient/client';
import { newsAssetDisconnectQueryString } from '@/queries/queries';
import LSHelper from '@/utils/LSHelper';

const useDisconnectHook = (gotHubId: string | string[] | undefined, gotNewsAssetId: any, setShowDisconnectConfirm: any, setOpen: any) => {
  const UserToken = LSHelper.getItem('UserToken');

  client
    .mutate({
      mutation: newsAssetDisconnectQueryString,
      variables: {
        hubId: gotHubId,
        newsAssetId: gotNewsAssetId
      },
      context: {
        headers: {
          Authorization: `Bearer ${UserToken}`
        }
      }
    })
    .then((result) => {
      const data: any = result.data.newsAssetDisconnect.message;

      setShowDisconnectConfirm(true);
      setOpen(false);
    })
    .catch((error) => {
      // console.log(error);
      setShowDisconnectConfirm(true);
      setOpen(false);
    });
};
export default useDisconnectHook;
