import React, { memo } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Button = ({ text, styleCustom, handleClick }) => {
  return (
    <button
      className={cx(`${styleCustom ? styleCustom : "btns"}`)}
      onClick={handleClick}
    >
      {text && <span>{text}</span>}
    </button>
  );
};

export default memo(Button);
