import { useEffect, useRef, useState } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
import unsubscribStyle from './../Modals/UnsubscribeModal.module.css';
import modalStyles from './FirstModal.module.css';
function UnsubscribeModal() {
  const [newsAssetConnectionModal, setNewsAssetConnectionModal] = useState(false);
  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setNewsAssetConnectionModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myDivRef]);
  //hide  modal  ESC key press
  useEffect(() => {
    const close = (e: any) => {
      if (e.keyCode === 27) {
        setNewsAssetConnectionModal(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return (
    <>
      {newsAssetConnectionModal && (
        <>
          <div className={`${commonStyles.modal_body}`}>
            <div className={unsubscribStyle.modal_content} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>ニュースアセットが接続完了しました。</h1>
              <p className={unsubscribStyle.modal_text}>
                作成されたニュースアセットが設定がされました。また、 <br />
                対象のハブにも接続済となっております。
              </p>
              <div className={unsubscribStyle.box}>
                <button className={`close_btn`} onClick={() => setNewsAssetConnectionModal(!newsAssetConnectionModal)}>
                  閉じる
                </button>

                <button className={`common_btn`}>続ける</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UnsubscribeModal;
