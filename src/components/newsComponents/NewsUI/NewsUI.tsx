import CommonLayout from '@/components/hubTopComponents/commonLayout/CommonLayout';
import { DownwardArrow, NextIcon, PrevIcon, SearchIcon, ThreeDotsIcon } from '@/custom-icons/CustomIcons';
import useNewsAssetsListHook from '@/hooks/newsAssets/useNewsAssetsListHook';
import { news_asset, newsdetails_url } from '@/navCentralization/nav_url';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import TableStyle from '../../../components/hubTopComponents/TablePagination/TablePagination.module.css';
import CreateNwsAssetModal from '../Modals/CreateNewsAsset/CreateNewsAssetModal';
import telegram_icon from './../../../assets/images/TelegramIcon.png';
import discord_icon from './../../../assets/images/discord_icon.png';
import post_outline from './../../../assets/images/post_outline.png';
import semantic_web from './../../../assets/images/semantic_web.png';
import TableIcon from './../../../assets/images/tableIcon.png';
import CreateNewsAsset2 from './Modals/CreateNewsAsset2';
import DeleteNewsModal from './Modals/DeleteNewsModal';
import NewsAssetCompleteModal from './Modals/NewsAssetCompleteModal';
import NewsAssetFirstModal from './Modals/NewsAssetFirstModal';
import Styles from './NewsUI.module.css';

interface NewsAssetsListDataTypes {
  newsAssetId: string;
  map: any;
  asseetIcon: any;
  asseetName: any;
  assetURL: string | null;
  publish_status: string | null;
  acquiredsourcediscordnum: string | null;
  acquiredsourcetelegramnum: string | null;
  acquiredsourcewebnum: string | null;
  accesspointnum: string | null;
  assetcategory: {
    map: any;
    length: any;
    name: any;
  };
  thirdPartyCategory: any;
}
interface getAssetsCategory {
  length: number;
  name: string | null;
}
[];

