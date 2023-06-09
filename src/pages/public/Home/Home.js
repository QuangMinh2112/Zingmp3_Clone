import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import {
  Advertisement,
  Artists,
  ChartSection,
  NewRelease,
  Section,
  Sliders,
} from "../../../components";
import { Link } from "react-router-dom";
import { Loading } from "../../../components/Library/Audio";
import Slider from "react-slick";
const cx = classNames.bind(styles);

const Home = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  const {
    friday,
    newSongEveryDay,
    top100,
    xone,
    newMusic,
    weekChart,
    singers,
    playlist,
    womanMusic,
  } = useSelector((state) => state.app);
  console.log(newMusic);
  return (
    <>
      {newMusic && playlist && top100 && weekChart && womanMusic ? (
        <div className={cx("container")}>
          <Sliders />
          <Section data={womanMusic} />
          {/* <Section data={friday} /> */}
          <Section data={playlist} />
          <NewRelease />
          {xone && <Section data={xone} />}
          {newSongEveryDay && <Section data={newSongEveryDay} />}
          <ChartSection />
          <div className={cx("weeChart")}>
            {weekChart?.map((item) => (
              <Link
                to={item?.link.split(".")[0]}
                key={item.link}
                className={cx("link")}
              >
                <img src={item.cover} alt="" className={cx("images_rank")} />
                {/* {isHover && <div className={cx("s")}></div>} */}
              </Link>
            ))}
          </div>
          {singers && (
            <div className={cx("artistSpotlight")}>
              <Slider {...settings}>
                {singers?.map((item) => (
                  <div key={item.id} className={cx("artist_item")}>
                    <Artists
                      thumbnail={item.thumbnail}
                      name={item.name}
                      totalFollow={item.totalFollow}
                      link={item.link}
                      isHideBtn
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}

          <Section data={top100} />
          <Section data={newMusic} />
          <Advertisement />
          <div style={{ width: "100%", height: "500px" }}></div>
        </div>
      ) : (
        <div className={cx("loading")}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default Home;
