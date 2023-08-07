import CommonLayout from '@/components/hubTopComponents/commonLayout/CommonLayout';
import { ChevronRight, NextIcon, PrevIcon, ThreeDotsIcon } from '@/custom-icons/CustomIcons';
import { hubdetails_url, hubtop_url } from '@/navCentralization/nav_url';
import { RootState } from '@/redux/app/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import modalStyles from '../../hubTopComponents/HubTopUI/Modals/FirstModal.module.css';
import unsubscribStyle from '../../hubTopComponents/HubTopUI/Modals/UnsubscribeModal.module.css';
import RssCreateModal from '../Modals/RssCreateModal';
// Common CSS with NEWS UI
import Animations from '@/components/loader/Animations';
import useFetchRssCategories from '@/hooks/RSS/UseFetchRssCategories';
import useOutputRssList from '@/hooks/RSS/useOutputRssList';
import { DeletOutputRssListQuery } from '@/queries/queries';
import { useMutation } from '@apollo/client';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { Modal, Snackbar } from '@mui/material';
import toast from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage';
import TableStyle from '../../../components/hubTopComponents/TablePagination/TablePagination.module.css';
import commonStyles from '../../authComponents/authCommon.module.css';
import UpdateOutputRssModal from '../Modals/UpdateOutputRssModal';
import CommonStylesWithHubTop from './../../hubTopComponents/HubTopUI/HubTopUI.module.css';
import modalCommonStyles from './../../hubTopComponents/hubTopModal.module.css';
import Styles from './../../newsComponents/NewsUI/NewsUI.module.css';
import OutputRSSStyles from './../OutputRSS.module.css';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const OutputRssUI = () => {
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [totalItems, setTotalItems] = useState();
  const [rssList, setRssList] = useState<any>();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [outputRssIdForEdit, setOutputRssIdForEdit] = useState();
  const [rssHubName, setRssHubName] = useState();
  const [rssHubid, setRssHubid] = useState();
  const [open, setOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [rssDefaultModal, setRssDefaultModal] = useState(false);
  const [outputRssId, setOutputRssId] = useState('');
  const [rssDeleteModal, setRssDeleteModal] = useState(false);
  const [openConfirmModal, setopenConfirmModal] = useState(false);
  const [refetchRssList, setRefetchRssList] = useState(false);
  //  Pulling data from Redux Store
  const outputRssHubData: any = useAppSelector((state) => state?.getOutputRssHubData?.OutputRssData);
  useEffect(() => {
    setRssHubName(outputRssHubData?.hubName);
    setRssHubid(outputRssHubData?.hubId);
  }, [outputRssHubData]);

  // Hub Output Rss List API Implementation
  interface outputRssListTypes {
    description: string;
    export_type: string;
    language_code: string;
    output_rss_id: string;
    platform: string;
    platform_icon: string;
    rss_url: string;
  }
  const { outputRssList, outputRssRefetch, outputRssListLoading } = useOutputRssList(currentPage);
  // console.log(outputRssList?.getOutputRssList);

  // Refetching Hub Output Rss List API

  useEffect(() => {
    if (outputRssList?.getOutputRssList) {
      setRssList(outputRssList?.getOutputRssList?.outputRss);
      setTotalItems(outputRssList?.getOutputRssList.pagination.totalItems);
      setTotalPages(outputRssList?.getOutputRssList.pagination.totalPages);
      setCurrentPage(outputRssList?.getOutputRssList.pagination.currentPage);
      setFromData(outputRssList?.getOutputRssList.pagination.fromData);
      setToData(outputRssList?.getOutputRssList.pagination.toData);
    }
  }, [outputRssList?.getOutputRssList]);

  const handleRefetchRssList = (data: any) => {
    setRefetchRssList(data);
  };

  useEffect(() => {
    outputRssRefetch();
  }, [refetchRssList]);

  // MUI Dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // MUI Three Dots Click
  const handleThreeDotsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setToggle(!toggle);
  };

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setToggle(false);
    }
  };

  // Handle Copy  RSS URL
  const handleCopy = (data: any) => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        setOpen(true);
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  };
  // Handle RSS Modal Open
  const handleRssCreateModalOpen = (data: any) => {
    setCreateModalOpen(data);
    setRefetchRssList(false);
  };
  // Handle Update RSS Modal Open
  const handleRssUpdateModalOpen = (data: any) => {
    setEditModalOpen(data);
    setRefetchRssList(false);
  };

  // Handling First Popup
  const hideDefaultModal = () => {
    secureLocalStorage.setItem('rssDefaultModal', 'false');
    setCreateModalOpen(true);
  };
  let defaultModal = secureLocalStorage.getItem('rssDefaultModal');

  useEffect(() => {
    if (defaultModal == 'false') {
      setRssDefaultModal(false);
      false;
    } else {
      setRssDefaultModal(true);
    }
  }, [defaultModal]);

  // Fetching Category List
  const { rssCategories } = useFetchRssCategories();

  // Handle Output RSS Delete
  const handleDeleteOutputRss = (outputRssId: string) => {
    console.log(outputRssId);
  };
  // Handle Edit Output RSS
  const handleEditOutputRss = (outputRssId: any) => {
    setEditModalOpen(true);
    setOutputRssIdForEdit(outputRssId);
    setRefetchRssList(false);
  };
  //Next paginate hub list
  const nextPaginate = () => {
    let newPageNumber = currentPage + 1;
    setCurrentPage(newPageNumber);
    outputRssRefetch();
  };
  // prev paginate hub list
  const prevPaginate = () => {
    let newPageNumber = currentPage - 1;
    setCurrentPage(newPageNumber);
    outputRssRefetch();
  };
  const handleClose = () => {
    setOpen(false);
    setRssDeleteModal(false);
    setopenConfirmModal(false);
    outputRssRefetch();
    // parentStatus(false);
    // setShowDisconnectConfirm(false);
    // onData(true);
  };

  // Handle Delete Output RSS
  const handleDeleteRss = (outputRssId: any) => {
    setOutputRssId(outputRssId);
    setRssDeleteModal(true);
  };
  // Handle Deleting
  const [dataDeleted, { loading: deletedLoading, error }] = useMutation(DeletOutputRssListQuery);

  const outputRssDeleteBtn = () => {
    dataDeleted({
      variables: { outputRssId: outputRssId },
      fetchPolicy: 'no-cache'
    }).then((results) => {
      toast.success(results?.data?.deleteOutputRss?.message);
      // console.log('results', results?.data?.deleteOutputRss?.message);
      setRssDeleteModal(false);
      setopenConfirmModal(true);
    });
  };
  return (
    <>
      {/* This page share common CSS with news ui  */}
      <CommonLayout header_value="General Output RSS">
        {outputRssListLoading && <Animations />}
        {!outputRssListLoading && (
          <>
            {/* General Output RSS Breadcrumb  */}
            <div className={OutputRSSStyles.top_bar}>
              <div>
                <Link href={hubtop_url}>ハブ管理ページ</Link>
              </div>
              <div className={OutputRSSStyles.chev_icon}>
                <ChevronRight></ChevronRight>
              </div>
              <div>
                <Link href={`${hubdetails_url}/${rssHubid}`}>{rssHubName}</Link>
              </div>
              <div className={OutputRSSStyles.chev_icon}>
                <ChevronRight></ChevronRight>
              </div>
              <div>ハブを外部に出力する</div>
            </div>

            {/* Output RSS Table  */}
            {/* This page share common CSS with news ui  */}
            <div className={Styles.news_assets_list_search}>
              <div className={Styles.news_assets_section_title_search}>
                <div className={`${Styles.title_add_btn} ${OutputRSSStyles.output_rss_title_add_btn}`}>
                  <div>
                    <h1>ハブを外部に出力する</h1>
                    <h6 className={OutputRSSStyles.output_rss_subtitle}>
                      ハブで収集しているニュースを、参加しているコミュニティに流すためのRSSを作成できます
                    </h6>
                  </div>
                  <Link href={''} onClick={() => handleRssCreateModalOpen(true)}>
                    <p>外部へ書き出す</p>
                  </Link>
                </div>
              </div>
              {/* news assets list table */}
              <div className={OutputRSSStyles.output_rss_table}>
                <table width="100%">
                  <thead>
                    <tr>
                      <th>プラットフォーム</th>

                      <th>RSS URL</th>
                      <th>説明文</th>
                      <th>言語</th>
                      <th>出力フォーマット</th>
                      <th>操作</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rssList?.map((single_list_item: outputRssListTypes, index: number) => (
                      <tr>
                        <td>
                          <div className={`${Styles.data_content_wrapper} ${OutputRSSStyles.output_rss_platform}`}>
                            <img src={single_list_item?.platform_icon} alt="discord_icon" />

                            <div className={Styles.table_data_name_url}>
                              <h6>{single_list_item?.platform}</h6>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className={OutputRSSStyles.output_rss_url_content}>
                            <div className={OutputRSSStyles.output_rss_url}>
                              <p>{`${process.env.NEXT_PUBLIC_RSS_URL_WITH_SUBDOMAIN}/${single_list_item?.rss_url}`}</p>
                            </div>
                            <div className={OutputRSSStyles.output_rss_url_copy_icon}>
                              <FileCopyOutlinedIcon
                                onClick={() => handleCopy(`${process.env.NEXT_PUBLIC_RSS_URL_WITH_SUBDOMAIN}/${single_list_item?.rss_url}`)}
                                className={OutputRSSStyles.copy_link}
                              />

                              <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={1000} message="Copied to clipboard" />
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className={OutputRSSStyles.explanatory_text}>
                            <p>{single_list_item?.description}</p>
                          </div>
                        </td>

                        <td>
                          <div className={OutputRSSStyles.rss_language}>{single_list_item?.language_code}</div>
                        </td>
                        <td>
                          <div className={OutputRSSStyles.output_format}>{single_list_item?.export_type}</div>
                        </td>
                        <td className={OutputRSSStyles.rss_three_dost}>
                          <button
                            id={`basic-button-${index}`}
                            className={Styles.btnbtn}
                            onClick={handleThreeDotsClick}
                            onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
                          >
                            <div>
                              <ThreeDotsIcon />{' '}
                            </div>
                            {toggle && anchorEl && anchorEl.id === `basic-button-${index}` && (
                              <div className={Styles.dropdown}>
                                <div
                                  className={Styles.drop_list_li}
                                  onClick={() => {
                                    handleEditOutputRss(single_list_item?.output_rss_id);
                                  }}
                                >
                                  編集する
                                </div>
                                <div
                                  className={Styles.drop_list_li}
                                  onClick={() => {
                                    handleDeleteRss(single_list_item?.output_rss_id);
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
              </div>

              {/* Pagination  */}
              <div className={CommonStylesWithHubTop.table_pagination}>
                <div className={TableStyle.tablePagination}>
                  <div className="pagination_range">
                    <span className={TableStyle.start_range}> {fromData} </span> - <span className={TableStyle.end_range}> {toData} </span>{' '}
                    of
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
              {/* RSS Create Modals  */}
              {createModalOpen && (
                <RssCreateModal
                  handleRefetchRssList={handleRefetchRssList}
                  handleRssCreateModalOpen={handleRssCreateModalOpen}
                  rssCategories={rssCategories}
                />
              )}
              {/* RSS Edit Modals  */}
              {editModalOpen && (
                <UpdateOutputRssModal
                  handleRefetchRssList={handleRefetchRssList}
                  handleRssUpdateModalOpen={handleRssUpdateModalOpen}
                  // rssCategories={rssCategories}
                  outputRssIdForEdit={outputRssIdForEdit}
                />
              )}

              {/* Rss First Popup  */}
              {rssDefaultModal && (
                <div className={`${commonStyles.modal_body}`}>
                  <div className={unsubscribStyle.modal_content}>
                    <h1 className={modalStyles.brand_title}>ニュースをメンバーに届けよう！</h1>
                    <p className={modalStyles.modal_text}>
                      ハブで整理したニュースを、あなたのコミュニティのプ <br />
                      ラットフォームに届けよう！
                    </p>
                    <div className={modalStyles.modal_text_pink_box}>
                      <div>
                        <p>Discordなどのコミュニティ活動に使うプラットフォームに、あなたの言語でニュースをお届けします。</p>
                      </div>
                    </div>
                    <div className={modalStyles.modal_text_pink_box}>
                      <div>
                        <p> 全文表示や一部表示など、出力するフォーマットを選べます。</p>
                      </div>
                    </div>

                    <button className={`common_btn common_btn_width`} onClick={(e: any) => hideDefaultModal()}>
                      早速RSSを発行する
                    </button>
                  </div>
                </div>
              )}

              {rssDeleteModal && (
                <Modal
                  className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}   ${modalCommonStyles.modal_scroller} `}
                  open={true}
                  onClose={handleClose}
                >
                  <div className={` ${modalCommonStyles.modal_content}  ${modalCommonStyles.no_pd_btoom}`}>
                    <div className={modalCommonStyles.modal_content_padding}>
                      <h1 className={modalStyles.brand_title}>外部出力用RSSを削除しますか？</h1>
                      <p className={unsubscribStyle.modal_text}>
                        すでに接続されている場合は、情報取得が出来なくなりますが、よろしいですか？
                      </p>

                      <div className={`${unsubscribStyle.box}`}>
                        <button className={`close_btn`} onClick={handleClose}>
                          閉じる
                        </button>

                        <button type="submit" className={`common_btn`} onClick={outputRssDeleteBtn}>
                          削除する
                        </button>
                      </div>
                    </div>
                  </div>
                </Modal>
              )}
              {openConfirmModal && (
                <Modal
                  className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}   ${modalCommonStyles.modal_scroller} `}
                  open={true}
                  onClose={handleClose}
                >
                  <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
                    <div className={modalCommonStyles.editConfirmationModal}>
                      <h1 className={modalStyles.brand_title}>外部出力用RSSが削除されました。</h1>
                      <p className={unsubscribStyle.modal_text}>詳細ページにてRSSが削除されているのをご確認ください。</p>

                      <div className={modalCommonStyles.news_assets_disconnect_btn}>
                        <button className={`${modalCommonStyles.editConfirmClzBtn}`} onClick={handleClose}>
                          閉じる
                        </button>
                      </div>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </>
        )}
      </CommonLayout>
    </>
  );
};

export default OutputRssUI;
