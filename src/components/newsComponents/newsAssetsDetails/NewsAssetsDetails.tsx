import { DownwardArrow, NextIcon, PrevIcon } from '@/custom-icons/CustomIcons';
import { Alert, Box, Button, Collapse, IconButton, Modal } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import CommonStylesWithHubTop from './../../hubTopComponents/HubTopUI/HubTopUI.module.css';
import Styles from './NewsAssetsDetails.module.css';

import CommonLayout from '@/components/hubTopComponents/commonLayout/CommonLayout';
import Animations from '@/components/loader/Animations';
import { ChevronRight, CrossIcon, RemoveIcon, SearchIcon, ThreeDotsIcon } from '@/custom-icons/CustomIcons';
import useGetRssUrlToTitleHook from '@/hooks/newsAssets/useGetRssUrlToTitleHook';
import useHubListConnectedNewsAssetHook from '@/hooks/newsAssets/useHubListConnectedNewsAssetHook';
import useNewsAssetsDetailsDataHook from '@/hooks/newsAssets/useNewsAssetsDetailsDataHook';
import useNewsAssetsRSSEditHook from '@/hooks/newsAssets/useNewsAssetsRSSEditHook';
import { news_asset } from '@/navCentralization/nav_url';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NewsAssetsDetailsProfileImg from '../../../assets/images/NewsAssetsDetailsProfileImg.png';
import commonStyles from '../../../components/authComponents/authCommon.module.css';
import TableStyle from '../../../components/hubTopComponents/TablePagination/TablePagination.module.css';
import modalCommonStyles from '../../../components/hubTopComponents/hubTopModal.module.css';
import NewsAssetEdit from '../Modals/NewsAssetEdit/NewsAssetEdit';
import NewsAssetEditConfirm from '../Modals/NewsAssetEdit/NewsAssetEditConfirm';
import NewsAssetsIconUpload from '../NewsAssetsIconUpload';
import DeleteNewsModal from '../NewsUI/Modals/DeleteNewsModal';
import NewsAssetsPermissionAccept from '../NewsUI/Modals/NewsAssetsPermissionAccept';
import NewsAssetsPermissionRefused from '../NewsUI/Modals/NewsAssetsPermissionRefused';
import TelegramIcon from './../../../assets/images/TelegramIcon.png';
import discord_icon from './../../../assets/images/discord_icon.png';
import rssIcon from './../../../assets/images/image21.png';
import post_outline from './../../../assets/images/post_outline.png';
import semantic_web from './../../../assets/images/semantic_web.png';
import table_user from './../../../assets/images/table_user.png';
import modalStyles from './../../../components/hubTopComponents/HubTopUI/Modals/FirstModal.module.css';

