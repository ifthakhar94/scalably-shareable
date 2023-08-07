import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import commonMediaStyles from '../MediaTop/MediaTop.module.css';
import type { AppDispatch, RootState } from './../../../redux/app/store';

import { ReactNode } from 'react';
import MediaHeaderTop from '../MediaHeaderTop/MediaHeaderTop';
type ComponentProps = {
  children: ReactNode;
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

const MediaLayout = ({ children }: ComponentProps) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const gotLanguage = useAppSelector((state) => state?.getLanguageTag);
  const [selectedLan, setSelectedLan] = useState<any>('日本語');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    setSelectedLan(gotLanguage.languageOption);
    i18n.changeLanguage(gotLanguage.languageCode);
  }, []);

  // Get HUB ID from Redux

  return (
    <>
      <div className={commonMediaStyles.totalDiv}>
        {/* header with icons ----------- */}
        <div className={commonMediaStyles.topBar}>
          <MediaHeaderTop />
        </div>
        {children}
      </div>
    </>
  );
};

export default MediaLayout;
