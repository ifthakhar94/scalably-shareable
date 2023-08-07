import useGetMediaHubInfoHook from '@/hooks/Media/useGetMediaHubInfoHook';
import { Container } from '@mui/material';
import Head from 'next/head';
import CategoryArticlesList from '../CategoryArticlesList/CategoryArticlesList';
import CategoryConnectAssetsAndFooter from '../CategoryConnectAssetsAndFooter/CategoryConnectAssetsAndFooter';
import MediaCategory from '../MediaCategory/MediaCategory';
import MediaLayout from '../MediaLayout/MediaLayout';
import commonMediaStyles from './../MediaTop/MediaTop.module.css';

const MediaCategoryUI = () => {
  // Storing Data on redux using this hook
  useGetMediaHubInfoHook();
  return (
    <>
      <Head>
        <title>Category Articles</title>
      </Head>
      <MediaLayout>
        <div className={commonMediaStyles.full_content}>
          <Container className={commonMediaStyles.container_content}>
            {/* container first part upto read mnore button------------ */}
            <div className={commonMediaStyles.container_first_content}>
              {/* category content------------ */}

              <MediaCategory />

              {/* all article prinbt-------- */}
              <CategoryArticlesList />
            </div>

            {/* Connected Assets and footer */}
            <CategoryConnectAssetsAndFooter />
          </Container>
        </div>
      </MediaLayout>
    </>
  );
};

export default MediaCategoryUI;
