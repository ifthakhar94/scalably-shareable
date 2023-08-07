import LSHelper from '@/utils/LSHelper';
// import { nextTick } from '@next/react-refresh-utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useEffect, useRef, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import commonStyles from '../../../authComponents/authCommon.module.css';
import diagram from './../../../../assets/images/diagram.png';

import modalStyles from './FirstModal.module.css';
function FirstModal({ sendDataToParent }: any) {
  const [firstModal, setFirstModal] = useState(false);
  const [firstModal2, setFirstModal2] = useState(false);
  const myDivRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //Hide  modal if  press outside  modal
  useEffect(() => {
    let defaultModal = LSHelper.getItem('defaultModal');
    if (defaultModal == 'false') {
      setFirstModal(false);
    } else {
      setFirstModal(true);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setFirstModal(false);
        secureLocalStorage.setItem('defaultModal', 'false');
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
        setFirstModal(false);
        secureLocalStorage.setItem('defaultModal', 'false');
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const defaultMOdalHide = () => {
    secureLocalStorage.setItem('defaultModal', 'false');
    setFirstModal(false);
    setFirstModal2(true);
  };

  //Open Create Hub Modal
  const handleOpenHubModal = () => {
    setFirstModal2(false);
    sendDataToParent(true);
  };

  return (
    <>
      {firstModal && (
        <>
          <div className={`${commonStyles.modal_body} ${modalStyles.modal_body_custom}`}>
            <div className={modalStyles.modal_content} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>ハブの管理ページへようこそ！</h1>
              <p className={modalStyles.modal_text}>EcoMediaがあなたの活動をお手伝いします！</p>
              <div className={modalStyles.modal_text_pink_box}>
                <div>
                  <p>
                    あなた自身はもちろん、あなたの所属する会社、コミュニティに、世界中の情報を、メンバーの言語に翻訳して共有することができます。
                  </p>
                </div>
              </div>
              <div className={modalStyles.modal_image}>
                <Image src={diagram} alt="Diagram" width={531} height={186} />
              </div>
              <button className={`common_btn ${modalStyles.btn_custom_width}`} onClick={() => defaultMOdalHide()}>
                次へ
              </button>
            </div>
          </div>
        </>
      )}
      {firstModal2 && (
        <>
          <div className={`${commonStyles.modal_body} ${modalStyles.modal_body_custom}`}>
            <div className={`${modalStyles.fix_height_modal2} ${modalStyles.modal_content}`} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>まずはハブを作成しよう！ </h1>
              <p className={modalStyles.modal_text}>情報を受け渡すハブを作成しましょう。</p>
              <div className={modalStyles.modal_text_pink_box}>
                <div>
                  <p>
                    ハブは、世界中のニュースをあなたが活動するコミュニティのプラットフォームにニュースを届けま
                    <br />
                    す。 <br /> 早速、ハブを作成してみましょう。
                  </p>
                </div>
              </div>

              <div className={modalStyles.box}>
                <button className={`close_btn`} onClick={() => setFirstModal2(!firstModal2)}>
                  戻る
                </button>

                <button className={`common_btn`} onClick={handleOpenHubModal}>
                  <Link href="#">ハブを作成する</Link>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FirstModal;
