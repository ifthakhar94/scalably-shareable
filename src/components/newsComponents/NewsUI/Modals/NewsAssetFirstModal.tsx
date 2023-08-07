import LSHelper from '@/utils/LSHelper';
import { useEffect, useRef, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalStyles from './NewsAssetFirstModal.module.css';
function NewsAssetFirstModal() {
  const [newsAssetFirstModal, setNewsAssetFirstModal] = useState(false);
  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    let defaultModal = LSHelper.getItem('newsAssetDefaultModal');
    if (defaultModal == 'false') {
      setNewsAssetFirstModal(false);
      false;
    } else {
      setNewsAssetFirstModal(true);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div

        secureLocalStorage.setItem('newsAssetDefaultModal', 'false');
        setNewsAssetFirstModal(false);
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
        setNewsAssetFirstModal(false);
        secureLocalStorage.setItem('newsAssetDefaultModal', 'false');
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const defaultMOdalHide = () => {
    secureLocalStorage.setItem('newsAssetDefaultModal', 'false');
    setNewsAssetFirstModal(false);
  };
  return (
    <>
      {newsAssetFirstModal && (
        <>
          <div className={`${commonStyles.modal_body} ${modalStyles.modal_body_custom}`}>
            <div className={`${modalStyles.modal_content} ${modalStyles.fixheight}`} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>あなたのニュースを世界に届けよう！</h1>
              <p className={modalStyles.modal_text}>
                EcoMediaにニュースアセットを登録して、世界中のコミュニティにあなたのニュースを発信しましょう。
              </p>
              <div className={modalStyles.modal_text_pink_box}>
                <div>
                  <p>
                    EcoMediaにニュースアセットを登録することで、世界中のユーザーがあなたの情報を、自分の言語で取得できるようになります。
                  </p>
                </div>
              </div>
              <div className={modalStyles.modal_text_pink_box}>
                <div>
                  <p>
                    その情報はEcoMediaを通して、受け取る人に合わせた言語に翻訳され、EcoMedia上のウェブサイト、各コミュニティのタイムラインへと流れるようになります。
                  </p>
                </div>
              </div>

              <button className={`common_btn full_width`} onClick={() => defaultMOdalHide()}>
                ニュースをEcoMediaに登録する
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NewsAssetFirstModal;
