import { CrossIcon, RemoveIcon } from '@/custom-icons/CustomIcons';
import { AppDispatch, RootState } from '@/redux/app/store';
import { Link } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import commonStyles from '../../../authComponents/authCommon.module.css';
import rssIcon from './../../../../assets/images/image21.png';
import modalStyles from './NewsAssetFirstModal.module.css';

import useRssUrlToTitleHook from '@/hooks/RSS/useRssUrlToTitleHook';
import useNewsAssetCreate2Hook from '@/hooks/newsAssets/useNewsAssetCreate2Hook';
import { deleteNewRssData } from '@/redux/features/Rss/rssSlice';
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
let rssArr: String[] = new Array();
function CreateNewsAsset2(props: { updateModalNumber(arg0: number): unknown; registeredAseetID(arg0: number): unknown; isOpen: boolean }) {
  const [createNewsAsset2Modal, setCreateNewsAsset2Modal] = useState(false);
  const [divController, setDivController] = useState(false);
  const gotAllInputData = useAppSelector((state) => state?.getAssetData);
  const gotAllRss = useAppSelector((state) => state?.getAssetData.rss);
  const [rssName, setRssName] = useState('');
  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal

  useEffect(() => {
    const callRss = () => {
      const gotAllRss = useAppSelector((state) => state?.rssNew.rss);
    };
  });
  const rssList = useAppSelector((state) => state?.rssNew.rss);
  console.log('List', rssList);

  // function to check the input rss value is duplicate or not --------------
  async function checkDuplicateValue(val: any) {
    let duplicateValue: String[];
    duplicateValue = gotAllRss?.filter((item) => item == val);
    return duplicateValue.length;
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setCreateNewsAsset2Modal(false);
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
        setCreateNewsAsset2Modal(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const defaultMOdalHide = () => {
    props.updateModalNumber(1);
    dispatch(deleteNewRssData([]));
  };

  // console.log(rssArr);

  const dispatch = useAppDispatch();

  const handleRssDelete = (delRss: any, indx: any) => {
    let newRss: {}[];
    newRss = rssList?.filter((eachRSS) => {
      return eachRSS !== delRss;
    });
    dispatch(deleteNewRssData(newRss));
  };
  const handleChange = (e: any) => {
    setRssName(e.target.value);
  };
  const { rssFormik } = useRssUrlToTitleHook(rssName);

  const { formik } = useNewsAssetCreate2Hook(gotAllInputData, props.registeredAseetID, props.updateModalNumber);

  return (
    <>
      <>
        <div className={`${commonStyles.modal_body} ${modalStyles.modal_body_custom}`}>
          <div className={`${modalStyles.modal_content} ${modalStyles.fixheight}`} ref={myDivRef}>
            <h1 className={modalStyles.brand_title}>ニュース取得元（RSS）の入力</h1>
            <p className={modalStyles.modal_text}>アセットで取得するニュースの取得元を入力してください。</p>
            <div className={modalStyles.modal_text_pink_box}>
              <div>
                <p>
                  入力したRSSがうまく読み込めなかった場合、RSSの形を調整していただく必要があります。 RSSの変換に関しては
                  <Link href="">こちら</Link> から変換を行なってください。
                </p>
              </div>
            </div>

            <div className={commonStyles.hub_area}>
              {!divController && (
                <div className={commonStyles.hub_inner}>
                  <form onSubmit={rssFormik.handleSubmit}>
                    <div className={commonStyles.hub_url}>
                      <p>RSS</p>
                      <input
                        type="text"
                        name="rss_url"
                        value={rssFormik.values.rss_url}
                        // onChange={handleChange}
                        onChange={rssFormik.handleChange}
                        // onBlur={formik.handleBlur}
                        placeholder="RSSのURLを入力してください。"
                      />
                    </div>
                    {formik.errors.rss_url && <div className={`mg_b0 ${commonStyles.error}`}>{formik.errors.rss_url}</div>}
                    <button
                      className={`common_btn full_width mg_t30 mg_b10`}
                      disabled={!!formik.errors.rss_url}
                      // onClick={(e: any) => {
                      //   // checkDuplicateValue(formik.values.rss_url).then((v) => {
                      //   //   v == 0 ? dispatch(settingRssValue(formik.values.rss_url)) : toast.error('You already added the same value');
                      //   // });
                      //   // setDivController(true);
                      //   handleRssData();
                      // }}
                      // onClick={handleRssData}
                    >
                      ニュースの取得元の追加
                    </button>
                  </form>
                </div>
              )}

              <div className={commonStyles.feeds}>
                {rssList &&
                  rssList.map((item: any, _index) => (
                    <div className={commonStyles.lists}>
                      <div className={commonStyles.lists_img_wrapper}>
                        <Image src={rssIcon} alt="icon" width={26} height={26} />
                        <div className={commonStyles.rss_data}>
                          <p>{item.sitename}</p>
                          <p className={commonStyles.underline}>
                            <Link href="#">{item.url}</Link>
                          </p>
                        </div>
                      </div>
                      <Link
                        href="#"
                        onClick={() => {
                          handleRssDelete(item, _index);
                        }}
                      >
                        <RemoveIcon />
                      </Link>
                    </div>
                  ))}

                <Link
                  href="#"
                  className={commonStyles.addLinkUnderline}
                  onClick={(e: any) => {
                    setDivController(false);
                  }}
                >
                  {divController && (
                    <div className={commonStyles.add_new}>
                      <CrossIcon />
                      追加する
                    </div>
                  )}
                </Link>
              </div>
            </div>
            <div className={commonStyles.confirmation_box}>
              <button className={`close_btn`} onClick={() => defaultMOdalHide()}>
                戻る
              </button>

              <button className={`common_btn`} onClick={(e: any) => formik.handleSubmit()}>
                ニュースアセットの登録を完了する
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default CreateNewsAsset2;
