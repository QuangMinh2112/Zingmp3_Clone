import React, { useState } from "react";
import styles from "./Artists.module.scss";
import classNames from "classnames/bind";
import icons from "../../utils/icons";
import { converNumber } from "../../utils/fn";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const { AiOutlineUserAdd } = icons;
const Artists = ({ thumbnail, name, totalFollow, link, isHideBtn }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={cx("container")}>
      <Link
        className={cx("img")}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        to={link}
      >
        <img
          src={thumbnail}
          alt="Artitsts"
          className={cx(
            "thumb_nail",
            `${isHover ? "scale_up_images" : "scale_down_images"}`
          )}
        />
        {isHover && <div className={cx("s")}></div>}
      </Link>
      <div className={cx("info")}>
        <Link to={link}>{name}</Link>

        <span>{converNumber(totalFollow)} quan tâm</span>
        {!isHideBtn && (
          <button>
            <span>
              <AiOutlineUserAdd size={14} />
            </span>
            <span>QUAN TÂM</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Artists;
