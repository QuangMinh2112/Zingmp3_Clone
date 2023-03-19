import React from "react";
import styles from "./SearchAllSong.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { converNumber } from "../../../utils/fn";
import SongItem from "../../../components/SongItem/SongItem";
import ListItemSong from "../../../components/ListItemSong/ListItemSong";
import SectionItem from "../../../components/SectionItem/SectionItem";
import { Artists } from "../../../components";
import icons from "../../../utils/icons";
const cx = classNames.bind(styles);
const { BsChevronCompactRight } = icons;
const SearchAllSong = () => {
  const { searchData } = useSelector((state) => state.music);
  console.log(searchData);
  return (
    <div className={cx("container")}>
      <div className={cx("search_info")}>
        <span className={cx("title")}>Nổi bật</span>
        <div className={cx("wrapper_card")}>
          {/* render info artists */}
          {searchData && (
            <div className={cx("card")}>
              <img
                src={searchData.top?.thumbnail}
                alt="artists"
                className={cx(
                  "thumb_artists",
                  `${
                    searchData.top?.objectType === "artist" ||
                    searchData.top?.objectType === "song"
                      ? "border-full"
                      : "thumb_artists"
                  }`
                )}
              />
              <div className={cx("card_info")}>
                <p className={cx("artist")}>
                  {searchData.top?.objectType === "artist" ||
                  searchData.top?.objectType === "song"
                    ? "Nghệ sĩ"
                    : ""}
                </p>
                <span className={cx("name")}>
                  {searchData.top?.title || searchData?.top?.name}
                </span>
                {searchData.top?.objectType === "artist" ||
                  (searchData.top?.objectType === "song" && (
                    <span className={cx("artist")}>
                      {converNumber(searchData?.artists[0]?.totalFollow)} quan
                      tâm
                    </span>
                  ))}
              </div>
            </div>
          )}
          {/* render info artists */}
          {/* render song */}
          {searchData?.songs
            ?.filter((item, index) => index <= 1)
            .map((item, key) => (
              <div key={item.encodeId} style={{ flex: "1" }}>
                <SongItem
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artists={item?.artistsNames}
                  style="bgr_artists"
                  size="img_artists"
                />
              </div>
            ))}
        </div>
      </div>
      <div className={cx("wrapper_song")}>
        <h1 className={cx("title")}>Bài hát</h1>
        <div className={cx("list")}>
          {searchData?.songs
            ?.filter((item, index) => index <= 5)
            .map((item, index) => (
              <div
                className={cx("item", `${index % 2 !== 0 ? "pl-14" : "pr-14"}`)}
                key={item.encodeId}
              >
                <ListItemSong songData={item} isHideNote isHideAlbum />
              </div>
            ))}
        </div>
      </div>
      <div className={cx("wrapper_song")}>
        <div className={cx("title")}>
          <h3>Playlist/Album</h3>
          <span>
            TẤT CẢ <BsChevronCompactRight />
          </span>
        </div>
        <div className={cx("list_item")}>
          {searchData &&
            searchData?.playlists?.length > 0 &&
            searchData.playlists
              .filter((item, index) => index <= 4)
              ?.map((item, index) => (
                <SectionItem
                  key={item.encodeId}
                  title={item?.title}
                  link={item?.link}
                  sortDescription={item?.sortDescription}
                  thumbnailM={item?.thumbnailM}
                  artistsNames={item?.artistsNames}
                  isCheckArtists
                />
              ))}
        </div>
        <div className={cx("wrapper_song")}>
          <div className={cx("title")}>
            <h3>Nghệ Sĩ/OA</h3>
            <span>
              TẤT CẢ <BsChevronCompactRight />
            </span>
          </div>
          <div className={cx("list_item")}>
            {searchData &&
              searchData?.artists?.length > 0 &&
              searchData.artists
                .filter((item, index) => index <= 4)
                ?.map((item, index) => (
                  <Artists
                    key={item.id}
                    thumbnail={item.thumbnail}
                    name={item.name}
                    totalFollow={item.totalFollow}
                    link={item.link}
                  />
                ))}
          </div>
        </div>
      </div>
      <div style={{ height: "500px" }}></div>
    </div>
  );
};

export default SearchAllSong;
