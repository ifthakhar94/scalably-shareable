import client from '@/GraphqlClient/client';
import { hubCategories } from '@/queries/queries';
import LSHelper from '@/utils/LSHelper';

function useEditCategoryHook(setHubCategoryList: any) {
  const UserToken = LSHelper.getItem('UserToken');

  client
    .query({
      query: hubCategories,
      variables: {
        searchWord: ''
      },
      context: {
        headers: {
          Authorization: `Bearer ${UserToken}`
        }
      }
    })
    .then((result) => {
      setHubCategoryList(result.data.hubCategories.hubCategoryList);
    })
    .catch((error) => {});
}
export default useEditCategoryHook;
