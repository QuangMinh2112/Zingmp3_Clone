import React from "react";
import styles from "./Advertisement.module.scss";
import classNames from "classnames/bind";
import listAdvertisement from "../../assets/advertisement/index";
const cx = classNames.bind(styles);

const Advertisement = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        {listAdvertisement?.map((item) => (
          <div className={cx("item")} key={item.id}>
            <img src={item.img} alt="advertisement" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;
