import React from "react";
import styles from "./Radio.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Radio = () => {
  return (
    <div className={cx("container")}>
      Xin lỗi , tính năng này không được hỗ trợ !
    </div>
  );
};

export default Radio;
