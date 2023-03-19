import React, { useState } from "react";
import styles from "./SectionItem.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import icons from "../../utils/icons";

const { BsFillPlayFill, BiHeart, BsThreeDots } = icons;
const cx = classNames.bind(styles);

const SectionItem = ({
  link,
  title,
  thumbnailM,
  artistsNames,
  data,
  sortDescription,
  isCheckArtists,
  infoArtists,
}) => {
  const i4Artists = infoArtists?.map((item) => item.name);
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const imageRef = useRef();
  const handleHover = () => {
    setIsHover(true);
    imageRef.current.classList.remove(cx("scale_down_images"));
    imageRef.current.classList.add(cx("scale_up_images"));
  };
  const handleLeaveHover = () => {
    setIsHover(false);
    imageRef.current.classList.remove(cx("scale_up_images"));
    imageRef.current.classList.add(cx("scale_down_images"));
  };
  return (
    <div
      className={cx("item")}
      onClick={() =>
        navigate(link.split(".")[0], { state: { playAlbum: false } })
      }
    >
      <div
        className={cx("img_section")}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeaveHover}
      >
        {isHover && (
          <div className={cx("hover")}>
            <span>
              <BiHeart size={25} />
            </span>
            <span>
              <BsFillPlayFill
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(link.split(".")[0], {
                    state: { playAlbum: true },
                  });
                }}
                size={35}
              />
            </span>
            <span>
              <BsThreeDots size={25} />
            </span>
          </div>
        )}
        <img src={thumbnailM} alt="images" ref={imageRef} />
      </div>
      <span className={cx("box_title")}>
        <span style={{ fontWeight: "bold" }}>
          {title?.length >= 15 ? `${title?.slice(0, 15)}...` : title}
        </span>
        <span style={{ fontSize: "14px", color: "var(--text-gray)" }}>
          {data?.sectionId === "h100" || isCheckArtists ? (
            <span>{artistsNames}</span>
          ) : data?.sectionType === "playlist" ? (
            <span>{`${
              i4Artists?.toString().length >= 25
                ? `${i4Artists?.toString().slice(0, 25)}...`
                : i4Artists?.toString()
            }`}</span>
          ) : (
            <span>
              {sortDescription?.length >= 40
                ? `${sortDescription?.slice(0, 40)}...`
                : sortDescription}
            </span>
          )}
        </span>
      </span>
    </div>
  );
};

export default SectionItem;
