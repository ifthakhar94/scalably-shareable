import { SearchIcon, ThreeDotsBlueIcon } from '@/custom-icons/CustomIcons';
import useAdditionalNewsAssetListHoook from '@/hooks/hubHooks/useAdditionalNewsAssetListHoook';
import useAdditionalNewsAssetListMoreOnScrollHoook from '@/hooks/hubHooks/useAdditionalNewsAssetListMoreOnScrollHoook';
import { news_asset } from '@/navCentralization/nav_url';
import { HubConnectNewsAsset } from '@/queries/queries';
import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import modalCommonStyles from '../../hubTopModal.module.css';
import avatar from './../../../../assets/images/default-photo.jpg';
import defaultNewsIcon from './../../../../assets/images/news-default-img.png';
import modalStyles from './FirstModal.module.css';
type getHubDeleteModal = {
  isOpen: boolean;
  parentStatus: (value: boolean) => void;
  deleteModalParentStatus?: (value: boolean) => void;
  newsHubUpdate: 'confirmed' | 'error' | 'notdone';
  setHubDeleteUpdate: (value: string) => void;
};
interface getCategoriesProps {
  id: string;
  name: string;
}
interface NewsAsset {
  // Define the structure of your NewsAsset type
  newsAssetId: string;
  asseetIcon: string | null;
  asseetName: string;
  assetURL: string;
  self_icon: string;
  assetowner_id: string;
  publish_status: string;
  hubconnstatus: {
    hubId: string;
    status: string;
  };
  categories: {
    id: string;
    name: string;
  }[];
}
function AdditionalNewsAsset({ isOpen, parentStatus, newsHubUpdate, setHubDeleteUpdate, deleteModalParentStatus }: getHubDeleteModal) {
  const [open, setOpen] = React.useState(isOpen);
  const [enableDeleteConfirm, setEnableDeleteConfirm] = React.useState(false);
  const [userToken, setUserToken] = useState<string | null>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totaltPage, setTotaltPage] = useState(0);
  const [searchWord, setSearchWord] = useState<string | null>('');
  const [newsAssetArray, setNewsAssetArray] = useState<NewsAsset[]>([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (isOpen === true) {
      setOpen(true);
    }
  }, [isOpen]);
  const handleClose = () => {
    setOpen(false);
    parentStatus(false);
  };
  const router = useRouter();
  const gotHubId = router.query.slug;
  const handleHubDeleteConfirm = () => {
    setEnableDeleteConfirm(false);
  };

  //connect  users  hub  id  and  news asset  id
  const [connectNewsAsset, { loading: DataLoading, error: DataError }] = useMutation(HubConnectNewsAsset);

  const handleConnect = (newsAssetId: string) => {
    connectNewsAsset({
      variables: {
        newsAssetId: newsAssetId,
        hubId: gotHubId
      }
    })
      .then((result: any) => {
        //console.log(result);
        const updatedArray = newsAssetArray.map((data) => {
          if (data.newsAssetId === newsAssetId) {
            if (data.publish_status === 'EVERYONE') {
              return { ...data, hubconnstatus: { ...data.hubconnstatus, status: 'CONNECTED' } };
            } else {
              return { ...data, hubconnstatus: { ...data.hubconnstatus, status: 'APPROVAL_PENDING' } };
            }
          }
          return data;
        });
        setNewsAssetArray(updatedArray);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  //custom  hook for  data show on search
  const { searchLoading, error, searchData, fetchMore, searchRefetch } = useAdditionalNewsAssetListHoook(gotHubId, searchWord, currentPage);
  const formik = useFormik({
    initialValues: {
      searchWord: ''
    },
    onSubmit: (values) => {
      setNewsAssetArray([]);
      setSearchWord(values.searchWord);
      searchRefetch();
    },

    validationSchema: Yup.object({
      searchWord: Yup.string().required()
    })
  });
  //custom  hook for  data  load  on scroll
  const { isloading, iserror, moreData, more, refetchMoreData } = useAdditionalNewsAssetListMoreOnScrollHoook(
    gotHubId,
    searchWord,
    currentPage
  );
  function handleScroll(event: React.UIEvent<HTMLDivElement>): void {
    const tempArray = [];
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    const scroll = scrollHeight - scrollTop - clientHeight;
    if (scroll > 0) {
    } else if (scroll === 0) {
      // We are at the bottom
      if (currentPage < totaltPage) {
        refetchMoreData();
        setCurrentPage(currentPage + 1);
      }
    }
  }
  useEffect(() => {
    if (moreData) {
      let mergenewsasset = [...newsAssetArray, ...moreData.searchNewsAsset.newsAssetList];
      console.log(mergenewsasset);
      setNewsAssetArray(mergenewsasset);
      setCurrentPage(moreData.searchNewsAsset.pagination.currentPage);
      setTotaltPage(moreData.searchNewsAsset.pagination.totalPages);
    }
  }, [moreData]);
  //Open Create Hub Modal
  const handleOpenNewsAssetsModal = () => {
    router.push(`${news_asset}?data=openModal`);
  };
  return (
    <>
      <>
        <Modal
          className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body} ${modalCommonStyles.modal_scroller}`}
          open={open}
          onClose={handleClose}
        >
          <div className={modalCommonStyles.modal_content}>
            <div className={modalCommonStyles.modal_content_padding}>
              <h1 className={modalStyles.brand_title}>自分でニュースアセットを追加する </h1>
              <button className={`common_btn full_width mg_t20`} onClick={handleOpenNewsAssetsModal}>
                新規ニュースアセットを作成
              </button>
              <div className={`mg_t20 ${modalCommonStyles.line_border}`}></div>
              <p className={`mg_t20 ${modalCommonStyles.asset_title}`}>ニュースアセットを探す </p>
              <div className={modalCommonStyles.search}>
                <SearchIcon />
                <input
                  type="text"
                  name="searchWord"
                  value={formik.values.searchWord}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.submitForm();
                  }}
                  onBlur={formik.handleBlur}
                  placeholder="検索する"
                />
              </div>
            </div>

            <div className={modalCommonStyles.search_lists} onScroll={(event) => handleScroll(event)}>
              <div className={modalCommonStyles.search_data}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    {newsAssetArray.map((list, index) => (
                      <Grid item xs={6} key={index}>
                        <div className={modalCommonStyles.single_data}>
                          <div className={modalCommonStyles.profile_ico}>
                            {list.asseetIcon !== null ? (
                              <img src={list.asseetIcon as string} alt=" News photo" />
                            ) : (
                              <Image src={defaultNewsIcon} alt="photo" />
                            )}
                          </div>
                          <div className={modalCommonStyles.profile_info}>
                            <Link className={modalCommonStyles.title} href="#">
                              {list.asseetName}
                            </Link>
                            <Link className={modalCommonStyles.url} href="#">
                              {list.assetURL.length > 23 ? `${list.assetURL.substring(0, 23)}..` : list.assetURL}
                            </Link>
                          </div>
                          <p className={`${modalCommonStyles.owner}`}>オーナー</p>
                          <div className={`${modalCommonStyles.user_info}`}>
                            <div className={`${modalCommonStyles.avatar}`}>
                              {list.self_icon !== '' ? (
                                <img src={list.self_icon} alt="avatar" width={24} height={25} />
                              ) : (
                                <Image src={avatar} alt="Avatar" width={24} height={25} />
                              )}
                            </div>
                            <div className={`${modalCommonStyles.username}`}>@{list.assetowner_id}</div>
                          </div>
                          <p className={`${modalCommonStyles.category}`}>カテゴリー</p>
                          <div className={`${modalCommonStyles.categories}`}>
                            {list.categories.length > 0 &&
                              list.categories.map((category: getCategoriesProps) => (
                                <span key={category.id} className={`${modalCommonStyles.cat}`}>
                                  {category.name.length > 8 ? `${category.name.substring(0, 4)}...` : category.name}
                                </span>
                              ))}
                            {list.categories.length > 4 && (
                              <span className={modalCommonStyles.card_dots}>
                                <ThreeDotsBlueIcon />
                              </span>
                            )}
                          </div>
                          <div>
                            {list.publish_status == 'EVERYONE' ? (
                              <div>
                                {list.hubconnstatus.status == 'CONNECTED' ? (
                                  <div>
                                    <button className={modalCommonStyles.connectbtn} disabled={true}>
                                      接続済
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    className={modalCommonStyles.connectbtn}
                                    onClick={() => {
                                      handleConnect(list.newsAssetId);
                                    }}
                                  >
                                    接続する
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div>
                                {list.hubconnstatus.status === 'CONNECTED' ? (
                                  <div>
                                    <button className={modalCommonStyles.connectbtn} disabled={true}>
                                      接続済
                                    </button>
                                  </div>
                                ) : list.hubconnstatus.status === 'APPROVAL_PENDING' ? (
                                  <button className={modalCommonStyles.connectbtn} disabled={true}>
                                    接続申請提出済
                                  </button>
                                ) : (
                                  <button
                                    className={modalCommonStyles.connectbtn}
                                    onClick={() => {
                                      handleConnect(list.newsAssetId);
                                    }}
                                  >
                                    接続申請を出す
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Grid>
                    ))}
                    {isloading || (searchLoading && <div className={modalCommonStyles.loading}>Loading...</div>)}
                  </Grid>
                </Box>
                {!formik.values.searchWord ? <p className={modalCommonStyles.text_center}>キーワードを入力してください。</p> : null}
              </div>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
}

export default AdditionalNewsAsset;
