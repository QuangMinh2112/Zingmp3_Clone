import React, { useEffect, useRef, useState } from "react";
import styles from "./Singer.module.scss";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { apiGetListArtist } from "../../../apis/music";
import icons from "../../../utils/icons";
import { Section, SongItem, Artists } from "../../../components";
import { Loading } from "../../../components/Library/Audio";
const cx = classNames.bind(styles);
const { BsFillPlayFill, AiOutlineUserAdd } = icons;
const Singer = () => {
  const { singer } = useParams();
  const [artistsData, setArtistsData] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const fetchArtists = async () => {
      const res = await apiGetListArtist(singer);
      setArtistsData(res.data.data);
    };
    fetchArtists();
  }, []);
  useEffect(() => {
    ref?.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  }, [singer]);

  return (
    <>
      {artistsData ? (
        <div className={cx("container")}>
          <div className={cx("wrapper")} ref={ref}>
            <img
              src={artistsData?.cover}
              alt="bgr"
              className={cx("artists_bgr")}
            />
            <div className={cx("info_singer")}>
              <div className={cx("info_singer_wrapper")}>
                <div className={cx("name_singer")}>
                  <span>{artistsData?.name}</span>
                  <span
                    className={cx("play_song_icon")}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                  >
                    <div className={cx("animate_hover")}></div>
                    {isHover && (
                      <span className={cx("isHover", "scale_up_center")}></span>
                    )}
                    <span className={cx("icon")}>
                      <BsFillPlayFill size={35} />
                    </span>
                  </span>
                </div>
                <div className={cx("follow")}>
                  <span>
                    {`${Number(
                      artistsData?.totalFollow?.toFixed(1)
                    ).toLocaleString()}`}{" "}
                    nguời quan tâm
                  </span>
                  <button>
                    <span>
                      <AiOutlineUserAdd size={14} />
                    </span>
                    <span>QUAN TÂM</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("singer_home_content")}>
            {/* <div className={cx("newRelease")}>
          <h3 className={cx("newTitle")}>Mới nhất</h3>
          <div className={cx("card_info")}>
            <img
              src={artistsData?.topAlbum?.thumbnail}
              alt="newSongRelease"
              className={cx("card_images")}
            />
            <div className={cx("card_content")}>
              <span className={cx("ep")} title={artistsData?.topAlbum?.title}>
                {artistsData?.topAlbum?.textType}
              </span>
              <h3 className={cx("title")} title={artistsData?.topAlbum?.title}>
                {artistsData?.topAlbum?.title}
              </h3>
              <span
                className={cx("atists_name")}
                title={artistsData?.topAlbum?.title}
              >
                {artistsData?.topAlbum?.artistsNames}
              </span>
              <span className={cx("date")} title={artistsData?.topAlbum?.title}>
                {artistsData?.topAlbum?.releaseDate}
              </span>
            </div>
          </div>
        </div> */}
            <div className={cx("list_songs")}>
              <h3 className={cx("newTitle")}>Bài Hát Nổi Bật</h3>
              <div className={cx("card_info")}>
                <div className={cx("box_items")}>
                  {artistsData?.sections
                    ?.find((item) => item.sectionType === "song")
                    ?.items?.filter((item, index) => index < 6)
                    ?.map((item) => (
                      <div key={item.encodeId} className={cx("song_item")}>
                        <SongItem
                          thumbnail={item.thumbnail}
                          title={item.title}
                          artists={item.artistsNames}
                          id={item.encodeId}
                          size="img_small"
                          style="border-bottom"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {artistsData?.sections
            ?.filter((item) => item.sectionType === "playlist")
            ?.map((item, index) => (
              <Section key={index} data={item} />
            ))}

          {/* Artists */}
          <div className={cx("artists_favourite")}>
            {artistsData?.sections
              ?.find((item) => item.sectionType === "artist")
              ?.items?.map((item) => (
                <Artists
                  key={item.id}
                  thumbnail={item.thumbnail}
                  name={item.name}
                  totalFollow={item.totalFollow}
                  link={item.link}
                />
              ))}
          </div>
          <div className={cx("artists_biography")}>
            <h3 className={cx("newTitle")}>{`Về ${artistsData?.name}`}</h3>
            <div className={cx("biography")}>
              <img src={artistsData?.thumbnailM} alt="artists" />
              <div className={cx("desc")}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${
                      artistsData?.biography?.length > 295
                        ? artistsData?.biography.slice(0, 295) +
                          "..." +
                          " " +
                          `<span>XEM THÊM</span>`
                        : artistsData?.biography
                    }`,
                  }}
                ></p>
                <div className={cx("modal")}></div>
                <div className={cx("statistic")}>
                  <div className={cx("num_follow")}>
                    <h3>{`${Number(
                      artistsData?.totalFollow?.toFixed(1)
                    ).toLocaleString()}`}</h3>
                    <span>Người quan tâm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "200px" }}></div>
        </div>
      ) : (
        <div className={cx("loading")}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default Singer;
