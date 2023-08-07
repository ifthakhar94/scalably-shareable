import { Menubar, Polygon } from '@/custom-icons/CustomIcons';
import { setLanguageTag } from '@/redux/features/LanguageTagSlice/LanguageTagSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import english from '../../../assets/CountryFlags/en.png';
import french from '../../../assets/CountryFlags/fr.png';
import japan from '../../../assets/CountryFlags/ja.jpg';
import hub_icon from '../../../assets/images/hub_icon.jpg';
import type { AppDispatch, RootState } from './../../../redux/app/store';
import commonMediaStyles from './../MediaTop/MediaTop.module.css';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
const MediaHeaderTop = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [selectedLan, setSelectedLan] = useState<any>('日本語');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const languages = [
    { codeValue: 'ja', optionValue: '日本語', flag: japan },
    { codeValue: 'en', optionValue: 'English', flag: english }
    // { codeValue: 'fr', optionValue: 'French', flag: french }
  ];

  function toggle() {
    setDropdownOpen(!dropdownOpen);
  }

  const handleLanguage = (lan: any): void => {
    // console.log(lan);
    setSelectedLan(lan.optionValue);
    let selectedLanguage = lan.codeValue;
    dispatch(setLanguageTag({ code: lan.codeValue, option: lan.optionValue }));
    i18n.changeLanguage(selectedLanguage);
  };

  // Getting data from redux store
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);
  const AllLangData = useAppSelector((state) => state.getLanguageTag);
  // console.log(AllLangData?.languageOption);
  useEffect(() => {
    setSelectedLan(AllLangData?.languageOption);
  }, [AllLangData?.languageOption]);

  return (
    <>
      <div className={commonMediaStyles.menuIcon}>
        <Menubar />
      </div>
      {/* icon------------------------- */}
      <div className={commonMediaStyles.hubIcon}>
        <Link href={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${AllHubData?.ecomedia_id}/${AllHubData?.hub_url}`}>
          {AllHubData?.getMediaHubIcon && <img src={AllHubData?.getMediaHubIcon} alt="Hub Image" width={55} height={55} />}
          {!AllHubData?.getMediaHubIcon && <Image src={hub_icon} alt="Hub Image" />}
        </Link>
      </div>
      {/* dropdown------------ */}

      <div className={commonMediaStyles.language_selection} id="aaa" onClick={() => toggle()}>
        <div className={commonMediaStyles.lan_list}>
          {selectedLan == '日本語' && <Image src={japan} alt="Japan Flag" width={16} height={15} />}
          {selectedLan == 'English' && <Image src={english} alt="Uk Flag" width={16} height={15} />}
          {selectedLan == 'French' && <Image src={french} alt="French Flag" width={16} height={15} />}
          <p>{selectedLan}</p>

          <div
            className={commonMediaStyles.language_dropdown}
            id="drpID"
            style={{
              display: dropdownOpen ? 'block' : 'none'
            }}
          >
            <div className={commonMediaStyles.arrow}></div>
            <ul>
              {languages.map((eachLan) => (
                <li
                  className={commonMediaStyles.dropdownList}
                  onClick={() => {
                    handleLanguage({ codeValue: eachLan.codeValue, optionValue: eachLan.optionValue });
                  }}
                >
                  <Image src={eachLan.flag} alt="Japan Flag" width={16} height={15} />
                  {eachLan.optionValue}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Polygon />
      </div>
    </>
  );
};

export default MediaHeaderTop;
