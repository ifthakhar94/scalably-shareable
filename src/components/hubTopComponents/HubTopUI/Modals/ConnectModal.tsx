import client from '@/GraphqlClient/client';
import { SearchIcon } from '@/custom-icons/CustomIcons';
import { additionalNewsAssetsearchResult } from '@/queries/queries';
import LSHelper from '@/utils/LSHelper';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import modalCommonStyles from '../../hubTopModal.module.css';
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
function ConnectModal({ isOpen, parentStatus, newsHubUpdate, setHubDeleteUpdate, deleteModalParentStatus }: getHubDeleteModal) {
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

  // console.log( isOpen);

  const handleClose = () => {
    setOpen(false);
    parentStatus(false);
  };

  const handleHubDeleteConfirm = () => {
    setEnableDeleteConfirm(false);
    // setHubDeleteUpdate();
    // window.location.reload();
  };
  const router = useRouter();
  const gotHubId = router.query.slug;

  const formik = useFormik({
    initialValues: {
      searchWord: ''
    },
    onSubmit: (values) => {
      setNewsAssetArray([]);
      console.log(values.searchWord);
      setloading(true);
      const UserToken: any = LSHelper.getItem('UserToken');
      setUserToken(UserToken);
      setSearchWord(values.searchWord);
      client
        .query({
          query: additionalNewsAssetsearchResult,
          variables: {
            hubId: gotHubId,
            searchWord: values.searchWord,
            pageNumber: 1,
            perPage: 4
          },
          context: {
            headers: {
              Authorization: `Bearer ${UserToken}`
            }
          }
        })
        .then((result: any) => {
          setloading(false);
          setNewsAssetArray(result.data.searchNewsAsset.newsAssetList);
          setCurrentPage(result.data.searchNewsAsset.pagination.currentPage);
          setTotaltPage(result.data.searchNewsAsset.pagination.totalPages);
        })
        .catch((error: any) => {
          setloading(false);
          console.log(error);
        });
    },

    validationSchema: Yup.object({
      searchWord: Yup.string().required()
    })
  });

  function handleScroll(event: React.UIEvent<HTMLDivElement>): void {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    const scroll = scrollHeight - scrollTop - clientHeight;
    [];

    if (scroll > 0) {
    } else if (scroll == 0) {
      // We are at the bottom
      if (currentPage < totaltPage) {
        setloading(true);
        client
          .query({
            query: additionalNewsAssetsearchResult,
            variables: {
              hubId: gotHubId,
              searchWord: searchWord,
              pageNumber: currentPage + 1,
              perPage: 4
            },
            context: {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            }
          })
          .then((result: any) => {
            setloading(false);
            // let resultArray = result.data.searchNewsAsset.newsAssetList;
            setNewsAssetArray((current) => [...current, ...result.data.searchNewsAsset.newsAssetList]);
            setCurrentPage(result.data.searchNewsAsset.pagination.currentPage);
            setTotaltPage(result.data.searchNewsAsset.pagination.totalPages);
          })
          .catch((error: any) => {
            setloading(false);
            console.log(error);
          });
      }
    }
  }
  // console.log(newsAssetArray.length);
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
              <button className={`common_btn full_width mg_t20`}>新規ニュースアセットを作成</button>
              <div className={`mg_t20 ${modalCommonStyles.line_border}`}></div>
              <p className={`mg_t20 ${modalCommonStyles.asset_title}`}>ニュースアセットを探す</p>
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
          </div>
        </Modal>
      </>
    </>
  );
}

export default ConnectModal;
