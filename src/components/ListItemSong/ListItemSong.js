import React, { memo } from "react";
import styles from "./ListItemSong.module.scss";
import classNames from "classnames/bind";
import icons from "../../utils/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  play,
  playAlbum,
  setCurrentSongId,
  setRecentSong,
} from "../../store/actions/musicAction";
const cx = classNames.bind(styles);
const { BsMusicNoteBeamed } = icons;
const ListItemSong = ({ songData, isHideAlbum, isHideNote, order }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={cx("container")}
      onClick={() => {
        dispatch(setCurrentSongId(songData?.encodeId));
        dispatch(play(true));
        dispatch(playAlbum(true));
        dispatch(
          setRecentSong({
            thumbnail: songData?.thumbnail,
            title: songData?.title,
            id: songData?.encodeId,
            artists: songData?.artistsNames,
          })
        );
      }}
    >
      <div className={cx("info")}>
        {order && (
          <span
            className={cx(
              "num_order",
              `${
                order === 1
                  ? "blue_number"
                  : order === 2
                  ? "green_number"
                  : order === 3
                  ? "orange_number"
                  : "default_color_number"
              }`
            )}
          >
            {order}
          </span>
        )}
        {!isHideNote && (
          <span>
            <BsMusicNoteBeamed />
          </span>
        )}
        <img src={songData?.thumbnail} alt="thumbnail" />
        <span className={cx("info_media")}>
          <span style={{ fontSize: "14px", fontWeight: "700" }}>
            {songData?.title?.length > 7
              ? `${songData?.title?.slice(0, 8)}..`
              : songData?.title}
          </span>
          <span style={{ fontSize: "12px", opacity: "0.7" }}>
            {songData?.artistsNames?.length > 8
              ? `${songData?.artistsNames?.slice(0, 8)}..`
              : songData?.artistsNames}
            {/* {songData?.artistsNames} */}
          </span>
        </span>
      </div>
      {!isHideAlbum && (
        <div className={cx("album")}>
          {songData?.album?.title?.length > 15
            ? `${songData?.album?.title?.slice(0, 15)}..`
            : songData?.album?.title}
        </div>
      )}
      <div className={cx("date_time")}>
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(ListItemSong);
