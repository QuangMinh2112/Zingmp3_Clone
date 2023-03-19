import React, { useEffect, useState } from "react";
import styles from "./Album.module.scss";
import classNames from "classnames/bind";
import moment from "moment";
import { useLocation, useParams } from "react-router-dom";
import { apiGetDetailPlaylist } from "../../../apis/music";
import { ListSong } from "../../../components/ListSong";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import {
  loading,
  play,
  setCurAlbumId,
  setCurrentSongId,
  setPlaylist,
} from "../../../store/actions/musicAction";
import icons from "../../../utils/icons";
import { AudioLoading } from "../../../components/Library/Audio";

const { BsPlayCircle } = icons;
const cx = classNames.bind(styles);

const Album = () => {
  const { id } = useParams();
  const [playListData, setPlayListData] = useState({});
  const { currentSongId, isPlaying } = useSelector((state) => state.music);
  const location = useLocation();
  //Redux
  const dispatch = useDispatch();
  //end redux
  useEffect(() => {
    dispatch(setCurAlbumId(id));
    const fetchDetailPlayList = async () => {
      dispatch(loading(true));
      const res = await apiGetDetailPlaylist(id);
      dispatch(loading(false));

      if (res.data.err === 0) {
        setPlayListData(res.data?.data);
        dispatch(setPlaylist(res?.data?.data?.song?.items));
      }
    };

    fetchDetailPlayList();
  }, [id]);

  useEffect(() => {
    if (location.state?.playAlbum) {
      const ramdomSong =
        Math.round(Math.random() * playListData?.song?.items?.length) - 1;
      dispatch(
        setCurrentSongId(playListData?.song?.items[ramdomSong]?.encodeId)
      );
      dispatch(play(true));
    }
  }, [id, playListData]);
  return (
    <div className={cx("container")}>
      <div className={cx("thumbnail")}>
        <div className={cx("thumbnail_wrapper")}>
          <img
            src={playListData?.thumbnail}
            alt="thumbnail"
            className={cx(`${isPlaying ? "img_border_radius" : "img"}`)}
          />
          <div className={cx(`${isPlaying ? "icon_border_radius" : "icon"}`)}>
            {isPlaying ? <AudioLoading /> : <BsPlayCircle size={30} />}
          </div>
        </div>

        <h3 className={cx("title")}>{playListData?.title}</h3>
        <div className={cx("content")}>
          <span className={cx("lastUpdate")}>
            <span>Cập nhật: </span>
            <span>
              {moment
                .unix(playListData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </span>
          <span>{playListData?.artistsNames}</span>
          <span>{`${Math.round(
            playListData?.like / 1000
          )} K nguời yêu thích`}</span>
        </div>
      </div>
      <Scrollbars style={{ width: "100%", height: "78%" }}>
        <div className={cx("playlist")}>
          <span className={cx("playlist_title")}>
            <span className={cx("t1")}>Lời tựa </span>
            <span className={cx("desc")}>{playListData?.sortDescription}</span>
          </span>

          <ListSong totalDuration={playListData?.song?.totalDuration} />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;