const NewsAssetsDetails = () => {
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = React.useState();
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [totalItems, setTotalItems] = useState();
  const [rssUrl, setRssUrl] = useState<object[] | undefined>();
  const [isCopied, setIsCopied] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [hoverState, setHoverState] = useState(false);
  const [editModalPointer, setEditModalPointer] = React.useState<number>(0); //this is pointer for opening 2 modals
  // Setting News Assets Data
  const [accessPointNum, setAccessPointNum] = useState();
  const [acquiredSourceDiscordNum, setAcquiredSourceDiscordNum] = useState();
  const [acquiredSourceTelegramNum, setAcquiredSourceTelegramNum] = useState();
  const [acquiredSourceWebNum, setAcquiredSourceWebNum] = useState();
  const [asseetIcon, setAsseetIcon] = useState();
  const [asseetName, setAsseetName] = useState();
  const [assetURL, setAssetURL] = useState();
  const [assetCategory, setAssetCategory] = useState<string[] | undefined>();
  const [description, setDescription] = useState();
  const [engagementRate, setEngagementRate] = useState();
  const [newsAssetId, setNewsAssetId] = useState('');
  const [newsAssetOwnerEcomediaId, setNewsAssetOwnerEcomediaId] = useState();
  const [newsAssetOwnerId, setNewsAssetOwnerId] = useState();
  const [publishStatus, setPublishStatus] = useState();
  const [thirdPartyCategory, setThirdPartyCategory] = useState<string[] | undefined>();

  const [hubDeleteUpdate, setHubDeleteUpdate] = useState<'confirmed' | 'error' | 'notdone'>('notdone');
  const router = useRouter();
  const [newsAssetsSearchWord, setNewsAssetsSearchWord] = useState('');
  const [newsAssetsPerPage, setNewsAssetsPerPage] = useState(5);
  const [connectedHubList, setConnectedHubList] = useState<string[] | undefined>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rssEditModalOpen, setrssEditModalOpen] = useState(false);
  const [formOpen, setformOpen] = useState(false);
  const [rssUrlEditModal, setrssUrlEditModal] = useState(false);
  const [deleteThisNewsAssetId, setDeleteThisNewsAssetId] = useState<string>('');
  const [assetIconUrl, setAssetIconUrl] = useState();
  const [url, setUrl] = useState('');
  const handleClose = () => {
    setOpen(false);
  };

  // const [deleteThisNewsAssetId, setDeleteThisNewsAssetId] = useState<string>('');
  const [acceptSuccessStatus, setAcceptSuccessStatus] = useState(false);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [openRefusedModal, setOpenRefusedModal] = useState(false);
  const [getHubId, setGetHubId] = useState('');
  const [updateSuccessStatus, setUpdateSuccessStatus] = useState<string>('unsuccessfull'); //this is pointer for opening 4 modals

  const gotNewsAssetsID: any = router.query.slug;

  const handleOpen = () => {
    setEditModalPointer(1);
  };
  const changeUpdateStatus = () => {
    setUpdateSuccessStatus('successfull');
  };
  const onCopyText = () => {
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const [anchorEle, setanchorEle] = React.useState<null | HTMLElement>(null);
  // const menuOpen = Boolean(anchorEle);
  // const handleGearClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setanchorEle(event.currentTarget);
  // };
  // const handleGearClose = () => {
  //   setanchorEle(null);
  // };
  const updateModalPointer = (data: number | ((prevState: number) => number)) => {
    setEditModalPointer(data);
  };
  const pull_data = (data: number) => {
    console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    if (data == 1) {
      setEditModalPointer(0);
    }
  };
  const myDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        setHoverState(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myDivRef]);

  // News Assets Details API Impementation

  const { refetchDetails, loading } = useNewsAssetsDetailsDataHook(
    gotNewsAssetsID,
    setAccessPointNum,
    setAcquiredSourceDiscordNum,
    setAcquiredSourceTelegramNum,
    setAcquiredSourceWebNum,
    setAsseetIcon,
    setAsseetName,
    setAssetURL,
    setAssetCategory,
    setDescription,
    setEngagementRate,
    setNewsAssetId,
    setNewsAssetOwnerEcomediaId,
    setNewsAssetOwnerId,
    setPublishStatus,
    setThirdPartyCategory,
    setRssUrl,
    setAssetIconUrl
  );

  useEffect(() => {
    refetchDetails();
  }, [gotNewsAssetsID]);

  useEffect(() => {
    refetchDetails();
    setUpdateSuccessStatus('unsuccessfull');
  }, [updateSuccessStatus == 'successfull']);

  // hubList Connected To NewsAssets
  const { refetchList } = useHubListConnectedNewsAssetHook(
    gotNewsAssetsID,
    newsAssetsSearchWord,
    currentPage,
    newsAssetsPerPage,
    setConnectedHubList,
    setTotalItems,
    setTotalPages,
    setCurrentPage,
    setFromData,
    setToData
  );

  // Refetching HubList from Search result
  const calRefetchHubList = (event: string) => {
    setNewsAssetsSearchWord(event.trim());
    setTimeout(() => {
      refetchList(); // Call the function after a delay
    }, 300);
  };
  const handleModalOpen = (newsAssetId: string) => {
    setDeleteThisNewsAssetId(newsAssetId);
    setanchorEle(null);
    setDeleteModalOpen(true);
  };
  const getStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalOpen(data);
  };

  //Next paginate hub list
  const nextPaginate = () => {
    let newPageNumber = currentPage + 1;
    setCurrentPage(newPageNumber);
    refetchList();
  };
  // prev paginate hub list
  const prevPaginate = () => {
    let newPageNumber = currentPage - 1;
    setCurrentPage(newPageNumber);
    refetchList();
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setUrl(event.target.value);
  };

  const removeUrl = (event: any) => {
    setRssUrl(rssUrl?.filter((item) => item !== event));
  };

  const rssModalOpen = () => {
    setrssUrlEditModal(true);
  };
  async function checkDuplicateValue(newURl: any, val: any) {
    let duplicateValue = newURl?.filter((item: any) => item == val);
    return duplicateValue.length;
  }

  const { handleSubmit } = useNewsAssetsRSSEditHook(gotNewsAssetsID, rssUrl, setrssUrlEditModal);
  //RSS url to title hook
  const { formik } = useGetRssUrlToTitleHook(rssUrl, setRssUrl);
  const handleRssModalClose = () => {
    setrssUrlEditModal(false);
    formik.resetForm();
  };
  // Handling Accept Modal
  const changeStatus = () => {
    setAcceptSuccessStatus(true);
    setOpenAcceptModal(false);
  };

  const toGivePermission = (hubId: string) => {
    setOpenAcceptModal(true);
    setGetHubId(hubId);
  };

  const handleDataFromChild = (data: any) => {
    setOpenAcceptModal(data);
    setOpenRefusedModal(data);
  };
  const handleOnSuccess = (SuccessData: any) => {
    setAcceptSuccessStatus(SuccessData);
    setOpenAcceptModal(false);
    setOpenRefusedModal(false);
  };

  const handleSuccessConfirmModalClose = () => {
    refetchList();
    refetchDetails();
    setAcceptSuccessStatus(false);
  };

  // Handling Refused Modal
  const refusedHandeling = (hubId: string) => {
    setOpenRefusedModal(true);
    setGetHubId(hubId);
  };
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

  // console.log(connectedHubList);
  return (
    <>
      <CommonLayout header_value="News_Asset_Detail">
        {loading && (
          <>
            <Animations />
          </>
        )}

        {!loading && (
          <>
            <div className={Styles.top_bar}>
              <div>
                <Link href={news_asset}>ニュースアセット管理ページ</Link>
              </div>
              <div className={Styles.chev_icon}>
                <ChevronRight />
              </div>
              <div> {asseetName}</div>
            </div>
            <article className={Styles.component}>
              <div className={Styles.section1}>
                <NewsAssetsIconUpload hubId={gotNewsAssetsID} hubIconURL={assetIconUrl} />
              </div>

              <div className={Styles.section2}>
                <div className={Styles.side_section}>
                  <div className={Styles.text_copy}>
                    <p className={Styles.id_text}>ID: {newsAssetId} </p>
                    <CopyToClipboard text={newsAssetId} onCopy={onCopyText}>
                      <span>
                        {isCopied ? (
                          <Box sx={{ width: '17%', position: 'absolute' }}>
                            <Collapse in={open}>
                              <Alert
                                action={
                                  <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                      setOpen(false);
                                    }}
                                  ></IconButton>
                                }
                              >
                                Copied to clickboard!
                              </Alert>
                            </Collapse>
                          </Box>
                        ) : (
                          <FileCopyOutlinedIcon className={Styles.copy_link} />
                        )}
                      </span>
                    </CopyToClipboard>
                  </div>
                  <div className={Styles.button_menu}>
                    <Link href="#" onClick={handleOpen}>
                      <Button className={Styles.button2}>編集</Button>
                    </Link>
                    <div className={Styles.TableThreeDots}>
                      <button
                        id={`basic-button-11`}
                        className={Styles.btnbtn}
                        onClick={handleClick}
                        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
                      >
                        <div>
                          <ThreeDotsIcon />{' '}
                        </div>
                        {toggle && anchorEl && anchorEl.id === `basic-button-11` && (
                          <div className={Styles.dropdown}>
                            <div
                              className={Styles.drop_list_li}
                              onClick={() => {
                                handleModalOpen(newsAssetId);
                              }}
                            >
                              削除する
                            </div>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={Styles.frame660}>
                  <p className={Styles.iohk}>{asseetName}</p>
                  <p className={Styles.link}>{assetURL}</p>
                  <p className={Styles.text}>{description}</p>
                  <p className={Styles.category_title_news_assets}>カテゴリ</p>
                  <div className={Styles.news_assets_details_category}>
                    {assetCategory && assetCategory?.map((item: string, index: number) => <span key={index}>{item}</span>)}
                  </div>

                  <p className={Styles.category_title_news_assets}>第三者が設定したカテゴリ</p>
                  <div className={Styles.news_assets_3rd_party_category}>
                    {thirdPartyCategory && thirdPartyCategory?.map((item: string, index: number) => <span key={index}>{item}</span>)}
                  </div>
                </div>
              </div>
            </article>

            {/* News assets details left and right UI design  */}

            <div className={Styles.news_assets_left_right_container}>
              <div className={Styles.news_assets_details_left_sife}>
                <div className={Styles.left_card_1}>
                  <div className={Styles.left_card_1inner}>
                    <div className={Styles.left_card_1inner_img}>
                      <Image src={semantic_web} alt="semantic_web icon" />
                    </div>
                    <div className={Styles.left_card_1inner_content}>
                      <h4>{accessPointNum}</h4>
                      <p>接続中</p>
                    </div>
                  </div>

                  <div className={`${Styles.left_card_2inner}  disabledData`}>
                    <div className={Styles.left_card_2inner_img}>
                      <Image src={NewsAssetsDetailsProfileImg} alt="semantic_web icon" />
                    </div>
                    <div className={`${Styles.left_card_2inner_content} disabledData`}>
                      <h4>{engagementRate ? `${engagementRate}%` : '0%'}</h4>
                      <p>エンゲージメント率</p>
                    </div>
                  </div>
                </div>
                <div className={Styles.left_card_2}>
                  <div className={Styles.left_card_2_title}>
                    <h3>連携RSS</h3>
                    <button
                      onClick={() => {
                        rssModalOpen();
                      }}
                    >
                      RSSを編集
                    </button>
                  </div>
                  <div className={Styles.left_card_2_social_links}>
                    <ul>
                      <li>
                        <Image src={post_outline} alt="post_outline" /> <p>{acquiredSourceWebNum} URLs</p>
                      </li>
                      <li className="disabledData">
                        <Image src={discord_icon} alt="discord_icon" /> <p>{acquiredSourceDiscordNum} URLs</p>
                      </li>
                      <li className="disabledData">
                        <Image src={TelegramIcon} alt="post_outline" /> <p>{acquiredSourceTelegramNum} URLs</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={Styles.news_assets_detsils_right_side}>
                <section className={Styles.hub_connection_list}>
                  <div className={CommonStylesWithHubTop.sub_hub_list_title}>
                    <h2>接続しているハブ</h2>
                  </div>
                  <div className={CommonStylesWithHubTop.sub_hub_list_search}>
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="検索する"
                      onChange={(event) => {
                        calRefetchHubList(event.target.value); // Pass the input value to the function
                      }}
                    />
                  </div>
                  <div className={CommonStylesWithHubTop.sub_hub_list_table}>
                    <table>
                      <thead>
                        <tr>
                          <th className={CommonStylesWithHubTop.th_with_arrow}>
                            <span>ハブ名称 </span>
                            <DownwardArrow />
                          </th>
                          <th>オーナー</th>
                          <th>ステータス</th>
                          <th>メンバー</th>
                          <th>接続ニュースアセット数</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {connectedHubList &&
                          connectedHubList?.map((listData: any, index: number) => (
                            <tr key={index}>
                              <td>
                                <div className={CommonStylesWithHubTop.logo_name}>
                                  {listData.hubIcon ? (
                                    <img src={listData.hubIcon} alt="Table Image" width="26px" height="26px" />
                                  ) : (
                                    <Image src={table_user} alt="User Image" />
                                  )}

                                  <span className={Styles.connected_hub_name}>{listData?.hubname}</span>
                                </div>
                              </td>

                              <td>
                                <span className={CommonStylesWithHubTop.table_eco_id}> @{listData?.owner_id} </span>
                              </td>

                              <td>
                                {listData?.hubconnstatus === 'CONNECTED' && '接続中'}
                                {listData?.hubconnstatus === 'APPROVAL_PENDING' && '許可待ち'}
                              </td>

                              <td>{listData?.hubmembernum}人</td>
                              <td>{listData?.connectassetnum}ニュース</td>
                              <td className={Styles.TableThreeDots}>
                                <button
                                  id={`basic-button-${index}`}
                                  className={Styles.btnbtn}
                                  onClick={handleClick}
                                  onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
                                >
                                  <div>
                                    <ThreeDotsIcon />{' '}
                                  </div>
                                  {toggle && anchorEl && anchorEl.id === `basic-button-${index}` && (
                                    <div className={Styles.dropdown}>
                                      {listData.hubconnstatus == 'APPROVAL_PENDING' && (
                                        <>
                                          <div className={Styles.drop_list_li} onClick={() => toGivePermission(listData.hubId)}>
                                            許可する
                                          </div>
                                          <div className={Styles.drop_list_li} onClick={() => refusedHandeling(listData.hubId)}>
                                            拒否する
                                          </div>
                                        </>
                                      )}

                                      {listData.hubconnstatus == 'CONNECTED' && (
                                        <>
                                          <div className={Styles.drop_list_li}>詳細をみる</div>
                                          <div className={Styles.drop_list_li} onClick={() => refusedHandeling(listData.hubId)}>
                                            削除する
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className={CommonStylesWithHubTop.table_pagination}>
                      <div className={TableStyle.tablePagination}>
                        <div className="pagination_range">
                          <span className={TableStyle.start_range}> {fromData} </span> -{' '}
                          <span className={TableStyle.end_range}> {toData} </span> of
                          <span className={TableStyle.total_pages}> {totalItems} </span> 件中
                        </div>
                        <div className="pagination_icons">
                          <span
                            className={`${TableStyle.prev_icon} ${currentPage !== undefined && currentPage <= 1 ? TableStyle.disable : ''}`}
                            onClick={() => {
                              prevPaginate();
                            }}
                          >
                            <PrevIcon />
                          </span>
                          <span
                            className={`${TableStyle.next_icon} ${
                              (totalPages !== undefined && totalPages == currentPage) || totalItems == 0 ? TableStyle.disable : ''
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
                </section>
              </div>
            </div>
          </>
        )}
      </CommonLayout>
      {editModalPointer == 1 && (
        <NewsAssetEdit isOpen={true} gotNewsAssetsID={gotNewsAssetsID} updateModalNumber={updateModalPointer} modalHideStatus={pull_data} />
      )}
      {editModalPointer == 2 && <NewsAssetEditConfirm isOpen={true} changeUpdateStatus={changeUpdateStatus} />}

      {openAcceptModal && (
        <NewsAssetsPermissionAccept
          isOpen={true}
          changeStatus={changeStatus}
          onData={handleDataFromChild}
          hubId={getHubId}
          newsAssetId={gotNewsAssetsID}
          onSuccess={handleOnSuccess}
        />
      )}
      {openRefusedModal && (
        <NewsAssetsPermissionRefused
          isOpen={true}
          changeStatus={changeStatus}
          onData={handleDataFromChild}
          hubId={getHubId}
          newsAssetId={gotNewsAssetsID}
          onSuccess={handleOnSuccess}
        />
      )}

      {/* hub accept confirm and refetch modal  */}
      {acceptSuccessStatus && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.pos_fixed}`}>
            <div className={modalCommonStyles.editConfirmationModal}>
              <h1 className="brand_title">ハブの基本情報が更新されました。 </h1>
              <p className="brand_desc">ハブ詳細ページにて変更が反映されているのをご確認ください。</p>

              <div>
                <button className={`${modalCommonStyles.editConfirmClzBtn}`} onClick={handleSuccessConfirmModalClose}>
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <DeleteNewsModal
        parentStatus={getStatus}
        isOpen={deleteModalOpen}
        hubId={deleteThisNewsAssetId}
        hubDeleteUpdate={hubDeleteUpdate}
        setHubDeleteUpdate={(val: any) => setHubDeleteUpdate(val)}
      />
      {rssUrlEditModal && (
        <Modal
          className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}` + ' pos_fixed'}
          open={open}
          onClose={handleRssModalClose}
        >
          <div className={`${modalStyles.modal_content} ${modalStyles.fixheight} `}>
            <h1 className={modalStyles.brand_title}>ニュース取得元（RSS）の編集</h1>
            <p className={modalStyles.modal_text}>アセットで取得するニュースの取得元を入力してください。</p>
            <div className={modalStyles.modal_text_pink_box}>
              <div>
                <p>
                  入力したRSSがうまく読み込めなかった場合、RSSの形を調整していただく必要があります。
                  RSSの変換に関してはこちらから変換を行なってください。
                </p>
              </div>
            </div>

            <div className={commonStyles.hub_area}>
              {formOpen && (
                <>
                  <div className={commonStyles.hub_inner}>
                    <form onSubmit={formik.handleSubmit}>
                      <div className={commonStyles.hub_url}>
                        <p>RSS</p>

                        <input
                          type="text"
                          name="rss_url"
                          value={formik.values.rss_url}
                          onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          placeholder="RSSのURLを入力してください。"
                        />
                      </div>
                      {formik.errors.rss_url && <div className={`mg_b0 ${commonStyles.error}`}>{formik.errors.rss_url}</div>}
                      <button className={`common_btn full_width mg_t30 mg_b10`} onClick={() => formik.handleSubmit()}>
                        ニュースの取得元の追加
                      </button>
                    </form>
                  </div>
                </>
              )}

              {rssUrl &&
                rssUrl?.map((item: any, index) => (
                  <div className={commonStyles.lists} key={index}>
                    <div className={commonStyles.lists_img_wrapper}>
                      <Image src={rssIcon} alt="icon" width={26} height={26} />
                      <div className={commonStyles.rss_data}>
                        <p>{item.sitename}</p>
                        <p className={commonStyles.underline}>
                          <Link href="#">{item.url}</Link>
                        </p>
                      </div>
                    </div>
                    <Link
                      href="#"
                      onClick={() => {
                        removeUrl(item);
                      }}
                    >
                      <RemoveIcon />
                    </Link>
                  </div>
                ))}
              <Link
                href="#"
                className={commonStyles.add_new}
                onClick={() => {
                  setformOpen(true);
                }}
              >
                <>
                  <CrossIcon />
                  追加する
                </>
              </Link>
            </div>
            <div className={commonStyles.confirmation_box}>
              <button
                className={`close_btn`}
                onClick={() => {
                  handleRssModalClose();
                }}
              >
                戻る
              </button>

              <button
                className={`common_btn`}
                onClick={() => {
                  handleSubmit();
                }}
              >
                ニュースアセットの登録を完了する
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NewsAssetsDetails;
function resetForm() {
  throw new Error('Function not implemented.');
}
