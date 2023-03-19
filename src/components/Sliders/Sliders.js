import React, { useCallback, useEffect, useState } from "react";
import styles from "./Slider.module.scss";
import classNames from "classnames/bind";

import { useDispatch, useSelector } from "react-redux";
import { getArrSlider } from "../../utils/fn";
import {
  play,
  setCurrentSongId,
  setPlaylist,
} from "../../store/actions/musicAction";
import { useNavigate } from "react-router-dom";
import icons from "../../utils/icons";
import Button from "../Button/Button";

const cx = classNames.bind(styles);
const { MdArrowBackIosNew, MdArrowForwardIos } = icons;

var intervalId;
const Sliders = () => {
  const itemCss = {
    slideRight: "slide-right",
    slideLeft: "slide-left",
    slideLeft2: "slide-left2",
    order_last: "order-last",
    order_first: "order-first",
    order_2: "order-2",
    z_20: "z-20",
    z_10: "z-10",
  };
  const { banner, currentWidth } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [max, setMax] = useState(2);
  const [min, setMin] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const [hideBtn, setHideBtn] = useState(false);
  //handle even
  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(setCurrentSongId(item.encodeId));
      dispatch(play(true));
      dispatch(setPlaylist(null));
    } else if (item?.type === 4 || item?.type === 3) {
      const path = item?.link?.split(".")[0];
      navigate(path);
    } else {
      dispatch(setPlaylist(null));
    }
  };
  useEffect(() => {
    if (isAuto) {
      intervalId = setInterval(() => {
        handleAnimationBanner(1);
      }, 5000);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [
    itemCss.slideLeft2,
    itemCss.slideLeft,
    itemCss.slideRight,
    itemCss.order_2,
    itemCss.order_first,
    itemCss.order_last,
    itemCss.z_10,
    itemCss.z_20,
    min,
    max,
    currentWidth,
    isAuto,
  ]);
  const handleAnimationBanner = (step) => {
    const sliderItem = document.getElementsByClassName(cx("slider_images"));
    const list = getArrSlider(min, max, sliderItem.length - 1);
    for (let i = 0; i < sliderItem.length; i++) {
      sliderItem[i].classList.remove(
        cx(itemCss.slideRight),
        cx(itemCss.order_last),
        cx(itemCss.z_20)
      );
      sliderItem[i].classList.remove(
        cx(itemCss.slideLeft),
        cx(itemCss.order_first),
        cx(itemCss.z_20)
      );
      sliderItem[i].classList.remove(
        cx(itemCss.slideLeft2),
        cx(itemCss.order_2),
        cx(itemCss.z_10)
      );

      if (list.some((item) => item === i)) {
        sliderItem[i].style.cssText = `display:block`;
      } else {
        sliderItem[i].style.cssText = `display:none`;
      }
    }
    list.forEach((item) => {
      if (item === max) {
        sliderItem[item]?.classList.add(
          cx(itemCss.slideRight),
          cx(itemCss.order_last),
          cx(itemCss.z_20)
        );
      } else if (item === min) {
        sliderItem[item]?.classList.add(
          cx(itemCss.slideLeft),
          cx(itemCss.order_first),
          cx(itemCss.z_20)
        );
      } else {
        sliderItem[item]?.classList.add(
          cx(itemCss.slideLeft2),
          cx(itemCss.order_2),
          cx(itemCss.z_10)
        );
      }
    });
    if (step === 1) {
      setMin((prev) => (prev === sliderItem.length - 1 ? 0 : prev + step));
      setMax((prev) => (prev === sliderItem.length - 1 ? 0 : prev + step));
    }
    if (step === -1) {
      setMin((prev) => (prev === 0 ? sliderItem.length - 1 : prev + step));
      setMax((prev) => (prev === 0 ? sliderItem.length - 1 : prev + step));
    }
  };

  const handleBackBanner = useCallback(
    (step) => {
      intervalId && clearInterval(intervalId);
      setIsAuto(false);
      handleAnimationBanner(step);
    },
    [min, max]
  );
  return (
    <div className={cx("container")}>
      {hideBtn && (
        <Button
          text={<MdArrowBackIosNew size={30} />}
          styleCustom="btn_back"
          handleClick={() => handleBackBanner(1)}
        />
      )}

      <div className={cx("wrapper")}>
        {banner?.map((item, index) => (
          <img
            src={item.banner}
            key={item.banner}
            alt="slider"
            onClick={() => handleClickBanner(item)}
            onMouseEnter={() => setHideBtn(true)}
            onMouseLeave={() => {
              setIsAuto(true);
              // setHideBtn(false);
            }}
            className={cx("slider_images", `${index <= 2 ? "db" : "dbn"}`)}
          />
        ))}
      </div>
      {hideBtn && (
        <Button
          text={<MdArrowForwardIos size={30} />}
          styleCustom="btn_next"
          handleClick={() => handleBackBanner(-1)}
        />
      )}
    </div>
  );
};

export default Sliders;
