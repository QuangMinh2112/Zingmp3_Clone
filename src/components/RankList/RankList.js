import React, { memo, useEffect, useState } from "react";
import styles from "./RankList.module.scss";
import classNames from "classnames/bind";
import ListItemSong from "../ListItemSong/ListItemSong";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const RankList = ({ data, number, link, isHideBtn }) => {
  const [isShowFullSong, setIsShowFullSong] = useState(false);
  const [songs, setSongs] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isShowFullSong) {
      setSongs(data?.filter((item, index) => index < number));
    } else {
      setSongs(data);
    }
  }, [isShowFullSong, data]);
  return (
    <div className={cx("container")}>
      {songs?.map((item, index) => (
        <ListItemSong
          songData={item}
          key={item.encodeId}
          isHideNote
          order={index + 1}
          isHideAlbum
        />
      ))}
      <div className={cx("top100")}>
        {isShowFullSong ? (
          ""
        ) : !isHideBtn ? (
          <button
            onClick={() =>
              link
                ? navigate(link?.split(".")[0])
                : setIsShowFullSong((prev) => !prev)
            }
          >
            Xem top 100
          </button>
        ) : (
          <div style={{ height: "100px" }}></div>
        )}
      </div>
    </div>
  );
};

export default memo(RankList);
