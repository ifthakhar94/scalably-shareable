import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useEffect, useRef } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalStyles from '../../../hubTopComponents/HubTopUI/Modals/FirstModal.module.css';
import unsubscribStyle from '../../../hubTopComponents/HubTopUI/Modals/UnsubscribeModal.module.css';
import modalCommonStyles from '../../../hubTopComponents/hubTopModal.module.css';

// for redux implementation-------------
import CategoryEdit from '@/components/hubTopComponents/CategoryEdit/CategoryEdit';
import useFetchDataForEditHook from '@/hooks/newsAssets/useFetchDataForEditHook';
import useNewsAssetUpdateHook from '@/hooks/newsAssets/useNewsAssetUpdateHook';
import { RootState } from '@/redux/app/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function NewsAssetEdit(props: {
  updateModalNumber(arg0: number): unknown;
  isOpen: boolean;
  modalHideStatus: (arg0: number) => void;
  gotNewsAssetsID: any;
}) {
  const [open, setOpen] = React.useState(props.isOpen);
  const [selectedValue, setSelectedValue] = React.useState('EVERYONE');
  const [loader, setLoader] = React.useState(true);
  const [tagLength, setTagLength] = React.useState(false); // New state for Category character count
  const [duplicateCat, setDuplicateCat] = React.useState(false); // New state for Category duplicity check
  const gotAllCategories = useAppSelector((state) => state?.get_all_categories?.all_categories);
  const [editNewsData, setEditNewsData] = React.useState<any | undefined>();

  const handleClose = () => {
    props.modalHideStatus(0);
    props.updateModalNumber(0);
  };

  const handleRadioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  let catArr: string[] = new Array();

  gotAllCategories.map((catItem) => {
    catArr.push(catItem?.text as string);
  });
  const catArrStr = JSON.stringify(catArr);

  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setOpen(false);
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
        setOpen(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  //fetching exixting data for default input value----------

  useEffect(() => {
    useFetchDataForEditHook(props.gotNewsAssetsID, setEditNewsData, setLoader);
  }, [props.gotNewsAssetsID]);

  // for getting existing categories from db---------------
  interface Tag {
    id: string;
    text: string;
  }
  const existingData: Tag[] = [];
  editNewsData?.assetcategory.forEach((ExistingCatitem: any, index: number) => {
    existingData.push({
      id: ExistingCatitem.name,
      text: ExistingCatitem.name
    });
  });
  useEffect(() => {
    if (editNewsData) {
      formik.setValues({
        hub_name: editNewsData?.asseetName,
        url: editNewsData?.assetURL,
        explanation: editNewsData?.description
      });
    }
  }, [editNewsData]);

  const { formik } = useNewsAssetUpdateHook(
    editNewsData,
    setOpen,
    selectedValue,
    catArrStr,
    props.updateModalNumber,
    props.gotNewsAssetsID
  );

  return (
    <>
      {loader == false && (
        <Modal className={modalCommonStyles.create_hub} open={open} onClose={handleClose}>
          <Box className={modalCommonStyles.modal_box}>
            <h1 className={modalStyles.brand_title}>ニュースアセットを追加 </h1>
            <p className={unsubscribStyle.modal_text}>追加するニュースアセットの情報を入力しましょう。</p>
            <div className="create_hub_modal_body">
              <div className={modalCommonStyles.newsAsset_input}>
                <p>ニュースアセットの名称</p>
                <input
                  type="text"
                  // autoFocus
                  name="hub_name"
                  value={formik.values.hub_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  defaultValue={editNewsData?.asseetName}
                  required
                  placeholder="ニュース アセットの名前を入力してください。"
                />
              </div>
            </div>

            {formik.errors.hub_name && <div className={commonStyles.error}>{formik.errors.hub_name as any}</div>}

            <div className={modalCommonStyles.url_input}>
              <p className={modalCommonStyles.lable_text}>あなたの公式URL</p>
              <div className={modalCommonStyles.explanation_input_content}>
                <input
                  type="text"
                  placeholder="-設定したいURLを入力してください"
                  name="url"
                  value={formik.values.url}
                  defaultValue={editNewsData?.assetURL}
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            {formik.errors.url && <div className={commonStyles.error}>{formik.errors.url as any}</div>}
            <div className={modalCommonStyles.url_input}>
              <p className={modalCommonStyles.lable_text}>説明文章</p>
              <div className={modalCommonStyles.explanation_textarea_content}>
                <textarea
                  name="explanation"
                  value={formik.values.explanation}
                  defaultValue={editNewsData?.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>

                {/* <textarea
                  name="explanation"
                  value={formik.values.explanation}
                  defaultValue={editNewsData?.description}
                  onChange={formik.handleChange}
                /> */}
              </div>
            </div>
            {formik.errors.explanation && <div className={commonStyles.error}>{formik.errors.explanation as any}</div>}
            <div className="create_hub_modal_body">
              <div className={modalCommonStyles.url_input}>
                <p className={modalCommonStyles.lable_text}>公開範囲設定</p>
                <div className={modalCommonStyles.radio_div}>
                  {editNewsData?.publish_status == 'EVERYONE' ? (
                    <>
                      <label className={modalCommonStyles.radioBox}>
                        <input
                          type="radio"
                          name="is_company"
                          defaultChecked
                          className={modalCommonStyles.checkround}
                          value={'EVERYONE'}
                          onChange={handleRadioButtonChange}
                        />
                        <p className={modalCommonStyles.radio_lable}>全員</p>
                      </label>
                      <label className={modalCommonStyles.radioBox}>
                        <input
                          type="radio"
                          name="is_company"
                          className={modalCommonStyles.checkround}
                          value={'APPROVAL_REQUIRED'}
                          onChange={handleRadioButtonChange}
                        />

                        <p className={modalCommonStyles.radio_lable}>承認が必要</p>
                      </label>
                    </>
                  ) : (
                    <>
                      <label className={modalCommonStyles.radioBox}>
                        <input
                          type="radio"
                          name="is_company"
                          className={modalCommonStyles.checkround}
                          value={'EVERYONE'}
                          onChange={handleRadioButtonChange}
                        />
                        <p className={modalCommonStyles.radio_lable}>全員</p>
                      </label>
                      <label className={modalCommonStyles.radioBox}>
                        <input
                          type="radio"
                          name="is_company"
                          defaultChecked
                          className={modalCommonStyles.checkround}
                          value={'APPROVAL_REQUIRED'}
                          onChange={handleRadioButtonChange}
                        />

                        <p className={modalCommonStyles.radio_lable}>承認が必要</p>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={modalCommonStyles.tag_input}>
              <p>カテゴリの設定</p>

              <CategoryEdit setDuplicateCat={setDuplicateCat} existingData={existingData} setTagLength={setTagLength}></CategoryEdit>
            </div>
            {tagLength && <div className={commonStyles.error}>カテゴリは30文字以内で入力してください。</div>}
            {duplicateCat && <div className={commonStyles.error}>他のカテゴリ名を入力してください。</div>}

            <div className={unsubscribStyle.creatAssetBtns}>
              <button className={`close_btn`} onClick={handleClose}>
                閉じる
              </button>

              <button
                className={`common_btn`}
                onClick={(e: any) => {
                  formik.handleSubmit();
                }}
              >
                編集する
              </button>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default NewsAssetEdit;
