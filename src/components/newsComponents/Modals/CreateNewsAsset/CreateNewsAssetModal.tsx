import CategoryEdit from '@/components/hubTopComponents/CategoryEdit/CategoryEdit';
import useNewsAssetCreate from '@/hooks/newsAssets/useNewsAssetCreate';
import { AppDispatch, RootState } from '@/redux/app/store';
import { setNewsData } from '@/redux/features/NewsAssetDataSlice/NewsAssetDataSlice';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalStyles from '../../../hubTopComponents/HubTopUI/Modals/FirstModal.module.css';
import unsubscribStyle from '../../../hubTopComponents/HubTopUI/Modals/UnsubscribeModal.module.css';
import modalCommonStyles from '../../../hubTopComponents/hubTopModal.module.css';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

function CreateNwsAssetModal(props: {
  updateModalNumber(arg0: number): unknown;
  isOpen: boolean;
  modalHideStatus: (arg0: number) => void;
}) {
  const gotAllInputData = useAppSelector((state) => state?.getAssetData);
  const [open, setOpen] = React.useState(props.isOpen);
  const [selectedValue, setSelectedValue] = React.useState<any>(gotAllInputData?.accessibility);
  const [tagLength, setTagLength] = React.useState(false); // New state for Category character count
  const [duplicateCat, setDuplicateCat] = React.useState(false); // New state for Category duplicity check
  const gotAllCategories = useAppSelector((state) => state?.get_all_categories?.all_categories);
  const myDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(
      setNewsData({
        name: '',
        urlValue: '',
        description: '',
        accessibility: 'EVERYONE',
        categories: []
      })
    ); //sending this modal's all data to redux state
    props.modalHideStatus(1);

    // props.updateModalNumber(0);
  };
  const handleRadioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  let catArr: string[] = new Array();

  gotAllCategories.map((catItem: { text: string }) => {
    catArr.push(catItem?.text as string);
  });
  const catArrStr = JSON.stringify(catArr);

  const urlRegex = `/^(?:(?:https?|ftp)://)?(?:www.)?(?:[w-]+(?:.[w-]+)+)(?:/[w‌​.-])/?(?:#[w-])?(?:?[^s])?$/`;

  interface Tag {
    id: string;
    text: string;
  }
  const existingData: Tag[] = [];
  gotAllInputData?.categoryarray?.forEach((ExistingCatitem: any, index: any) => {
    existingData.push({
      id: ExistingCatitem,
      text: ExistingCatitem
    });
  });
  //implement custom hook
  const { formik } = useNewsAssetCreate(setOpen, selectedValue, catArrStr, props.updateModalNumber);

  return (
    <>
      <Modal className={modalCommonStyles.create_hub} open={open} onClose={handleClose}>
        <Box className={modalCommonStyles.modal_box}>
          <h1 className={modalStyles.brand_title}>ニュースアセットを追加 </h1>
          <p className={unsubscribStyle.modal_text}>追加するニュースアセットの情報を入力しましょう。</p>
          <div className="create_hub_modal_body">
            <div className={modalCommonStyles.newsAsset_input}>
              <p>ニュースアセットの名称</p>
              <input
                type="text"
                name="hub_name"
                value={formik.values.hub_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="ニュースアセットの名称を入力してください。"
              />
            </div>
          </div>

          {formik.errors.hub_name && <div className={commonStyles.error}>{formik?.errors?.hub_name}</div>}

          <div className={modalCommonStyles.url_input}>
            <p className={modalCommonStyles.lable_text}>あなたの公式URL</p>
            <div className={modalCommonStyles.explanation_input_content}>
              <input
                type="text"
                placeholder=" URLを入力してください"
                name="url"
                value={formik.values.url.toString()}
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
                className={modalCommonStyles.explanation_textareaInside}
                name="explanation"
                value={formik.values.explanation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                説明分を入力してください
              </textarea>
            </div>
          </div>
          {formik.errors.explanation && <div className={commonStyles.error}>{formik.errors.explanation}</div>}

          <div className="create_hub_modal_body">
            <div className={modalCommonStyles.url_input}>
              <p className={modalCommonStyles.lable_text}>公開範囲設定</p>
              <div className={modalCommonStyles.radio_div}>
                <label className={modalCommonStyles.radioBox}>
                  <input
                    type="radio"
                    name="is_company"
                    className={modalCommonStyles.checkround}
                    value={'EVERYONE'}
                    onChange={handleRadioButtonChange}
                    defaultChecked={selectedValue === 'EVERYONE'}
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
                    defaultChecked={selectedValue === 'APPROVAL_REQUIRED'}
                  />
                  <p className={modalCommonStyles.radio_lable}>承認が必要</p>
                </label>
              </div>
            </div>
          </div>
          <div className={modalCommonStyles.tag_input}>
            <p>カテゴリの設定</p>
            {/* <CatogeryInput setDuplicateCat={setDuplicateCat} setTagLength={setTagLength} />
             */}

            <CategoryEdit setDuplicateCat={setDuplicateCat} existingData={existingData} setTagLength={setTagLength} />
          </div>
          {tagLength && <div className={commonStyles.error}>カテゴリは30文字以内で入力してください。</div>}
          {duplicateCat && <div className={commonStyles.error}>他のカテゴリ名を入力してください。</div>}

          <div className={unsubscribStyle.creatAssetBtns}>
            <button className={`close_btn`} onClick={handleClose}>
              キャンセル
            </button>

            <button className={`common_btn`} onClick={(e: any) => formik.handleSubmit()}>
              ニュース取得元（RSS）の入力に進む
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default CreateNwsAssetModal;
