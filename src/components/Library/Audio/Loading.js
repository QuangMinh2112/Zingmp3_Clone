import React, { memo } from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loading = () => {
  return (
    <ThreeCircles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export default memo(Loading);
