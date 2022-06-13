import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Store } from "../../Stores/store";
import Styles from "./Styles.module.scss";
import LazyLoad from "react-lazyload";

const ImageBoard = observer(() => {
  const { queryStore } = useContext(Store);
  const { isGIF, isSFW, tags, images } = queryStore;
  const ref = useRef(null);

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
    <Container>
      <Row>
        {images &&
          images.map((image) => (
            <Col xs={12} sm={6} md={4} lg={3}>
              <LazyLoad width={ref.current?.width - 30}>
                <Image ref={ref} src={image.url} alt={image.image_id} className={Styles.image} />
              </LazyLoad>
            </Col>
          ))}
      </Row>
    </Container>
  );
});
export default ImageBoard;
