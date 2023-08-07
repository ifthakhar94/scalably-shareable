import useFetchRssCategories from '@/hooks/RSS/UseFetchRssCategories';
import useFetchRssLanguageList from '@/hooks/RSS/useFetchRssLanguageList';
import useFetchSocialServiceList from '@/hooks/RSS/useFetchSocialServiceList';
import useOutputRssExistingDataHook from '@/hooks/RSS/useOutputRssExistingDataHook';
import useOutputUpdateRssFourthModal from '@/hooks/RSS/useOutputUpdateRssFourthModal';
import useUpdateRssFirstModalHook from '@/hooks/RSS/useUpdateRssFirstModalHook';
import { AppDispatch, RootState } from '@/redux/app/store';
import { setUpdateOutputRssData } from '@/redux/features/UpdateOutputRss/UpdateOutputRss';
import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import commonStyles from '../../authComponents/authCommon.module.css';
import modalStyles from '../../hubTopComponents/HubTopUI/Modals/FirstModal.module.css';
import unsubscribStyle from '../../hubTopComponents/HubTopUI/Modals/UnsubscribeModal.module.css';
import modalCommonStyles from '../../hubTopComponents/hubTopModal.module.css';
import rssCreate from '../../outputRssComponents/Modals/RssCreateModal.module.css';
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
function UpdateOutputRssModal({ handleRefetchRssList, handleRssUpdateModalOpen, outputRssIdForEdit }: any) {
  //Fetching existing Data For Update
  useOutputRssExistingDataHook(outputRssIdForEdit);
  // Getting existing Data from Toolkit Store
  const getExistingData: any = useAppSelector((state) => state.getExistingRssDataSlice);
  console.log('1st', getExistingData);
  const [exportModal1, setExportModal1] = useState(true);
  const [exportModal2, setExportModal2] = useState(false);
  const [exportModal3, setExportModal3] = useState(false);
  const [exportModal4, setExportModal4] = useState(false);
  const [socialServiceId, setSocialServiceId] = useState();
  const [languageId, setLanguageId] = useState();
  const [publishedType, setPublishedType] = useState();
  const [publishedTypeExplanation, setPublishedTypeExplanation] = useState();
  const [successModal, setSuccessModal] = useState(false);
  const [category, setCategory] = useState();

  const dispatch = useAppDispatch();

  // Setting data on stat from store
  useEffect(() => {
    setSocialServiceId(getExistingData?.existingplatform_id);
    setLanguageId(getExistingData?.existinglanguage_id);
    setPublishedType(getExistingData?.existingexport_type);
  }, [getExistingData]);

  // handling last/fourth modal for updating

  const { rssformik } = useOutputUpdateRssFourthModal(setPublishedTypeExplanation, publishedType, setSuccessModal, outputRssIdForEdit);
  // Fetching Language List

  const { rssLanguageList, getMatchedLangIdForUpdate } = useFetchRssLanguageList();
  // Setting default Language ID - Japan
  useEffect(() => {
    setLanguageId(getMatchedLangIdForUpdate);
  }, [getMatchedLangIdForUpdate]);

  //Fetching Social Services List
  interface SocialServiceListTypes {
    socialServiceId: string;
    name: string;
    unique_identifier: string;
    status: boolean;
  }

  const { rssSocialServiceList, getMatchedSocialServiceIdForUpdate } = useFetchSocialServiceList();

  // Setting default social service ID - Discord
  useEffect(() => {
    setSocialServiceId(getMatchedSocialServiceIdForUpdate);
  }, [getMatchedSocialServiceIdForUpdate]);

  // Fetching Category List
  const { rssCategories } = useFetchRssCategories();

  // Handling Category modal / First Modal
  const { formik } = useUpdateRssFirstModalHook(setExportModal1, setExportModal2, setCategory);

  // Handle Platform Change
  const handleSocialServiceChange = (SocialServiceName: string, socialServiceId: any) => {
    // setSocialServiceName(SocialServiceName);
    setSocialServiceId(socialServiceId);
  };

  // Handle Language Change
  const handleLanguageChange = (langName: string, langId: any) => {
    // setLanguageValue(langName);
    setLanguageId(langId);
  };
  // Handle Published Type Change
  const handlePublishedTypeChange = (e: any) => {
    setPublishedType(e.target.value);
  };

  const openModal2 = () => {
    dispatch(
      setUpdateOutputRssData({
        updateRssCategories: category,
        updatesocialServiceId: socialServiceId
      })
    );

    setExportModal2(false);
    setExportModal3(true);
  };
  const openModal3 = () => {
    dispatch(
      setUpdateOutputRssData({
        updateRssCategories: category,
        updatesocialServiceId: socialServiceId,
        updatelanguageId: languageId
      })
    );
    setExportModal3(false);
    setExportModal4(true);
  };

  const closeModal4 = () => {
    // handleRssCreateModalOpen(false);

    setExportModal4(false);
    setExportModal3(true);
  };

  // Closing modal 4 on API success
  useEffect(() => {
    setExportModal4(false);
  }, [successModal]);

  const closeModal3 = () => {
    setExportModal3(false);
    setExportModal2(true);
  };
  const closeModal2 = () => {
    setExportModal2(false);
    setExportModal1(true);
  };
  const closeModal = () => {
    setExportModal1(false);
    handleRssUpdateModalOpen(false);
  };

  useEffect(() => {
    dispatch(
      setUpdateOutputRssData({
        updateRssCategories: category,
        updatesocialServiceId: socialServiceId,
        updatelanguageId: languageId,
        updatePublishedType: publishedType,
        updatepublishedTypeExplanation: publishedTypeExplanation
      })
    );
  }, [publishedType, publishedTypeExplanation]);

  const handleOutputRssUpdateConfirmModal = () => {
    setSuccessModal(false);
    handleRssUpdateModalOpen(false);

    handleRefetchRssList(true);
  };

  return (
    <>
      {exportModal1 && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
            <div className={modalCommonStyles.modal_content}>
              {/* ref={myDivRef} */}
              <h1 className={modalStyles.brand_title}>書き出し設定 </h1>
              <p className={unsubscribStyle.modal_text}> コミュニティに流したいニュースのカテゴリを選択してください</p>
              <div className={rssCreate.checkboxes}>
                {rssCategories?.getHubConnectedNewsAssetCategoryList?.categories.map((item: any, index: number) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      className={rssCreate.hidden_checkbox}
                      value={item.id}
                      checked={formik?.values?.options?.includes(item.id)}
                      onChange={formik.handleChange}
                      name="options"
                    />
                    <span className={rssCreate.checkmark}>{item.name}</span>
                  </label>
                ))}
              </div>
              {formik.errors.options && <div className={commonStyles.error}>{formik.errors.options as string}</div>}
              <div className={unsubscribStyle.box}>
                <button className={`close_btn`} onClick={(e: any) => closeModal()}>
                  閉じる
                </button>

                <button className={`common_btn`} onClick={(e: any) => formik.handleSubmit()}>
                  次へ
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {exportModal2 && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
            <div className={modalCommonStyles.modal_content}>
              {/* ref={myDivRef} */}
              <h1 className={modalStyles.brand_title}>書き出し設定 </h1>
              <p className={unsubscribStyle.modal_text}> 出力したい先のプラットフォームを選択してください</p>
              <div className={rssCreate.radiobutton}>
                <div>
                  <div className={modalCommonStyles.radio_div}>
                    <>
                      {rssSocialServiceList?.getSocialServiceList?.map((single_social_servie: SocialServiceListTypes, index: number) => (
                        <label className={modalCommonStyles.radioBox} key={index}>
                          <input
                            onChange={() => handleSocialServiceChange(single_social_servie?.name, single_social_servie?.socialServiceId)}
                            type="radio"
                            name="platform"
                            className={modalCommonStyles.checkround}
                            value={single_social_servie?.socialServiceId}
                            disabled={single_social_servie?.status == false ? true : false}
                            checked={socialServiceId === single_social_servie?.socialServiceId}
                          />
                          <p className={modalCommonStyles.radio_lable}>{single_social_servie?.name}</p>
                        </label>
                      ))}
                    </>
                  </div>
                </div>
              </div>
              {/* {formik.errors.options && <div className={commonStyles.error}>{formik.errors.options as string}</div>} */}

              <div className={unsubscribStyle.box}>
                <button className={`close_btn`} onClick={(e: any) => closeModal2()}>
                  戻る
                </button>

                <button className={`common_btn`} onClick={(e: any) => openModal2()}>
                  次へ
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {exportModal3 && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
            <div className={modalCommonStyles.modal_content}>
              {/* ref={myDivRef} */}
              <h1 className={modalStyles.brand_title}>書き出し設定 </h1>
              <p className={unsubscribStyle.modal_text}> 書き出したい言語を選択してください</p>
              <div className={rssCreate.radiobutton}>
                <div>
                  <div className={modalCommonStyles.radio_div}>
                    <>
                      {rssLanguageList?.getLanguageList?.languageList?.map((single_language: any, index: number) => (
                        <label className={modalCommonStyles.radioBox} key={index}>
                          <input
                            onChange={() => handleLanguageChange(single_language?.language_name, single_language?.id)}
                            type="radio"
                            name="language"
                            className={modalCommonStyles.checkround}
                            value={single_language?.language_name}
                            checked={languageId === single_language?.id}
                          />
                          <p className={modalCommonStyles.radio_lable}> {single_language?.language_name} </p>
                        </label>
                      ))}
                    </>
                  </div>
                </div>
              </div>
              {/* {formik.errors.options && <div className={commonStyles.error}>{formik.errors.options as string}</div>} */}

              <div className={unsubscribStyle.box}>
                <button className={`close_btn`} onClick={(e: any) => closeModal3()}>
                  戻る
                </button>

                <button className={`common_btn`} onClick={(e: any) => openModal3()}>
                  次へ
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {exportModal4 && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
            <div className={modalCommonStyles.modal_content}>
              {/* ref={myDivRef} */}
              <h1 className={modalStyles.brand_title}>書き出し設定 </h1>
              <p className={unsubscribStyle.modal_text}> 書き出した先の表示方法を選択してください</p>
              <div className={rssCreate.radiobutton}>
                <div>
                  <div className={rssCreate.radio_div}>
                    <div className={rssCreate.radio_inline}>
                      <label className={modalCommonStyles.radioBox}>
                        <input
                          onChange={handlePublishedTypeChange}
                          type="radio"
                          name="publish_type"
                          className={modalCommonStyles.checkround}
                          value="TITLE_AND_BODY"
                          checked={publishedType === 'TITLE_AND_BODY'}
                        />
                        <p className={modalCommonStyles.radio_lable}>本文+タイトル </p>
                      </label>
                    </div>
                    <div className={rssCreate.radio_inline}>
                      <label className={modalCommonStyles.radioBox}>
                        <input
                          onChange={handlePublishedTypeChange}
                          type="radio"
                          name="publish_type"
                          className={modalCommonStyles.checkround}
                          value="TITLE_ONLY"
                          checked={publishedType === 'TITLE_ONLY'}
                        />
                        <p className={modalCommonStyles.radio_lable}>タイトルのみ </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={rssCreate.outputrss}>
                <div className={modalCommonStyles.url_input}>
                  <p className={modalCommonStyles.lable_text}>OutputRSS 用途 (メモ用)</p>
                  <div className={modalCommonStyles.explanation_input_content}>
                    <textarea
                      placeholder="-例）メインコミュニティへの情報流通のため"
                      onChange={rssformik.handleChange}
                      onBlur={rssformik.handleBlur}
                      value={rssformik.values.explanation}
                      name="explanation"
                    ></textarea>
                  </div>
                </div>
                {rssformik.errors.explanation && <div className={commonStyles.error}>{rssformik.errors.explanation as string}</div>}
              </div>
              <br />
              <div className={unsubscribStyle.box}>
                <button className={`close_btn`} onClick={(e: any) => closeModal4()}>
                  戻る
                </button>

                <button className={`common_btn`} onClick={(e: any) => rssformik.handleSubmit()}>
                  完了
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {successModal && (
        <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
          <div className={modalCommonStyles.editConfirmationModal}>
            <h1 className={modalStyles.brand_title}>外部出力用RSSが更新されました。</h1>
            <p className={unsubscribStyle.modal_text}>一覧画面にて変更が反映されているのをご確認ください。</p>

            <div>
              <button className={`${modalCommonStyles.editConfirmClzBtn}`} onClick={handleOutputRssUpdateConfirmModal}>
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateOutputRssModal;
