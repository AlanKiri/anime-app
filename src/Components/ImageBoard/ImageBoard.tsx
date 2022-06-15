import { observer } from "mobx-react-lite";
import {  useContext, useEffect, useRef } from "react";
import { Store } from "../../Stores/store";
import Styles from "./Styles.module.scss";
import LazyLoad from "react-lazyload";
import Masonry from "react-masonry-css";


const ImageBoard = observer(() => {
  const { queryStore } = useContext(Store);
  const { isGIF, isSFW, tags, images } = queryStore;
  const ref = useRef<HTMLImageElement>(null);

  const breakpointColumnsObj = {
    default: 6,
    1000: 3,
    700: 2,
    500: 1,
  };

  const getImages = async () => {
    await queryStore.getRandomImages();
  };

  useEffect(() => {
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGIF, isSFW, tags]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = (e: any) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(e.target.documentElement.scrollTop + window.innerHeight);
    if (currentHeight + 1 >= scrollHeight) {
      queryStore.expandRandomImages();
    }
  };


  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid">
      {images &&
        images.map((image) => (
          <div className={Styles.container}>
            {/* <LazyLoad width={ref.current?.width! - 30}> */}
              <img
                ref={ref}
                src={image.url}
                alt={image.image_id}
                className={Styles.image}
              />
            {/* </LazyLoad> */}
          </div>
        ))}
    </Masonry>
  );
});
export default ImageBoard;
