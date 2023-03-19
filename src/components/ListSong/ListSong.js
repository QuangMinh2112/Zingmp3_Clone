import React, { memo } from "react";
import styles from "./ListSong.module.scss";
import classNames from "classnames/bind";
import { ListItemSong } from "../ListItemSong";
import moment from "moment";
import icons from "../../utils/icons";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);
const { BsDot } = icons;
const ListSong = ({ totalDuration, isHideAlbum, isHideTime }) => {
  const { songs } = useSelector((state) => state.music);

  return (
    <div className={cx("container")}>
      <div className={cx("media_header", `${isHideTime && "mb"}`)}>
        <span className={cx(isHideTime && "font")}>Bài hát</span>
        {!isHideAlbum && <span>Album</span>}
        {!isHideTime && <span>Thời gian</span>}
      </div>
      <div className={cx("listSong_container")}>
        {songs?.map((item) => (
          <ListItemSong key={item.encodeId} songData={item} isHideNote />
        ))}
      </div>
      {totalDuration && (
        <h5>
          <span>{`${songs?.length} bài hát`}</span>
          <BsDot />
          <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
        </h5>
      )}
    </div>
  );
};

export default memo(ListSong);
