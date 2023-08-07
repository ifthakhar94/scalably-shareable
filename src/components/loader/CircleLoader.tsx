import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const CircleLoader = ({ width, height }: any) => {
  return (
    <>
      <div className="loader_skeleton">
        <Skeleton variant="circular" width={width} height={height} />
      </div>
    </>
  );
};

export default CircleLoader;