const NewsUI = () => {
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = React.useState();
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [totalItems, setTotalItems] = useState();

  const [newsAssetLists, setNewsAssetLists] = useState<NewsAssetsListDataTypes[]>();
  const [newsAssetsSearchWord, setNewsAssetsSearchWord] = useState('');
  const [newsAssetsPerPage, setNewsAssetsPerPage] = useState(5);
  const [deleteThisNewsAssetId, setDeleteThisNewsAssetId] = React.useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [hubDeleteUpdate, setHubDeleteUpdate] = useState<'confirmed' | 'error' | 'notdone'>('notdone');

  const [modalPointer, setModalPointer] = React.useState<number>(0); //this is pointer for opening 4 modals
  const [createSuccessStatus, setCreateSuccessStatus] = React.useState<string>('unsuccessfull'); //this is pointer for opening 4 modals
  const [createdNewsID, setCreatedNewsID] = React.useState<number>(0); //this is pointer for opening 4 modals
  const [open, setOpen] = React.useState<boolean>(false);
  const [hoverState, setHoverState] = useState(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const handleOpen = () => {
    if (modalPointer !== 1) {
      setModalPointer(1);
    }
  };

  const changeStatus = () => {
    setCreateSuccessStatus('successfull');
  };

  // This will get newly created asset's id-------------
  const registeredAseetID = (NWSid: number) => {
    setCreatedNewsID(NWSid);
  };

  //this function is for updating modal pointer number from allover 4 modals==========
  const updateModalPointer = (data: number | ((prevState: number) => number)) => {
    setModalPointer(data);
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

  const pull_data = (data: number) => {
    if (data == 1) {
      setModalPointer(0);
    }
  };
  // MUI Dropdown
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const MuiDropDownOpen = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleModalOpen = (newsAssetId: string) => {
    setDeleteThisNewsAssetId(newsAssetId);
    setAnchorEl(null);
    setDeleteModalOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // setDeleteModalOpen(true);
  };
  //  List API Implementation
  //Refresh data  api call
  const { refetchPosts } = useNewsAssetsListHook(
    newsAssetsSearchWord,
    currentPage,
    newsAssetsPerPage,
    setNewsAssetLists,
    setTotalItems,
    setTotalPages,
    setCurrentPage,
    setFromData,
    setToData
  );

  //refetch data after delete news asset
  useEffect(() => {
    refetchPosts();
    setHubDeleteUpdate('notdone');
  }, [hubDeleteUpdate == 'confirmed']);

  useEffect(() => {
    refetchPosts();
  }, []);

  useEffect(() => {
    refetchPosts();
    setCreateSuccessStatus('unsuccessfull');
  }, [createSuccessStatus == 'successfull']);

  const calRefetchHubList = (event: string) => {
    setNewsAssetsSearchWord(event.trim());

    // Call the function after a delay
    _.debounce(refetchPosts, 300);
  };

  //Next paginate hub list
  const nextPaginate = () => {
    let newPageNumber = currentPage + 1;
    setCurrentPage(newPageNumber);
    refetchPosts();
  };
  // prev paginate hub list
  const prevPaginate = () => {
    let newPageNumber = currentPage - 1;
    setCurrentPage(newPageNumber);
    refetchPosts();
  };
  const getStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalOpen(data);
  };

  // Handle News Assets Details Open
  const handleDetailsOpen = (getNewsAssetsId: string) => {
    router.push(`${newsdetails_url}/${getNewsAssetsId}`);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setToggle(!toggle);
  };
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setToggle(false);
    }
  };

  // Opening create News assets modal from Additional News Assets
  const urlRouter = useRouter();

  const gotHubData: string | string[] | undefined = urlRouter.query.data;

  useEffect(() => {
    if (gotHubData != undefined) {
      setModalPointer(1);
    }
  }, [gotHubData]);

  return (
    <>
      <CommonLayout header_value="News UI">
        {/* News Assets BreadCrumb  */}
        <div className={Styles.news_assets_bread_crumb}>
          <ul>
            <li>
              <Link href={news_asset}>ニュースアセット管理ページ</Link>
            </li>
          </ul>
        </div>
        {/* List of registered news assets and search */}
        <div className={Styles.news_assets_list_search}>
          <div className={Styles.news_assets_section_title_search}>
            <div className={Styles.title_add_btn}>
              <h1>登録したニュースアセット一覧</h1>

              <Link href={''} onClick={handleOpen}>
                <p>ニュースアセットを追加</p>
              </Link>
            </div>
            <p className={Styles.text_before_search}>あなたが登録したニュースアセットの一覧です。</p>
            <div className={Styles.news_assets_search_area}>
              <SearchIcon />
              <input
                type="text"
                placeholder="検索する"
                onChange={(event) => {
                  calRefetchHubList(event.target.value); // Pass the input value to the function
                }}
              />
            </div>
          </div>
          {/* news assets list table */}
          <div className={Styles.news_assets_list_table}>
            <table width="100%">
              <thead>
                <tr>
                  <th className={Styles.news_assets_first_th}>
                    <span>ニュースアセット</span> <DownwardArrow />
                  </th>

                  <th className={Styles.news_assets_second_th}>ステータス</th>
                  <th className={Styles.get_yuan_th}>取得元</th>
                  <th className={Styles.access_point_th}>接続先</th>
                  <th className={Styles.category_th}>カテゴリ</th>
                  <th className={Styles.category_wdith}>第三者が設定したカテゴリ</th>
                  <th className={Styles.operation_width}>操作</th>
                </tr>
              </thead>

              <tbody className={Styles.news_assets_table_body}>
                {newsAssetLists &&
                  newsAssetLists?.map((single_news_data: NewsAssetsListDataTypes, index: number) => (
                    <tr key={index}>
                      <td>
                        <div className={Styles.data_content_wrapper}>
                          {single_news_data?.asseetIcon ? (
                            <img src={single_news_data?.asseetIcon} alt="Hub Image" width="26px" height="26px" />
                          ) : (
                            <Image src={TableIcon} alt="User Image" />
                          )}

                          <div className={Styles.table_data_name_url}>
                            <h6>{single_news_data.asseetName}</h6>
                            <p>{single_news_data.assetURL}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        {single_news_data.publish_status === 'APPROVAL_REQUIRED' && (
                          <div className={Styles.approval_required}>承認が必要</div>
                        )}
                        {single_news_data.publish_status === 'EVERYONE' && <div className={Styles.public_asset}>全員に公開</div>}
                      </td>
                      <td>
                        <div className={Styles.get_yuan}>
                          <div className={Styles.yuan_post_outline}>
                            <Image src={post_outline} alt="Post Outline Icon" />
                            <span> {single_news_data.acquiredsourcewebnum} </span>
                          </div>
                          <div className={`${Styles.yuan_discord} disabledData`}>
                            <Image src={discord_icon} alt="Discord Icon" />
                            <span> {single_news_data.acquiredsourcediscordnum} </span>
                          </div>
                          <div className={`${Styles.yuan_telegram}  disabledData`}>
                            <Image src={telegram_icon} alt="Telegram Icon" />
                            <span> {single_news_data.acquiredsourcetelegramnum} </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={Styles.access_point}>
                          <Image src={semantic_web} alt="Semantic Web Icon" />
                          <span>{single_news_data.accesspointnum} ハブ</span>
                        </div>
                      </td>

                      <td>
                        {single_news_data.assetcategory &&
                          single_news_data?.assetcategory?.map((item: any, index: number) => (
                            <span className={Styles.data_category} key={index}>
                              {item.name}
                            </span>
                          ))}
                      </td>
                      <td>
                        {single_news_data?.thirdPartyCategory &&
                          single_news_data?.thirdPartyCategory?.map((item: any, index: number) => (
                            <span className={Styles.data_category} key={index}>
                              {item.name}
                            </span>
                          ))}
                      </td>
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
                              <div
                                className={Styles.drop_list_li}
                                // onClick={handleClose}
                                onClick={() => {
                                  handleDetailsOpen(single_news_data?.newsAssetId);
                                }}
                              >
                                詳細
                              </div>
                              <div
                                className={Styles.drop_list_li}
                                onClick={() => {
                                  handleClose();
                                  handleModalOpen(single_news_data.newsAssetId);
                                }}
                              >
                                削除する
                              </div>
                            </div>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className={Styles.registred_news_assets_pagination}>
              <div className={TableStyle.tablePagination}>
                <div className="pagination_range">
                  <span className={TableStyle.start_range}> {fromData} </span> - <span className={TableStyle.end_range}> {toData} </span> of
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
        </div>
      </CommonLayout>
      {modalPointer == 1 && <CreateNwsAssetModal isOpen={true} updateModalNumber={updateModalPointer} modalHideStatus={pull_data} />}
      {modalPointer == 2 && <CreateNewsAsset2 isOpen={true} updateModalNumber={updateModalPointer} registeredAseetID={registeredAseetID} />}
      {modalPointer == 3 && <NewsAssetCompleteModal isOpen={true} changeStatus={changeStatus} createdNewsID={createdNewsID} />}
      {/* {open && <CreateNwsAssetModal isOpen={true} />} */}
      <DeleteNewsModal
        parentStatus={getStatus}
        isOpen={deleteModalOpen}
        hubId={deleteThisNewsAssetId}
        hubDeleteUpdate={hubDeleteUpdate}
        setHubDeleteUpdate={(val: any) => setHubDeleteUpdate(val)}
      />
      <NewsAssetFirstModal />
    </>
  );
};

export default NewsUI;
