import React, { useEffect, useRef, useState } from "react";
import styles from "./PlaySong.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { apiGetSong, apiGetSongDetails } from "../../apis/music";
import icons from "../../utils/icons";
import {
  play,
  setCurrentSongId,
  setCurSongData,
} from "../../store/actions/musicAction";
import moment from "moment";
import { toast } from "react-toastify";
import { AudioLoadingSong } from "../Library/Audio";
const cx = classNames.bind(styles);
const {
  BsFillPauseFill,
  BsFillPlayFill,
  BiHeart,
  MdSkipPrevious,
  MdSkipNext,
  CiShuffle,
  CiRepeat,
  BsThreeDots,
  TbRepeatOnce,
  BsMusicNoteList,
  SlVolume1,
  SlVolumeOff,
  SlVolume2,
} = icons;

var intervalId;
const PlaySong = ({ setIsShowSidebarRight, isShowSidebarRight }) => {
  const { currentSongId, isPlaying, songs } = useSelector(
    (state) => state.music
  );
  const [audio, setAudio] = useState(new Audio());
  const [songDetails, setSongDetails] = useState(null);
  const [isShuffe, setIsShuffe] = useState(false);
  const [curSeconds, setCurSeconds] = useState(0);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [volume, setVolume] = useState(100);
  const thumbRef = useRef();
  const trackRef = useRef();
  const volumeRef = useRef();
  const dispath = useDispatch();
  useEffect(() => {
    const fetchDetailsSong = async () => {
      setIsLoading(false);
      const [res1, res2] = await Promise.all([
        apiGetSongDetails(currentSongId),
        apiGetSong(currentSongId),
      ]);
      setIsLoading(true);
      if (res1.data.err === 0) {
        setSongDetails(res1.data.data);
        setCurSeconds(0);
        dispath(setCurSongData(res1.data.data));
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispath(play(false));
        toast.warn(res2.data.msg);
        setCurSeconds(0);
        thumbRef.current.style.cssText = `right:100%`;
      }
    };
    fetchDetailsSong();
  }, [currentSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying && thumbRef.current) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songDetails?.duration) / 100;
        thumbRef.current.style.cssText = `right:${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);
  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);
  useEffect(() => {
    if (volumeRef.current) {
      volumeRef.current.style.cssText = `right:${100 - volume}%`;
    }
  }, [volume]);
  useEffect(() => {
    const handleEnded = () => {
      if (isShuffe) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispath(play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffe, repeatMode]);
  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispath(play(false));
    } else {
      audio.play();
      dispath(play(true));
    }
  };
  const handleClickProgressBar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right:${100 - percent}%`;
    audio.currentTime = (percent * songDetails.duration) / 100;
    setCurSeconds(Math.round((percent * songDetails.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      let curentSongIndex;
      songs?.forEach((item, index) => {
        if (item?.encodeId === currentSongId) curentSongIndex = index;
      });
      dispath(setCurrentSongId(songs[curentSongIndex + 1]?.encodeId));
      dispath(play(true));
    }
  };
  const handlePrevSong = () => {
    if (songs) {
      let curentSongIndex;
      songs?.forEach((item, index) => {
        if (item?.encodeId === currentSongId) curentSongIndex = index;
      });
      dispath(setCurrentSongId(songs[curentSongIndex - 1]?.encodeId));
      dispath(play(true));
    }
  };
  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs.length) - 1;
    dispath(setCurrentSongId(songs[randomIndex]?.encodeId));
    dispath(play(true));
  };
  const handleRepeatOne = () => {
    setTimeout(() => {
      audio.play();
    }, 3000);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("details_song")}>
        <img
          src={songDetails?.thumbnail}
          alt="thumbnail"
          className={cx("thumbnail")}
        />
        <div className={cx("artistsNames_details")}>
          <span className={cx("title")}>{songDetails?.title}</span>
          <span className={cx("artistsNames")}>
            {songDetails?.artistsNames}
          </span>
        </div>
        <div className={cx("icons")}>
          <span>
            <BiHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className={cx("main")}>
        <div className={cx("main__icons")}>
          <span
            title="Bật phát ngẫu nhiên"
            onClick={() => setIsShuffe((prev) => !prev)}
            className={cx(`${isShuffe ? "purple" : "black"}`)}
          >
            <CiShuffle size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={cx(`${!songs ? "color" : "cur"}`)}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span className={cx("play_song")} onClick={handleTogglePlayMusic}>
            {!isLoading ? (
              <AudioLoadingSong />
            ) : isPlaying ? (
              <BsFillPauseFill size={25} />
            ) : (
              <BsFillPlayFill size={25} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={cx(`${!songs ? "color" : "cur"}`)}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            title="Bật phát lại tất cả"
            className={cx(`${repeatMode ? "purple" : "black"}`)}
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
          >
            {repeatMode === 1 ? (
              <TbRepeatOnce size={24} />
            ) : (
              <CiRepeat size={24} />
            )}
          </span>
        </div>
        <div className={cx("progress_bar")}>
          <span>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
          <div
            className={cx("progress_bar__container")}
            onClick={handleClickProgressBar}
            ref={trackRef}
          >
            <div ref={thumbRef} className={cx("progress_bar__children")}></div>
          </div>
          <span>
            {" "}
            {moment.utc(songDetails?.duration * 1000).format("mm:ss")}
          </span>
        </div>
      </div>
      <div className={cx("volume_song")}>
        <div
          className={cx("volume_control")}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <span onClick={() => setVolume((prev) => (prev === 0 ? 70 : 0))}>
            {+volume >= 50 ? (
              <SlVolume2 />
            ) : +volume === 0 ? (
              <SlVolumeOff />
            ) : (
              <SlVolume1 />
            )}
          </span>

          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className={cx("volume", `${isHover ? "inline" : "dbn"}`)}
          />
          <div className={cx("duration_bar", `${isHover ? "dbn" : "prt"}`)}>
            <div ref={volumeRef} className={cx("slider")}></div>
          </div>
        </div>
        <span
          className={cx(
            "note_list",
            `${isShowSidebarRight ? "bg_green" : "bg_black"}`
          )}
          onClick={() => setIsShowSidebarRight((prev) => !prev)}
        >
          <BsMusicNoteList />
        </span>
      </div>
    </div>
  );
};

export default PlaySong;
