import Skeleton from '@mui/material/Skeleton';

const MediaArticleLoader = () => {
  return (
    <div className="">
      {Array.from(Array(8).keys()).map(() => (
        <Skeleton animation="wave" height={60} />
      ))}
    </div>
  );
};

export default MediaArticleLoader;
