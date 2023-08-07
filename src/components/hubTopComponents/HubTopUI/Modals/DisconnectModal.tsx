import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import modalCommonStyles from '../../hubTopModal.module.css';
import modalStyles from './FirstModal.module.css';
import unsubscribStyle from './UnsubscribeModal.module.css';

import useDisconnectHook from '@/hooks/hubHooks/useDisconnectHook';
type disConnectModalTypes = {
  isOpen: boolean;
  parentStatus: (value: boolean) => void;
  deleteModalParentStatus?: (value: boolean) => void;
  newsHubUpdate: 'confirmed' | 'error' | 'notdone';
  setHubDeleteUpdate: (value: string) => void;

  gotNewsAssetId?: string;
  onData: (data: any) => void;
  // onData: (data: any) => void;
};

function DisconnectModal({
  isOpen,
  parentStatus,
  newsHubUpdate,
  setHubDeleteUpdate,
  deleteModalParentStatus,
  onData,
  gotNewsAssetId
}: disConnectModalTypes) {
  const [open, setOpen] = React.useState(isOpen);
  const [enableDeleteConfirm, setEnableDeleteConfirm] = React.useState(false);
  const [userToken, setUserToken] = useState<string | null>('');
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      setOpen(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    parentStatus(false);
    setShowDisconnectConfirm(false);
    onData(true);
  };

  const handleHubDeleteConfirm = () => {
    setEnableDeleteConfirm(false);
  };
  const router = useRouter();
  const gotHubId = router.query.slug;

  const handleDisconnect = () => {
    useDisconnectHook(gotHubId, gotNewsAssetId, setShowDisconnectConfirm, setOpen);
  };

  return (
    <>
      <>
        <Modal
          className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}   ${modalCommonStyles.modal_scroller} `}
          open={open}
          onClose={handleClose}
        >
          <div className={` ${modalCommonStyles.modal_content}  ${modalCommonStyles.no_pd_btoom}`}>
            <div className={modalCommonStyles.modal_content_padding}>
              <h1 className={modalStyles.brand_title}>ニュースアセットの接続を解除しますか？</h1>
              <p className={unsubscribStyle.modal_text}>このニュースアセットからの情報取得が出来なくなりますが、よろしいですか？</p>

              <div className={`${unsubscribStyle.box}`}>
                <button className={`close_btn`} onClick={handleClose}>
                  閉じる
                </button>

                <button type="submit" className={`common_btn`} onClick={handleDisconnect}>
                  解除する
                </button>
              </div>
            </div>
          </div>
        </Modal>

        {showDisconnectConfirm && (
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
                    <button className={`${modalCommonStyles.editConfirmClzBtn}`} onClick={handleClose}>
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

export default DisconnectModal;
