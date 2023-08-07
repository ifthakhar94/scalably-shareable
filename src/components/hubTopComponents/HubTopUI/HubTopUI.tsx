import PulsateAnimation from '@/components/loader/PulsateAnimation';
import { NextIcon, PlusIcon, PrevIcon, SearchIcon, ThreeDotsIcon } from '@/custom-icons/CustomIcons';
import useHubLIstsDataHook from '@/hooks/hubList/useHubLIstsDataHook';
import { hubdetails_url } from '@/navCentralization/nav_url';
import LSHelper from '@/utils/LSHelper';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ConditionalCategory from '../ConditionalCategory/ConditionalCategory';
import CustomTablePagination from '../TablePagination/TablePagination';
import CommonLayout from '../commonLayout/CommonLayout';
import table_user from './../../../assets/images/table_user.png';
import User from './../../../assets/images/user.png';
import Pagination from './../TablePagination/TablePagination.module.css';
import modalCommonStyles from './../hubTopModal.module.css';
import Styles from './HubTopUI.module.css';
import CreateHubModal from './Modals/CreateHubModal';
import FirstModal from './Modals/FirstModal';
import modalStyles from './Modals/FirstModal.module.css';
import HubDeleteModal from './Modals/HubDeleteModal';
import NewsAssetCategorySetupCompleteModal from './Modals/NewsAssetCategorySetupComplete';
import NewsAssetConnectionCompleteModal from './Modals/NewsAssetConnectionComplete';
import RssModal from './Modals/RssModal';
import UnsubscribeModal from './Modals/UnsubscribeModal';
import unsubscribStyle from './Modals/UnsubscribeModal.module.css';

