import React from "react";
import styles from "./MyMusic.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const MyMusic = () => {
  return (
    <div className={cx("container")}>
      Xin lỗi , tính năng này không được hỗ trợ !
    </div>
  );
};

export default MyMusic;
