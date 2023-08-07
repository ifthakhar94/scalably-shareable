import Skeleton from '@mui/material/Skeleton';
const MediaCategoryLoader = () => {
  return (
    <div className="">
      {Array.from(Array(20).keys()).map(() => (
        <Skeleton animation="wave" height={20} />
      ))}
    </div>
  );
};

export default MediaCategoryLoader;
