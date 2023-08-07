import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function PulsateAnimation() {
  const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <div className="pulsate_animation">
        {skeletonCount.map((_, item) => (
          <Stack key={item} spacing={1} className="rectangular_ske">
            <Skeleton variant="rectangular" />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </Stack>
        ))}
      </div>
    </>
  );
}
