import { useEffect, useRef, useState } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalStyles from './FirstModal.module.css';
import unsubscribStyle from './UnsubscribeModal.module.css';
function RssModal() {
  const [rssModal, setRssModal] = useState(false);

  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setRssModal(false);
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
        setRssModal(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const defaultMOdalHide = () => {
    setRssModal(false);
  };
  return (
    <>
      {rssModal && (
        <>
          <div className={`${commonStyles.modal_body}`}>
            <div className={unsubscribStyle.modal_content} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>ニュースをメンバーに届けよう！</h1>
              <p className={modalStyles.modal_text}>
                ハブで整理したニュースを、あなたのコミュニティのプ <br />
                ラットフォームに届けよう！
              </p>
              <div className={modalStyles.modal_text_pink_box}>
                <div>
                  <p>Discordなどのコミュニティ活動に使うプラットフォームに、あなたの言語でニュースをお届けします。</p>
                </div>
              </div>
              <div className={modalStyles.modal_text_pink_box}>
                <div>
                  <p> 全文表示や一部表示など、出力するフォーマットを選べます。</p>
                </div>
              </div>

              <button className={`common_btn common_btn_width`} onClick={() => setRssModal(!rssModal)}>
                早速RSSを発行する
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RssModal;
