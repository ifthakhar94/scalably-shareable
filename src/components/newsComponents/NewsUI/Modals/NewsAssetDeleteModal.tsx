import client from '@/GraphqlClient/client';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { gql } from 'apollo-boost';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalCommonStyles from '../../../hubTopComponents/HubTopUI/HubTopUI.module.css';
import modalStyles from '../../../hubTopComponents/HubTopUI/Modals/FirstModal.module.css';
import unsubscribStyle from '../../../hubTopComponents/HubTopUI/Modals/UnsubscribeModal.module.css';

import { hubtop_url } from '@/navCentralization/nav_url';
import LSHelper from '@/utils/LSHelper';
import { useRouter } from 'next/router';
type getHubDeleteModal = {
  isOpen: boolean;
  hubId: string;
  parentStatus: (value: boolean) => void;
  deleteModalParentStatus?: (value: boolean) => void;
  hubDeleteUpdate: 'confirmed' | 'error' | 'notdone';
  setHubDeleteUpdate: (value: string) => void;
};
function NewsAssetDeleteModal({
  isOpen,
  hubId,
  parentStatus,
  hubDeleteUpdate,
  setHubDeleteUpdate,
  deleteModalParentStatus
}: getHubDeleteModal) {
  const [open, setOpen] = React.useState(isOpen);
  const [enableDeleteConfirm, setEnableDeleteConfirm] = React.useState(false);
  const router = useRouter();
  const gotHubId = router.query.slug;
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
  const formik = useFormik({
    initialValues: {
      hub_delete_content: ''
    },
    onSubmit: (values) => {
      setOpen(false);
      parentStatus(false);
      setEnableDeleteConfirm(true);
      const UserToken = LSHelper.getItem('UserToken');
      client
        .mutate({
          mutation: gql`
          mutation {
            deleteHub(hubId: "${hubId}", confirmText: "${values.hub_delete_content}",) {
              message
            }
          }
        `,

          context: {
            headers: {
              Authorization: `Bearer ${UserToken}`
            }
          }
        })
        .then((result: any) => {
          values.hub_delete_content = '';
          toast.success(result.data.deleteHub.message);
          setHubDeleteUpdate('confirmed');
          gotHubId && router.push(`${hubtop_url}?id=${hubId}`);
        })
        .catch((error: any) => {
          // toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      hub_delete_content: Yup.string()
        .required('Please type Delete this hub')
        .matches(/Delete this hub/, 'Please type Delete this hub')
    })
  });

  const handleHubDeleteConfirm = () => {
    setEnableDeleteConfirm(false);
    // setHubDeleteUpdate();
    // window.location.reload();
  };
  return (
    <>
      <Modal
        className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}
        open={open}
        onClose={handleClose}
      >
        <Box className={modalCommonStyles.modal_content}>
          <h1 className={modalStyles.brand_title}>ハブを削除します。 </h1>

          <p className={unsubscribStyle.modal_text}>
            指定のハブを削除します。
            <br /> この処理は、元には戻せませんのでご注意ください。 下記のフォームに「Delete this hub」と入力ください。
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className={modalCommonStyles.hub_delete_name}>
              <p>テキストを入力してください。</p>
              <input
                type="text"
                name="hub_delete_content"
                value={formik.values.hub_delete_content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Delete this hub"
              />
            </div>
            {formik.errors.hub_delete_content && <div className={commonStyles.error}>{formik.errors.hub_delete_content}</div>}

            <div className={`${unsubscribStyle.box}`}>
              <button className={`close_btn`} onClick={handleClose}>
                閉じる
              </button>

              {/* <button className={`common_btn`} onClick={() => setOpen(!hubConfirm)}>
                  削除する
                </button> */}
              <button type="submit" className={`common_btn`}>
                削除する
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default NewsAssetDeleteModal;
