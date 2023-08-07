import useDeleteNewsAssetsHook from '@/hooks/newsAssets/useDeleteNewsAssetsHook';
import { news_asset } from '@/navCentralization/nav_url';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
import unsubscribStyle from '../../../hubTopComponents/HubTopUI/Modals/UnsubscribeModal.module.css';
import modalCommonStyles from '../../../hubTopComponents/hubTopModal.module.css';
import modalStyles from './../../../hubTopComponents/HubTopUI/Modals/FirstModal.module.css';
type getHubDeleteModal = {
  isOpen: boolean;
  hubId: string;
  parentStatus: (value: boolean) => void;
  deleteModalParentStatus?: (value: boolean) => void;
  hubDeleteUpdate: 'confirmed' | 'error' | 'notdone';
  setHubDeleteUpdate: (value: string) => void;
};
function DeleteNewsModal({ isOpen, hubId, parentStatus, hubDeleteUpdate, setHubDeleteUpdate, deleteModalParentStatus }: getHubDeleteModal) {
  const [open, setOpen] = React.useState(isOpen);
  const [enableDeleteConfirm, setEnableDeleteConfirm] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  const gotHubId = hubId;
  useEffect(() => {
    if (isOpen === true) {
      setOpen(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    parentStatus(false);
  };
  const { formik } = useDeleteNewsAssetsHook(
    setShowDeleteConfirm,
    setOpen,
    parentStatus,
    setEnableDeleteConfirm,
    gotHubId,
    setHubDeleteUpdate
  );

  const { push } = useRouter();
  const handleConfirmModalClose = () => {
    push(news_asset);
    setShowDeleteConfirm(false);
  };
  const handleHubDeleteConfirm = () => {
    setEnableDeleteConfirm(false);
  };
  return (
    <>
      <>
        <Modal
          className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}
          open={open}
          onClose={handleClose}
        >
          <Box className={modalCommonStyles.modal_content}>
            <h1 className={modalStyles.brand_title}>ニュースアセットを削除します。 </h1>

            <p className={unsubscribStyle.modal_text}>
              指定のニュースアセットを削除します。 <br /> この処理は、元には戻せませんのでご注意ください。 <br /> 下記のフォームに「Delete
              this news asset」と入力ください。
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className={modalCommonStyles.hub_delete_name}>
                <p>テキストを入力してください。</p>
                <input
                  type="text"
                  name="news_delete_content"
                  value={formik.values.news_delete_content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Delete this news assetと入力してください"
                />
              </div>
              {formik.errors.news_delete_content && <div className={commonStyles.error}>{formik.errors.news_delete_content}</div>}

              <div className={`${unsubscribStyle.box}`}>
                <button className={`close_btn`} onClick={handleClose}>
                  閉じる
                </button>

                <button type="submit" className={`common_btn`}>
                  削除する
                </button>
              </div>
            </form>
          </Box>
        </Modal>
        {showDeleteConfirm && (
          <>
            <Modal
              className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}   ${modalCommonStyles.modal_scroller} `}
              open={true}
              onClose={handleClose}
            >
              <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
                <div className={modalCommonStyles.editConfirmationModal}>
                  <h1 className={modalStyles.brand_title}>ニュースアセットが解除されました。</h1>
                  <p className={unsubscribStyle.modal_text}>
                    一覧画面より、対象のニュースアセットが解除されている <br /> のをご確認ください。
                  </p>

                  <div className={modalCommonStyles.news_assets_disconnect_btn}>
                    <button className={`${modalCommonStyles.editConfirmClzBtn}`} onClick={handleConfirmModalClose}>
                      閉じる
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </>
        )}
      </>
    </>
  );
}

export default DeleteNewsModal;
