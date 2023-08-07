import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalStyles from './FirstModal.module.css';
function FirstModalPopup2() {
  const [firstModal2, setFirstModal2] = useState(false);
  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setFirstModal2(false);
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
        setFirstModal2(false);
        secureLocalStorage.setItem('defaultModal', 'false');
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const defaultMOdalHide = () => {
    secureLocalStorage.setItem('defaultModal', 'false');
    setFirstModal2(false);
  };
  return (
    <>
      {firstModal2 && (
        <>
          <div className={`${commonStyles.modal_body} ${modalStyles.modal_body_custom}`}>
            <div className={`${modalStyles.fix_height_modal2} ${modalStyles.modal_content}`} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>まずはハブを作成しよう！</h1>
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
                <button className={`close_btn`} onClick={() => setFirstModal2(!FirstModalPopup2)}>
                  戻る
                </button>

                <button className={`common_btn`}>
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

export default FirstModalPopup2;
