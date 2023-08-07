import { newsAssetsDetailsQuery } from '@/queries/queries';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

const useNewsAssetsDetailsDataHook = (
  gotNewsAssetsID: any,
  setAccessPointNum: any,
  setAcquiredSourceDiscordNum: any,
  setAcquiredSourceTelegramNum: any,
  setAcquiredSourceWebNum: any,
  setAsseetIcon: any,
  setAsseetName: any,
  setAssetURL: any,
  setAssetCategory: any,
  setDescription: any,
  setEngagementRate: any,
  setNewsAssetId: any,
  setNewsAssetOwnerEcomediaId: any,
  setNewsAssetOwnerId: any,
  setPublishStatus: any,
  setThirdPartyCategory: any,
  setRssUrl: any,
  setAssetIconUrl: any
) => {
  const {
    loading,
    data,
    refetch: refetchDetails
  } = useQuery(newsAssetsDetailsQuery, {
    variables: {
      newsAssetId: gotNewsAssetsID
    }
  });

  useEffect(() => {
    const newsAssetDetailsData = data?.getNewsAssetDetails?.newsAssetDetails;
    setAccessPointNum(newsAssetDetailsData?.accesspointnum);
    setAcquiredSourceDiscordNum(newsAssetDetailsData?.acquiredsourcediscordnum);
    setAcquiredSourceTelegramNum(newsAssetDetailsData?.acquiredsourcetelegramnum);
    setAcquiredSourceWebNum(newsAssetDetailsData?.acquiredsourcewebnum);
    setAsseetIcon(newsAssetDetailsData?.asseetIcon);
    setAsseetName(newsAssetDetailsData?.asseetName);
    setAssetURL(newsAssetDetailsData?.assetURL);
    setAssetCategory(newsAssetDetailsData?.assetcategory.map((item: any): any => item.name));
    setDescription(newsAssetDetailsData?.description);
    setEngagementRate(newsAssetDetailsData?.engagementRate);
    setNewsAssetId(newsAssetDetailsData?.newsAssetId);
    setNewsAssetOwnerEcomediaId(newsAssetDetailsData?.newsAssetOwnerEcomediaId);
    setNewsAssetOwnerId(newsAssetDetailsData?.newsAssetOwnerId);
    setPublishStatus(newsAssetDetailsData?.publish_status);
    setThirdPartyCategory(newsAssetDetailsData?.thirdPartyCategory.map((item: any): any => item.name));
    // setRssUrl(newsAssetDetailsData?.rss);
    // setRssUrl(newsAssetDetailsData?.rss.map((item: any): any => {
    //     url:  item.url,
    //         sitename:  item.url,
    //         favicon: ''
    // }));
    setRssUrl(
      newsAssetDetailsData?.rss.map((item: any): any => ({
        url: item.url,
        sitename: item.sitename,
        favicon: ''
      }))
    );
    setAssetIconUrl(newsAssetDetailsData?.asseetIcon);
  }, [data]);

  return { refetchDetails, loading };
};

export default useNewsAssetsDetailsDataHook;
