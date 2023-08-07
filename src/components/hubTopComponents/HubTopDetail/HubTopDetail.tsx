import { ChevronRight, SearchIcon, ThreeDotsIcon } from '@/custom-icons/CustomIcons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CommonLayout from '../commonLayout/CommonLayout';
import table_user from './../../../assets/images/table_logo.png';
import unsubscribStyle from './../HubTopUI/Modals/UnsubscribeModal.module.css';
import Styles from './HubTopDetail.module.css';

import Animations from '@/components/loader/Animations';
import HubDetailEditModal from '@/components/modalComponents/hubDetailEditModal/HubDetailEditModal';
import { general_output_rss_url, hubtop_url } from '@/navCentralization/nav_url';
import { AppDispatch, RootState } from '@/redux/app/store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import User from './../../../assets/images/user.png';
import modalCommonStyles from './../../hubTopComponents/hubTopModal.module.css';
import modalStyles from './../../modalComponents/hubDetailEditModal/HubDetailEditModal.module.css';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import HubIconUpload from '@/components/hubTopComponents/HubTopDetail/HubIconUpload';
import AdditionalNewsAsset from '../HubTopUI/Modals/AdditionalNewsAsset';
import HubDeleteModal from '../HubTopUI/Modals/HubDeleteModal';
import NewsAssetCategorySetup from '../HubTopUI/Modals/NewsAssetCategorySetup';

