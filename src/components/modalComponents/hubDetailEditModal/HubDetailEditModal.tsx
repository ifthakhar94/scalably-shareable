import CategoryEdit from '@/components/hubTopComponents/CategoryEdit/CategoryEdit';
import Animations from '@/components/loader/Animations';
import useHubDetailsEditDataFetch from '@/hooks/hubList/useHubDetailsEditDataFetch';
import useHubUpdateDataHook from '@/hooks/hubList/useHubUpdateDataHook';
import { RootState } from '@/redux/app/store';
import { Box, Modal } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import commonStyles from '../../authComponents/authCommon.module.css';
import unsubscribStyle from '../../hubTopComponents/HubTopUI/Modals/UnsubscribeModal.module.css';
import modalCommonStyles from './../../hubTopComponents/hubTopModal.module.css';
import modalStyles from './HubDetailEditModal.module.css';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type SetPropsType = {
  setEditFunction: (a: boolean) => void;
  setEditConfirmFunction: (a: boolean) => void;
};

const HubDetailEditModal = ({ setEditFunction, setEditConfirmFunction }: SetPropsType) => {
  const [tagLength, setTagLength] = React.useState(false);
  const [duplicateCat, setDuplicateCat] = React.useState(false); // New state for Category duplicity check

  const categoriesForEdit = useAppSelector((state) => state?.get_all_categories?.all_categories);
  let catArr: string[] = new Array();

  categoriesForEdit.map((catItem: any) => {
    catArr.push(catItem?.text as string);
  });
  const catArrStr = JSON.stringify(catArr);
  const [open, setOpen] = React.useState(true);

  const [loader, setLoader] = React.useState(true);
  interface hubDataTypes {
    categories: string[];
    connectassetnum: number;
    hubicon: string;
    hubmembernum: number;
    hubname: string | undefined;
    huburl: string;
    outputrssnum: number;
    publish_status: string;
  }
  const [editHubData, setEditHubData] = React.useState<hubDataTypes | undefined>();
  const [scope, setScope] = React.useState('GENERAL_PUBLIC');

  const myDivRef = useRef<HTMLDivElement>(null);
  const visibility = '一般公開（URLを知っている方がどなたでも閲覧可能になります。）';
  const router = useRouter();
  const gotHubIdForEdit = router.query.slug;

  const ecomediaUrl = 'https://ecomedia.io/yama1234/yamamedia';

  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const addTags = (e: any) => {
    if (e.key == 'Enter' && tagValue) {
      setTags([...tags, tagValue]);
      setTagValue('');
    }
  };

  const deleteTag = (tag_remove: any) => {
    const remainTags = tags.filter((_, index) => index !== tag_remove);
    setTags(remainTags);
  };

  //Hide  modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setEditFunction(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myDivRef]);

  // Fetching Existing Data

  const { fetchExistingData } = useHubDetailsEditDataFetch(gotHubIdForEdit, setEditHubData, setLoader);

  interface Tag {
    id: string;
    text: string;
  }
  const existingData: Tag[] = [];
  editHubData?.categories.forEach((ExistingCatitem, index) => {
    existingData.push({
      id: ExistingCatitem,
      text: ExistingCatitem
    });
  });
  const { formik } = useHubUpdateDataHook(gotHubIdForEdit, catArr, setOpen, setEditFunction, setEditConfirmFunction);
  console.log('1', editHubData?.hubname);
  return (
    <>
      {/* newmodal ---------- */}
      {loader == true && <Animations />}

      {loader == false && (
        <Modal className={modalCommonStyles.create_hub} open={open}>
          <Box className={modalCommonStyles.modal_box}>
            <h1 className={modalStyles.brand_title}>基本情報編集 </h1>
            <p className={unsubscribStyle.modal_text}>以下の情報を入力してください。</p>

            <div className="create_hub_modal_body">
              <div className={modalCommonStyles.email_input}>
                <p>ハブの名称</p>
                <input
                  name="hub_name"
                  // value={editHubData?.hubname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  required
                  placeholder=" ハブの名前を入力してください"
                  defaultValue={editHubData?.hubname}
                />
              </div>

              {formik.errors.hub_name && <div className={commonStyles.error}>{formik.errors.hub_name}</div>}

              <div className={modalCommonStyles.url_input}>
                <p>URL</p>
                <div className={modalCommonStyles.edit_url_input_content}>
                  <input
                    className={modalStyles.url_link}
                    type="text"
                    placeholder=""
                    name="url"
                    value={ecomediaUrl}
                    disabled
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              <div className={modalCommonStyles.tag_input}>
                <p>ハブのカテゴリ </p>
                <CategoryEdit setDuplicateCat={setDuplicateCat} existingData={existingData} setTagLength={setTagLength}></CategoryEdit>
              </div>
              {tagLength && <div className={commonStyles.error}>カテゴリは30文字以内で入力してください。</div>}
              {duplicateCat && <div className={commonStyles.error}>他のカテゴリ名を入力してください。</div>}

              <div className={modalCommonStyles.page_visibility}>
                <div className={modalCommonStyles.page_visibility_border_text}>ハブのメディアページ公開範囲</div>
                <div className={modalCommonStyles.selection_inner}>
                  <select
                    required
                    value={scope}
                    onChange={(e) => {
                      setScope(e.target.value);
                    }}
                  >
                    <option defaultChecked value="GENERAL_PUBLIC">
                      {visibility}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className={unsubscribStyle.box}>
              <button
                className={`close_btn`}
                onClick={() => {
                  setEditFunction(false);
                  // console.log('close clicked');
                }}
              >
                閉じる
              </button>

              <button type="submit" className={`common_btn`} onClick={(e: any) => formik.handleSubmit()}>
                <Link href="#">編集する</Link>
              </button>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default HubDetailEditModal;
