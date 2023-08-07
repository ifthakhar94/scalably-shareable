import ProtectedRoute from '@/components/guardComponents/ProtectedRoute';
import {
  Email,
  GearIcon,
  LeftLayoutIcon1,
  LockIcon,
  LogoutIcon,
  RangeIcon,
  TableIcon,
  UserIcon,
  UserIcon1
} from '@/custom-icons/CustomIcons';
import useLogout from '@/hooks/authHooks/useLogout';
import { Home_url, hubtop_url, news_asset } from '@/navCentralization/nav_url';
import { RootState } from '@/redux/app/store';
import { Menu, MenuItem } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import EcoMedia_logo from './../../../assets/images/EcoMedia_logo.png';
import Styles from './HubTopLayout.module.css';
type ComponentProps = {
  children: ReactNode;
  header_value: String;
};

const CommonLayout = ({ children, header_value }: ComponentProps) => {
  const { handleLogout } = useLogout();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [ecomediaID, setEcomediaID] = React.useState<null | string>(null);

  const loggedInUser = useSelector((state: RootState) => state.getAuthData.user);

  // useEffect(() => {
  //   let ecomedia_id = LSHelper.getItem('ecomedia_id');
  //   setEcomediaID(JSON.parse(ecomedia_id as string));
  // }, []);

  const open = Boolean(anchorEl);
  const handleGearClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path ? 'common_nav_active' : '';
  };
  const handleGearClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    handleLogout();
  };
  return (
    <>
      {/* Protected route authenticates only logged in users */}
      <ProtectedRoute>
        <Head>
          <title>{header_value}</title>
        </Head>
        {/* Section Header  */}
        <header className={Styles.hubtop_header}>
          <div className={Styles.hubtop_logo}>
            <Link href={Home_url}>
              <Image src={EcoMedia_logo} alt="EcoMedia_logo" width={111} height={20} />
            </Link>
          </div>

          <div className={Styles.hubtop_user_settings} onClick={handleGearClick}>
            <div className={Styles.user_icon}>
              <UserIcon1 />
            </div>
            <div className={Styles.setting_icon}>
              {/* <GearIcon /> */}

              <GearIcon />
            </div>
          </div>

          <Menu
            anchorEl={anchorEl}
            id="account-menubar"
            open={open}
            onClose={handleGearClose}
            onClick={handleGearClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                margin: '8px',
                borderRadius: '12px',
                minWidth: '316px',
                height: 'auto',
                filter: 'drop-shadow(0px 25px 50px rgba(0, 0, 0, 0.25))',
                mt: 1.5,
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0
                }
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <p className={Styles.menu_head_p}>{loggedInUser ? loggedInUser?.email : ''}</p>

            <div style={{ margin: '0 19px', width: 'auto', height: '1px', background: '#F5F5F5' }}></div>

            <MenuItem onClick={handleGearClose}>
              <UserIcon /> <p className={Styles.menu_p}>アカウント設定</p>
            </MenuItem>
            <MenuItem onClick={handleGearClose}>
              <Email /> <p className={Styles.menu_p}>お問いわせ</p>
            </MenuItem>
            <MenuItem onClick={handleGearClose}>
              <RangeIcon /> <p className={Styles.menu_p}>利用規約</p>
            </MenuItem>
            <MenuItem onClick={handleGearClose}>
              <LockIcon /> <p className={Styles.menu_p}>プライバシーポリシー</p>
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>
              <LogoutIcon /> <p className={Styles.menu_p}>ログアウト</p>
            </MenuItem>
          </Menu>
        </header>

        {/* Main Layout   */}
        <main className={Styles.main_layout}>
          <div className={Styles.main_layout_wrapper}>
            <div className={Styles.left_layout}>
              <ul className={Styles.left_layout_nav}>
                <Link href={hubtop_url}>
                  <li className={isActive(hubtop_url)}>
                    {/* <Link href={hubtop_url}> */}
                    <LeftLayoutIcon1 />
                    {/* </Link> */}
                    {/* <Link href={hubtop_url} className={Styles.menuLinkText}> */}
                    ハブ
                    {/* </Link> */}
                  </li>
                </Link>
                <Link href={news_asset}>
                  <li className={isActive(news_asset)}>
                    {/* <Link href={news_asset}> */}
                    <TableIcon />
                    {/* </Link> */}
                    {/* <Link href={news_asset} className={Styles.menuLinkText}> */}
                    ニュースアセット
                    {/* </Link> */}
                  </li>
                </Link>
              </ul>
            </div>
            <div className={Styles.right_layout}>{children}</div>
          </div>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default CommonLayout;