const HubTopUI = () => {
  const [open, setOpen] = useState(false);
  const [deleteModalopen, setDeleteModalopen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [enableDeleteConfirm, setEnableDeleteConfirm] = useState(false);
  const [hubDeleteUpdate, setHubDeleteUpdate] = useState<'confirmed' | 'error' | 'notdone'>('notdone');
  const [hubConfirm, setHubConfirm] = useState(false);
  type SingleHubTypes = {
    hubicon: any;
    hubname: string;
    connectassetnum: number;
    hubId: string;
    hubmembernum: number;
    huburl: string;
    publish_status: string;
    categories: string[];
  };
  const [hubId, setHubId] = React.useState('');
  const handleOpen = () => setOpen(true);
  const router = useRouter();
  const gotHubId = router.query.id;
  //implement custom hook
  const { refetch, loading, error, fetchMore, hubList, totalItems, totalPages, fromData, toData } = useHubLIstsDataHook(
    setHubDeleteUpdate,
    hubDeleteUpdate,
    setCurrentPage,
    currentPage
  );
  //Handle delete  modal show  hide  operation
  const handleDeleteModalOpen = (hubId: string) => {
    setHubId(hubId);
    setDeleteModalopen(true);
  };

  //modal hide using  ref
  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    let defaultModal = LSHelper.getItem('defaultModal');
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myDivRef]);

  //hide  modal  ESC key press
  useEffect(() => {
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const [newsAssetConnectionModal, setNewsAssetConnectionModal] = useState(false);

  const getStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalopen(data);
  };

  const getParentStatus = (data: boolean | ((prevState: boolean) => boolean)) => {};

  // prev paginate hub list
  const prevPaginate = () => {
    setCurrentPage(currentPage - 1);
  };
  // nextPaginate  hub list
  const nextPaginate = () => {
    setCurrentPage(currentPage + 1);
  };

  // After creating hub push to created hub details from confirmation modal
  const handleSpecificHubDetais = () => {
    refetch().then((response) => {
      router.push(`${hubdetails_url}/${response.data.hubLists.hublist[0].hubId}`);
    });
  };
  const handleHubConfirmOpen = (data: any) => {
    setEnableDeleteConfirm(data);
  };
  const handleHubCreateConfirmOpen = (data: any) => {
    setHubConfirm(data);
  };
  const closeDeleteConfirmModal = () => {
    setEnableDeleteConfirm(false);
    refetch();
  };
  const handleCreateConfirmCloseRefetch = () => {
    setHubConfirm(false);
    refetch();
  };
  //for dropdown toogle
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
  // Opening create hub modal from Additional News Assets
  // const gotHubData: string | string[] | undefined = router.query.data;

  // useEffect(() => {
  //   if (gotHubData != undefined) {
  //     setOpen(true);
  //   }
  // }, [gotHubData]);
  // Opening create hub modal from  First Modal 2
  const handleDataFromChild = (data: any) => {
    // Set State with the data received from the child component
    setOpen(data);
  };
  return (
    <>
      <CommonLayout header_value="Hub Top UI">
        {/* BreadCrumb   */}
        <div className={Styles.section_breadcrumb}>
          <ul>
            <li>
              <Link href="#">ハブ管理ページ</Link>
            </li>
          </ul>
        </div>

        {/* Hub List  */}
        <section className={Styles.hub_list}>
          <div className={Styles.hub_list_title}>
            <h2>ハブ一覧</h2>
            <p>あなたが管理中、管理チームメンバーとなっているハブ一覧です。</p>
          </div>

          {loading == true && <PulsateAnimation />}
          {loading == false && (
            <div className={Styles.hub_list_inner}>
              {/* Create Hub  */}
              <div className={`${Styles.hub_list_item} ${Styles.hub_list_create}`}>
                <Link href="#" onClick={handleOpen}>
                  <div className={Styles.hub_list_create_btn}>
                    <PlusIcon />
                    <p>新規作成</p>
                  </div>
                </Link>
              </div>

              {/* Hub List Single Item  */}
              {hubList &&
                hubList.map((single_hub: SingleHubTypes, index) => {
                  return (
                    <div className={Styles.hub_list_item} key={index}>
                      <div className={Styles.list_card_title}>
                        {single_hub.hubicon ? (
                          <img src={single_hub.hubicon} alt="Hub Image" width="26px" height="26px" />
                        ) : (
                          <Image src={User} alt="User Image" />
                        )}
                        <h2>
                          <Link href={`${hubdetails_url}/${single_hub.hubId}`}>{single_hub.hubname} </Link>
                        </h2>
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
                                  onClick={() => {
                                    handleDeleteModalOpen(single_hub.hubId);
                                  }}
                                >
                                  解除する
                                </div>
                              </div>
                            )}
                          </button>
                        </td>
                      </div>
                      <Link href={`${hubdetails_url}/${single_hub.hubId}`}>
                        <div className={Styles.hub_list_member_count}>
                          <p>メンバー</p>
                          <h6>{single_hub.hubmembernum}人</h6>
                        </div>
                        <div className={Styles.range_and_assets}>
                          <p>公開範囲</p>
                          <p>接続アセット数</p>
                        </div>
                        <div className={Styles.public_and_assets_value}>
                          <p>{single_hub.publish_status}</p>
                          <p>{single_hub.connectassetnum}</p>
                        </div>
                        <div className={Styles.card_category}>
                          <div className={Styles.card_category_title}>
                            <h4>カテゴリー</h4>
                          </div>
                          <div className={Styles.card_category_items}>
                            <ConditionalCategory categories={single_hub.categories} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          )}

          <div className={Styles.list_pagination}>
            <div className={Pagination.tablePagination}>
              <div className="pagination_range">
                <span className={Pagination.start_range}> {fromData}</span> - <span className={Pagination.end_range}> {toData} </span> of
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
        </section>

        {/* Subscribed Hub List and Search  */}
        <section className={Styles.sub_hub_list}>
          <div className={Styles.sub_hub_list_title}>
            <h2>購読しているハブ一覧</h2>

            <p>あなたが購読しているハブの一覧です。</p>
          </div>
          <div className={Styles.sub_hub_list_search}>
            <SearchIcon />
            <input type="text" placeholder="検索する" />
          </div>
          <div className={Styles.sub_hub_list_table}>
            <table>
              <thead>
                <tr>
                  <th>ハブ名称</th>
                  <th>オーナー</th>
                  <th>カテゴリ</th>
                  <th>ステータス</th>
                  <th>メンバー</th>
                  <th>接続アセット数</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={Styles.logo_name}>
                      <Image src={table_user} alt="Table User Image" />
                      <h6>Cardano</h6>
                    </div>
                  </td>

                  <td>
                    <span className={Styles.table_eco_id}> @ecomedia_id </span>
                  </td>

                  <td>
                    <span className={Styles.table_cat}>カテゴリ1</span>
                    <span className={Styles.table_cat}>カテゴリゴリゴリゴリ2</span>
                    <span className={Styles.table_cat}>カテゴリ3</span>
                    <span className={Styles.table_cat}>カテゴリ4</span>
                    <span className={Styles.table_cat_dots}>...</span>
                  </td>

                  <td>公開中</td>

                  <td>102人</td>
                  <td>82アセット</td>
                  <td className={Styles.TableThreeDots}>
                    <button
                      id={`basic-button`}
                      className={Styles.btnbtn}
                      onClick={handleClick}
                      onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
                    >
                      <div>
                        <ThreeDotsIcon />{' '}
                      </div>
                      {toggle && anchorEl && anchorEl.id === `basic-button` && (
                        <div className={Styles.dropdown}>
                          <div className={Styles.drop_list_li} onClick={() => {}}>
                            解除する
                          </div>
                        </div>
                      )}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={Styles.table_pagination}>
              <CustomTablePagination />
            </div>
          </div>
          {/* First Modal */}
          <FirstModal sendDataToParent={handleDataFromChild} />

          <RssModal />
          {/* Create Hub Modal */}
          <CreateHubModal
            parentStatus={getStatus}
            parentCreateStatus={getParentStatus}
            handleHubCreateConfirmOpen={handleHubCreateConfirmOpen}
            // parentDataStoreStatus={getStoreStatus}
            isOpen={open}
          />
          <HubDeleteModal
            parentStatus={getStatus}
            isOpen={deleteModalopen}
            hubId={hubId}
            handleHubConfirmOpen={handleHubConfirmOpen}
            hubDeleteUpdate={hubDeleteUpdate}
            setHubDeleteUpdate={(val: any) => setHubDeleteUpdate(val)}
          />

          <UnsubscribeModal />
        </section>
      </CommonLayout>
      {/* Hub  delete confirm  modal */}
      {enableDeleteConfirm && (
        <>
          <div className={modalCommonStyles.deleteHubConfirmation}>
            <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
              <div className={modalCommonStyles.modal_content}>
                <h1 className={modalStyles.brand_title}>ハブが削除されました。 </h1>
                <p className={unsubscribStyle.modal_text}>一覧画面より、対象のハブが削除されているのをご確認ください。</p>

                <div>
                  <button className={`${modalCommonStyles.delete_confirm_close_btn}`} onClick={() => closeDeleteConfirmModal()}>
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Create Hub confirm modal */}
      {hubConfirm && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
            <div className={modalCommonStyles.modal_content} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>ハブが作成されました。 </h1>
              <p className={unsubscribStyle.modal_text}>
                早速、ハブ詳細ページにてニュースアセットの設定などを <br /> 進めましょう。
              </p>

              <div className={unsubscribStyle.box}>
                <button className={`close_btn`} onClick={() => handleCreateConfirmCloseRefetch()}>
                  閉じる
                </button>

                <button className={`common_btn`} onClick={handleSpecificHubDetais}>
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <NewsAssetCategorySetupCompleteModal isOpen={false} />

      <NewsAssetConnectionCompleteModal isOpen={false} />
    </>
  );
};

export default HubTopUI;
