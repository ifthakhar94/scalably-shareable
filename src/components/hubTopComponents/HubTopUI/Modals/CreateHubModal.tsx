import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useEffect } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalCommonStyles from '../../hubTopModal.module.css';
import modalStyles from './FirstModal.module.css';
import unsubscribStyle from './UnsubscribeModal.module.css';

import CatogeryInput from '../../CategoryInput/CategoryInput';

import useCreateHub from '@/hooks/hubList/useCreateHub';
import { RootState } from '@/redux/app/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
interface CreateHubModalTypes {
  parentCreateStatus(arg0: boolean): unknown;
  parentStatus(arg0: boolean): unknown;
  isOpen: boolean;
  handleHubCreateConfirmOpen: any;
}
function CreateHubModal(props: CreateHubModalTypes) {
  const { parentCreateStatus, parentStatus, isOpen, handleHubCreateConfirmOpen } = props;

  const gotAllCategories = useAppSelector((state) => state?.get_all_categories?.all_categories);
  const [open, setOpen] = React.useState(isOpen);

  const [ecomedia_id, setEcomedia_id] = React.useState('');
  const [tagLength, setTagLength] = React.useState(false); // New state for Category character count
  const [duplicateCat, setDuplicateCat] = React.useState(false); // New state for Category duplicity check

  const [scope, setScope] = React.useState('GENERAL_PUBLIC');

  useEffect(() => {
    if (isOpen === true) {
      setOpen(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    parentStatus(false);
  };
  let catArr: string[] = new Array();
  type getProps = {
    id: string;
    text: string;
  };

  gotAllCategories?.map((catItem) => {
    catArr.push(catItem?.text as string);
  });
  const catArrStr = JSON.stringify(catArr);
  const { formik } = useCreateHub(setOpen, parentStatus, parentCreateStatus, catArrStr, scope, handleHubCreateConfirmOpen);

  useEffect(() => {
    const Local_User_Data = secureLocalStorage.getItem('ecomedia_id');
    if (typeof Local_User_Data === 'string') {
      setEcomedia_id(JSON.parse(Local_User_Data));
    }
  }, []);
  const COMMON_URL = process.env.NEXT_PUBLIC_ECOMEDIA_COMMON_URL;
  return (
    <>
      <Modal className={modalCommonStyles.create_hub} open={open} onClose={handleClose}>
        <Box className={modalCommonStyles.modal_box}>
          <h1 className={modalStyles.brand_title}>ハブを作ろう </h1>
          <p className={unsubscribStyle.modal_text}>以下の情報を入力してください。</p>

          <div className="create_hub_modal_body">
            <div className={modalCommonStyles.email_input}>
              <p>ハブの名称</p>
              <input
                type="text"
                name="hub_name"
                value={formik.values.hub_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="ハブの名前を入力してください"
              />
            </div>

            {formik.errors.hub_name && <div className={commonStyles.error}>{formik.errors.hub_name}</div>}

            <div className={modalCommonStyles.url_input}>
              <p>URL</p>

              <div className={modalCommonStyles.url_input_content}>
                <p>{ecomedia_id && `${COMMON_URL}/${ecomedia_id}`}</p>
                <input
                  type="text"
                  placeholder="-設定したいURLを入力してください"
                  name="url"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            {formik.errors.url && <div className={commonStyles.error}>{formik.errors.url}</div>}

            <div className={modalCommonStyles.tag_input}>
              <p>ハブのカテゴリ</p>
              <CatogeryInput setDuplicateCat={setDuplicateCat} setTagLength={setTagLength} />
            </div>
            {tagLength && <div className={commonStyles.error}>カテゴリは30文字以内で入力してください。</div>}
            {duplicateCat && <div className={commonStyles.error}>他のカテゴリ名を入力してください。</div>}

            <div className={modalCommonStyles.page_visibility}>
              <div className={modalCommonStyles.page_visibility_border_text}>ハブのメディアページ公開範囲</div>
              <div className={modalCommonStyles.selection_inner}>
                <select
                  value={scope}
                  onChange={(e) => {
                    setScope(e.target.value);
                  }}
                >
                  <option defaultChecked value="GENERAL_PUBLIC">
                    一般公開（URLを知っている方がどなたでも閲覧可能になります。）
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className={unsubscribStyle.box}>
            <button className={`close_btn`} onClick={handleClose}>
              閉じる
            </button>

            <button className={`common_btn`} onClick={(e: any) => formik.handleSubmit()}>
              ハブを作成する
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default CreateHubModal;
