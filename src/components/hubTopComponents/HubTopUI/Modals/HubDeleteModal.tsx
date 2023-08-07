import useHubDeleteHook from '@/hooks/hubList/useHubDeleteHook';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalCommonStyles from '../../hubTopModal.module.css';
import modalStyles from './FirstModal.module.css';
import unsubscribStyle from './UnsubscribeModal.module.css';
type getHubDeleteModal = {
  isOpen?: boolean;
  hubId?: string;
  parentStatus?: any;
  deleteModalParentStatus?: (value: boolean) => void;
  hubDeleteUpdate?: 'confirmed' | 'error' | 'notdone';
  setHubDeleteUpdate?: (value: string) => void;
  handleHubConfirmOpen?: any;
};
function HubDeleteModal({
  handleHubConfirmOpen,
  isOpen,
  hubId,
  parentStatus,
  hubDeleteUpdate,
  setHubDeleteUpdate,
  deleteModalParentStatus
}: getHubDeleteModal) {
  const [open, setOpen] = React.useState<any>(isOpen);
  const [enableDeleteConfirm, setEnableDeleteConfirm] = React.useState(false);
  const router = useRouter();
  const gotHubId = router.query.slug;
  useEffect(() => {
    if (isOpen === true) {
      setOpen(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    parentStatus(false);
  };

  //custom  hook call for delete hub
  const { formik } = useHubDeleteHook(setOpen, parentStatus, setEnableDeleteConfirm, hubId, gotHubId, handleHubConfirmOpen);

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
                  placeholder="Delete this hubと入力してください"
                />
              </div>
              {formik.errors.hub_delete_content && <div className={commonStyles.error}>{formik.errors.hub_delete_content}</div>}

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
      </>
    </>
  );
}

export default HubDeleteModal;
