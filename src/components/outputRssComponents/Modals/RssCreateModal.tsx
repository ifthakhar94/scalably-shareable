import useFetchRssLanguageList from '@/hooks/RSS/useFetchRssLanguageList';
import useFetchSocialServiceList from '@/hooks/RSS/useFetchSocialServiceList';
import useRssCreateFirstModalHook from '@/hooks/RSS/useRssCreateFirstModalHook';
import useRssCreateFourthModalHook from '@/hooks/RSS/useRssCreateFourthModalHook';
import { AppDispatch, RootState } from '@/redux/app/store';
import { setCreateRssData } from '@/redux/features/CreateRssDataSlice/CreateRssDataSlice';
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
function RssCreateModal({ handleRefetchRssList, handleRssCreateModalOpen, rssCategories }: any) {
  const [exportModal1, setExportModal1] = useState(true);
  const [exportModal2, setExportModal2] = useState(false);
  const [exportModal3, setExportModal3] = useState(false);
  const [exportModal4, setExportModal4] = useState(false);
  const [socialServiceUniqueIdentifier, setSocialServiceUniqueIdentifier] = useState('discord');
  const [socialSocialServiceId, setSocialServiceId] = useState();
  const [languageCode, setLanguageCode] = useState('ja');
  const [languageId, setLanguageId] = useState();
  const [publishedType, setPublishedType] = useState('TITLE_AND_BODY');
  const [publishedTypeExplanation, setPublishedTypeExplanation] = useState();
  const [successModal, setSuccessModal] = useState(false);
  const [category, setCategory] = useState();

  const dispatch = useAppDispatch();

  const { rssformik } = useRssCreateFourthModalHook(setPublishedTypeExplanation, publishedType, setSuccessModal);
  // Fetching Language List

  const { rssLanguageList, getMatchedLangId } = useFetchRssLanguageList();

  // Setting default Language ID - Japan
  useEffect(() => {
    setLanguageId(getMatchedLangId);
  }, [getMatchedLangId]);

  //Fetching Social Services List
  interface SocialServiceListTypes {
    socialServiceId: string;
    name: string;
    unique_identifier: string;
    status: boolean;
  }

  const { rssSocialServiceList, getMatchedSocialServiceId } = useFetchSocialServiceList();
  // console.log('list', getMatchedSocialServiceId);

  // Setting default social service ID - Discord
  useEffect(() => {
    setSocialServiceId(getMatchedSocialServiceId);
  }, [getMatchedSocialServiceId]);

  const getRssCategories = rssCategories?.getHubConnectedNewsAssetCategoryList?.categories;
  // Handling Category modal / First Modal
  const { formik } = useRssCreateFirstModalHook(setExportModal1, setExportModal2, setCategory, getRssCategories);

  // Handle Platform Change
  const handleSocialServiceChange = (unique_identifier: string, socialServiceId: any) => {
    setSocialServiceUniqueIdentifier(unique_identifier);
    setSocialServiceId(socialServiceId);
  };

  // Handle Language Change
  const handleLanguageChange = (langCode: string, langId: any) => {
    setLanguageCode(langCode);
    setLanguageId(langId);
  };
  // Handle Published Type Change
  const handlePublishedTypeChange = (e: any) => {
    setPublishedType(e.target.value);
  };

  const openModal2 = () => {
    dispatch(
      setCreateRssData({
        createRssCategories: category,
        socialServiceName: socialServiceUniqueIdentifier,
        socialServiceId: socialSocialServiceId
      })
    );
    setExportModal2(false);
    setExportModal3(true);
  };
  const openModal3 = () => {
    dispatch(
      setCreateRssData({
        createRssCategories: category,
        socialServiceName: socialServiceUniqueIdentifier,
        socialServiceId: socialSocialServiceId,
        languageValue: languageCode,
        languageId: languageId
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
    handleRssCreateModalOpen(false);
  };

  useEffect(() => {
    dispatch(
      setCreateRssData({
        createRssCategories: category,
        socialServiceName: socialServiceUniqueIdentifier,
        socialServiceId: socialSocialServiceId,
        languageValue: languageCode,
        languageId: languageId,
        PublishedType: publishedType,
        publishedTypeExplanation: publishedTypeExplanation
      })
    );
  }, [publishedType, publishedTypeExplanation]);

  // const getCreateRssDataFromStore: any = useAppSelector((state) => state.getCreateRssDataSlice);
  // console.log(getCreateRssDataFromStore);
  // handle Output Rss Create Confirm Modal
  const handleOutputRssCreateConfirmModal = () => {
    setSuccessModal(false);
    handleRssCreateModalOpen(false);
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
                            onChange={() =>
                              handleSocialServiceChange(single_social_servie?.unique_identifier, single_social_servie?.socialServiceId)
                            }
                            type="radio"
                            name="platform"
                            className={modalCommonStyles.checkround}
                            value={single_social_servie?.name}
                            disabled={single_social_servie?.status == false ? true : false}
                            checked={socialServiceUniqueIdentifier === single_social_servie?.unique_identifier}
                          />
                          <p className={modalCommonStyles.radio_lable}> {single_social_servie?.name} </p>
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
                            onChange={() => handleLanguageChange(single_language?.language_code, single_language?.id)}
                            type="radio"
                            name="language"
                            className={modalCommonStyles.checkround}
                            value={single_language?.language_name}
                            checked={languageCode === single_language?.language_code}
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
                        <p className={modalCommonStyles.radio_lable}>本文+タイトル</p>
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
                        <p className={modalCommonStyles.radio_lable}>タイトルのみ</p>
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
            <h1 className={modalStyles.brand_title}>外部出力用RSSが作成されました。 </h1>
            <p className={unsubscribStyle.modal_text}>詳細ページにてRSSが追加されているのをご確認ください。</p>

            <div>
              <button className={`${modalCommonStyles.editConfirmClzBtn}`} onClick={handleOutputRssCreateConfirmModal}>
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RssCreateModal;
