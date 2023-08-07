import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <div className="animation_loader">
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </div>
  );
}