import { NextIcon, PrevIcon } from '@/custom-icons/CustomIcons';
import useHubDetailHook from '@/hooks/hubList/useHubDetailHook';
import useHubDetailNewsAssetListsHook from '@/hooks/hubList/useHubDetailNewsAssetListsHook';
import { setOutputRssHubData } from '@/redux/features/OutputRssHubDataSlice/OutputRssHubDataSlice';
import secureLocalStorage from 'react-secure-storage';
import DisconnectModal from '../HubTopUI/Modals/DisconnectModal';
import Pagination from './../TablePagination/TablePagination.module.css';
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
const HubTopDetail = () => {
  const router = useRouter();
  const gotHubId: any = router.query.slug;
  interface hubDataTypes {
    categories: string[];
    connectassetnum: number;
    hubicon: string;
    hubmembernum: number;
    hubname: string;
    huburl: string;
    outputrssnum: number;
    publish_status: string;
  }
  const dispatch = useAppDispatch();

  const [editModal, setEditModal] = useState(false);

  const [editConfirmModal, setEditConformModal] = useState(false);
  const [loader, setLoader] = useState(true);
  // const [hubData, setHubData] = useState<hubDataTypes | undefined>();
  const [deleteModalopen, setDeleteModalopen] = useState(false);
  const [additionalNewsModalopen, setAdditionalNewsModalopen] = useState(false);
  const [connectModalopen, setConnectModalopen] = useState(false);
  const [disconnectModalopen, setDisconnectModalopen] = useState(false);

  const [hubId, setHubId] = useState('');
  const [newsAssetCategorySetupConfirm, setNewsAssetCategorySetupConfirm] = useState(false);
  const [hubDeleteUpdate, setHubDeleteUpdate] = useState<'confirmed' | 'error' | 'notdone'>('notdone');
  const [newsHubUpdate, setNewsHubUpdate] = useState<'confirmed' | 'error' | 'notdone'>('notdone');
  const [open, setOpen] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [newsAssetName, setNewsAssetName] = useState('');

  // News Assets List States
  interface NewsAssetsListDataTypes {
    map: any;
    assetcategories: any;
    asseticon: string | null;
    assetname: string | null;
    asseturl: string | null;
    ecomedia_id: string | null;
    newsAssetId: string | null;
    public_status: string | null;
    self_icon: string | null;
    third_party_categories: any;
  }
  const [newsAssetsSearchWord, setNewsAssetsSearchWord] = useState('');
  const [gotNewsAssetId, setGotNewsAssetId] = useState('');
  const [newsAssetsPageNumber, setNewsAssetsPageNumber] = useState(1);
  const [newsAssetsPerPage, setNewsAssetsPerPage] = useState(5);
  const [ownerCategories, setOwnerCategories] = useState<string[]>();
  const [newsAssetsChildData, setNewsAssetsChildData] = useState<boolean>();
  const [categorySetupRefetch, setCategorySetupRefetch] = useState<boolean>();

  // Hub Delete from hub Details page
  const handleDeleteModalOpen = (hubId: string) => {
    setDeleteModalopen(true);

    setHubId(hubId);
  };
  const handleAdditionalModalOpen = () => {
    setAdditionalNewsModalopen(true);
    console.log('additionalNewsModalopen', additionalNewsModalopen);
  };
  //Refecth data when modal is closed
  useEffect(() => {
    refetchPosts();
  }, [additionalNewsModalopen == false]);
  const handleConnectModalOpen = () => {
    setConnectModalopen(true);
  };
  const handleDisconnectModalOpen = (newsAssetsID: any) => {
    setDisconnectModalopen(true);
    setGotNewsAssetId(newsAssetsID);
    setDisconnectModalopen(true);
  };
  const getStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalopen(data);
  };
  const getNewsStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalopen(data);
    setAdditionalNewsModalopen(data);
  };
  const getConnectStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalopen(data);
    setConnectModalopen(data);
    // console.log('data', data);
  };

  const getDisconnectStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalopen(data);
    setDisconnectModalopen(data);

    // setDisconnectModalopen(data);
  };
  const handleEdit = (): any => {
    setEditModal(true);
    secureLocalStorage.setItem('getHubName', `${hubData?.hubname}`);
  };

  const handleOpen = (newsAssetsName: any, ownerCategories: any, newsAssetsID: any) => {
    setOpen(true);
    setNewsAssetName(newsAssetsName);
    setOwnerCategories(ownerCategories);
    setGotNewsAssetId(newsAssetsID);
  };

  const getParentStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    if (data == true) {
      setNewsAssetCategorySetupConfirm(true);
    } else {
      setNewsAssetCategorySetupConfirm(false);
    }
  };

  //implement custom hook
  const { hubListLoading, fetchMore, refetchHubDetail, hubData } = useHubDetailHook(gotHubId);
  // console.log('data', hubData?.categories);
  useEffect(() => {
    refetchHubDetail();
  }, [gotHubId]);

  //Refresh data  api call

  function fetchDataAndUpdate() {
    refetchHubDetail();
    setEditConformModal(false);
  }

  // News Assets List API Implementation custom  hook  call
  const { refetchPosts, postsLoading, newsAssetsData, totalPages, currentPage, totalItems, fromData, toData } =
    useHubDetailNewsAssetListsHook(gotHubId, newsAssetsSearchWord, newsAssetsPageNumber, newsAssetsPerPage);

  useEffect(() => {
    refetchPosts();
    setNewsAssetsChildData(false);
  }, [newsAssetsChildData]);

  // Refetching After Category Setup
  function handleRefetchAfterCatSetup(data: any): void {
    setCategorySetupRefetch(data);
  }
  useEffect(() => {
    refetchPosts();
    setOpen(false);
    setCategorySetupRefetch(false);
  }, [categorySetupRefetch]);

  // prev paginate hub list
  const prevPaginate = () => {
    setNewsAssetsPageNumber(newsAssetsPageNumber - 1);
  };
  //Next paginate hub list
  const nextPaginate = () => {
    setNewsAssetsPageNumber(newsAssetsPageNumber + 1);
  };

  function handleChildData(data: any): void {
    setNewsAssetsChildData(data);
  }

  const handleClose = () => {
    setDisconnectModalopen(false);
    setOpen(false);
    refetchPosts();
    setAnchorEl(null);
  };
  const calRefetchHubList = (event: string) => {
    setNewsAssetsSearchWord(event.trim());
    setTimeout(() => {
      refetchPosts(); // Call the function after a delay
    }, 300);
  };
  // console.log(hubData?.hubicon);
  //for dropdown
  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setToggle(!toggle);
  };
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setToggle(false);
    }
  };
  // MUI Dropdown
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const MuiDropDownOpen = Boolean(anchorEl);

  // Handle Output RSS
  const handleOutputRss = () => {
    dispatch(
      setOutputRssHubData({
        hubName: hubData?.hubname,
        hubId: gotHubId
      })
    );

    router.push(general_output_rss_url);
  };

  return (
    <>
      <CommonLayout header_value="Hub Top Detail">
        {hubListLoading == true && (
          <>
            <Animations />
          </>
        )}

        {/* Main page div-------- */}
        {hubListLoading == false && (
          <div>
            {/* Topbar div ---------- */}
            <div className={Styles.top_bar}>
              <div>
                <Link href={hubtop_url}>ハブ管理ページ</Link>
              </div>
              <div className={Styles.chev_icon}>
                <ChevronRight></ChevronRight>
              </div>
              <div>{hubData?.hubname}</div>
            </div>

            {/* Profile bar ----- */}
            <div className={Styles.profile_bar}>
              {/* Left Section of profile bar ------- */}
              <div className={Styles.left_section}>
                <HubIconUpload hubId={gotHubId} hubIconURL={hubData?.hubicon} />
              </div>
              {/* Right side of profilebar------- */}
              <div className={Styles.right_section}>
                {/* First section ------- */}
                <div className={Styles.first_section}>
                  <div>
                    <p className={Styles.section_head_common}>名称</p>
                    <p className={Styles.cardano_heading}>{hubData?.hubname}</p>
                  </div>
                  <div className={Styles.right_of_first_section}>
                    {/* <div className={Styles.searchbar}></div> */}
                    <button
                      onClick={() => {
                        handleEdit();
                      }}
                      className={Styles.editBtnBar}
                    >
                      編集
                    </button>

                    <div className={Styles.dots_dropdown}>
                      <div className={Styles.TableThreeDots}>
                        <button
                          id={`basic-button-1`}
                          className={Styles.btnbtn}
                          onClick={handleClick}
                          onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
                        >
                          <div>
                            <ThreeDotsIcon />
                          </div>
                          {toggle && anchorEl && anchorEl.id === `basic-button-1` && (
                            <div id="hubdetails_dropdown" className={Styles.dropdown}>
                              <div className={Styles.drop_list_li} onClick={handleOutputRss}>
                                ハブを外部に出力する
                              </div>
                              <div
                                className={Styles.drop_list_li}
                                onClick={() => {
                                  handleDeleteModalOpen(`${gotHubId}`);
                                }}
                              >
                                ハブを削除する
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second section------ */}
                <div className={Styles.first_section}>
                  <div>
                    <p className={Styles.section_head_common}>カテゴリー</p>
                    <div className={Styles.tags_parent}>
                      {hubData?.categories &&
                        hubData?.categories.map((tag, index) => (
                          <>
                            <div className={Styles.second_section_cat}>{tag}</div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Third Section -------- */}
                <div className={Styles.first_section}>
                  <div>
                    <p className={Styles.section_head_common}>URL</p>
                    <p className={Styles.uri_text}>
                      {hubData && (
                        <Link href={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${hubData?.ownerEcomediaId}/${hubData?.huburl}`} target="_blank">
                          {process.env.NEXT_PUBLIC_MEDIA_URL}/{hubData?.ownerEcomediaId}/{hubData?.huburl}
                        </Link>
                        // <Link href={hubData?.huburl} target="_blank">
                        //   {hubData?.huburl}
                        // </Link>
                      )}
                    </p>
                  </div>
                </div>

                {/* Fourth section-------- */}
                <div className={Styles.fourth_section}>
                  <p className={Styles.section_head_common}>公開設定</p>
                  <p className={Styles.fourth_section_text}>{hubData?.publish_status}</p>
                </div>
                {/* Fifth Section -------------- */}
                <div className={Styles.fifth_section}>
                  <div>
                    <p className={Styles.section_head_common}>接続アセット数</p>
                    <p className={Styles.fifth_section_2ndtext}>{hubData?.connectassetnum} アセット</p>
                  </div>
                  <div>
                    <p className={Styles.section_head_common}>チームメンバー数</p>
                    <p className={Styles.fifth_section_2ndtext}>{hubData?.hubmembernum} 人</p>
                  </div>
                  <div>
                    <p className={Styles.section_head_common}>発行RSS数</p>
                    <p className={Styles.fifth_section_2ndtext}>{hubData?.outputrssnum}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* //Table section ---------- */}
            <div className={Styles.table_section}>
              <div className={Styles.table_section_list_title}>
                <p className={Styles.table_title_text}>ニュースアセット一覧</p>
                <div className={Styles.right_text}>
                  <p
                    onClick={() => {
                      handleAdditionalModalOpen();
                    }}
                  >
                    ニュースアセットを追加
                  </p>
                </div>
              </div>
              <div className={Styles.sub_hub_list_search}>
                <SearchIcon />
                <input
                  type="text"
                  placeholder="検索する"
                  onChange={(event) => {
                    calRefetchHubList(event.target.value); // Pass the input value to the function
                  }}
                />
              </div>

              <div className={Styles.sub_hub_list_table}>
                <table>
                  <thead>
                    <tr>
                      <th>アセット名</th>
                      <th>オーナー</th>
                      <th>カテゴリ</th>
                      <th>ステータス</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {newsAssetsData.map(((single_news_data, index) = {}))} */}
                    {newsAssetsData &&
                      newsAssetsData?.map((single_news_data: NewsAssetsListDataTypes, index: number) => (
                        <tr key={index}>
                          <td>
                            <div className={Styles.table_first_colum}>
                              {single_news_data.asseticon ? (
                                <img src={single_news_data?.asseticon} alt="Table Image" width="26px" height="26px" />
                              ) : (
                                <Image src={table_user} alt="User Image" width={26} height={26} />
                              )}
                              <div className={Styles.url_text}>
                                <p>{single_news_data?.assetname} </p>
                                <p>{single_news_data?.asseturl}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className={Styles.table_second_colum}>
                              {single_news_data.self_icon ? (
                                <img src={single_news_data?.self_icon} alt="Table Image" width="20px" height="20px" />
                              ) : (
                                <Image src={User} alt="User Image" width={20} height={20} />
                              )}
                              <p className={Styles.ecoIDText}>@{single_news_data?.ecomedia_id} </p>
                            </div>
                          </td>
                          <td>
                            <>
                              {(() => {
                                const assetCategories = single_news_data.assetcategories;
                                if (assetCategories) {
                                  const assetCategoryElements = [];
                                  for (let i = 0; i < assetCategories.length; i++) {
                                    assetCategoryElements.push(
                                      <React.Fragment key={i}>
                                        <span key={index} className={Styles.table_cat}>
                                          {assetCategories[i].name}
                                        </span>
                                      </React.Fragment>
                                    );
                                  }
                                  return assetCategoryElements;
                                } else {
                                  return null;
                                }
                              })()}
                            </>
                            <>
                              {(() => {
                                const third_party_categories = single_news_data.third_party_categories;
                                if (third_party_categories) {
                                  const third_party_categoryElements = [];
                                  for (let i = 0; i < third_party_categories.length; i++) {
                                    third_party_categoryElements.push(
                                      <React.Fragment key={i}>
                                        <span key={index} className={Styles.table_cat}>
                                          {third_party_categories[i].name}
                                        </span>
                                      </React.Fragment>
                                    );
                                  }
                                  return third_party_categoryElements;
                                } else {
                                  return null;
                                }
                              })()}
                            </>
                          </td>
                          <td>{single_news_data?.public_status}</td>
                          <td className={Styles.dots_dropdown}>
                            <button
                              id={`basic-btn-${index}`}
                              className={Styles.btnbtn}
                              onClick={handleClick}
                              onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
                            >
                              <div>
                                <ThreeDotsIcon />
                              </div>
                              {toggle && anchorEl && anchorEl.id === `basic-btn-${index}` && (
                                <div id="hubdetails_dropdown" className={Styles.dropdown}>
                                  <div
                                    className={Styles.drop_list_li}
                                    onClick={() => {
                                      handleOpen(
                                        single_news_data?.assetname,
                                        single_news_data?.third_party_categories,
                                        single_news_data?.newsAssetId
                                      );
                                    }}
                                  >
                                    カテゴリを設定
                                  </div>
                                  <div
                                    className={Styles.drop_list_li}
                                    onClick={() => {
                                      handleDisconnectModalOpen(single_news_data?.newsAssetId);
                                    }}
                                  >
                                    接続を解除する
                                  </div>
                                </div>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className={Styles.list_pagination}>
                  <div className={Pagination.tablePagination}>
                    <div className="pagination_range">
                      <span className={Pagination.start_range}> {fromData}</span> - <span className={Pagination.end_range}> {toData} </span>{' '}
                      of
                      <span className={Pagination.total_pages}> {totalItems} </span> 件中
                    </div>
                    <div className="pagination_icons">
                      <span
                        className={`${Pagination.prev_icon} ${currentPage !== undefined && currentPage <= 1 ? Pagination.disable : ''}`}
                        onClick={() => {
                          prevPaginate();
                        }}
                      >
                        <PrevIcon />
                      </span>
                      <span
                        className={`${Pagination.next_icon} ${
                          (totalPages !== undefined && totalPages == currentPage) || totalItems == 0 ? Pagination.disable : ''
                        }`}
                        onClick={() => {
                          nextPaginate();
                        }}
                      >
                        <NextIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CommonLayout>
      {editModal && (
        <HubDetailEditModal
          setEditConfirmFunction={(val: boolean) => {
            setEditConformModal(val);
          }}
          setEditFunction={(val: boolean) => {
            setEditModal(val);
          }}
        ></HubDetailEditModal>
      )}
      {editConfirmModal && (
        <>
          <div className={`${modalCommonStyles.modal_body}`}>
            <div className={modalCommonStyles.editConfirmationModal}>
              <h1 className={modalStyles.brand_title}>ハブの基本情報が更新されました。 </h1>
              <p className={modalStyles.confirmEditSecondText}>ハブ詳細ページにて変更が反映されているのをご確認ください。</p>

              <div>
                <button className={`${modalCommonStyles.editConfirmClzBtn}`} onClick={() => fetchDataAndUpdate()}>
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* <AdditionalNewsAsset isModalOpen={false} /> */}
      {/* Delete Hub Modal  */}

      <HubDeleteModal
        parentStatus={getStatus}
        isOpen={deleteModalopen}
        hubId={hubId}
        hubDeleteUpdate={hubDeleteUpdate}
        setHubDeleteUpdate={(val: any) => setHubDeleteUpdate(val)}
      />
      <AdditionalNewsAsset
        parentStatus={getNewsStatus}
        isOpen={additionalNewsModalopen}
        newsHubUpdate={newsHubUpdate}
        setHubDeleteUpdate={(val: any) => setHubDeleteUpdate(val)}
      />

      <DisconnectModal
        parentStatus={getDisconnectStatus}
        isOpen={disconnectModalopen}
        newsHubUpdate={newsHubUpdate}
        setHubDeleteUpdate={(val: any) => setHubDeleteUpdate(val)}
        gotNewsAssetId={gotNewsAssetId}
        onData={handleChildData}
      />

      {/* Disconnect Confirm and Refetch news assets list API   */}

      {/* News assets category Modal  */}
      <NewsAssetCategorySetup
        parentStatus={getStatus}
        parentCreateStatus={getParentStatus}
        isOpen={open}
        newsAssetName={newsAssetName}
        ownerCategories={ownerCategories}
        latestHubId={gotHubId}
        gotNewsAssetId={gotNewsAssetId}
        RefetchQuery={handleRefetchAfterCatSetup}
      />

      {/* NewsAssetCategorySetup confirm modal */}
      {newsAssetCategorySetupConfirm && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
            <div className={modalCommonStyles.modal_content}>
              <h1 className={modalStyles.brand_title}>ハブが作成されました。 </h1>
              <p className={unsubscribStyle.modal_text}>
                早速、ハブ詳細ページにてニュースアセットの設定などを <br /> 進めましょう。
              </p>

              <div className={unsubscribStyle.box}>
                <button className={`close_btn`} onClick={() => setNewsAssetCategorySetupConfirm(!newsAssetCategorySetupConfirm)}>
                  閉じる
                </button>

                <button className={`common_btn`} onClick={() => setNewsAssetCategorySetupConfirm(true)}>
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HubTopDetail;
