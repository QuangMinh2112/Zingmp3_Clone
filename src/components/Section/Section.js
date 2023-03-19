import React, { memo } from "react";
import styles from "./Section.module.scss";
import classNames from "classnames/bind";
import icons from "../../utils/icons";
import SectionItem from "../SectionItem/SectionItem";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

const { BsChevronRight } = icons;
const Section = ({ data, isCheckStylePadding, isCheckSeeAll }) => {
  const { currentWidth } = useSelector((state) => state.app);
  return (
    <div className={cx(`${isCheckStylePadding ? "pd_0" : "container"}`)}>
      <div className={cx("title")}>
        <h3>{data?.title}</h3>
        {data === null
          ? ""
          : !isCheckSeeAll && (
              <span className={cx("see_all")}>
                TẤT CẢ <BsChevronRight size={18} />
              </span>
            )}
      </div>
      <div className={cx("list_item")}>
        {data &&
          data?.items?.length > 0 &&
          data.items
            .filter((item, index) => index <= (currentWidth <= 1000 ? 3 : 4))
            ?.map((item, index) => (
              <SectionItem
                key={item.encodeId}
                data={data}
                title={item.title}
                link={item.link}
                sortDescription={item.sortDescription}
                thumbnailM={item.thumbnailM}
                artistsNames={item.artistsNames}
                infoArtists={item.artists}
              />
            ))}
      </div>
    </div>
  );
};

export default memo(Section);
