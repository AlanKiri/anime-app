import { useState, useContext } from "react";
import Styles from "./Styles.module.scss";
import Tag from "../../Assets/tag.svg";
import TagModal from "../TagModal/TagModal";
import { observer } from "mobx-react-lite";
import { Store } from "../../Stores/store";

const NavigationBar = observer(() => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { queryStore } = useContext(Store);
  const { isGIF, addTag, isSFW, setIsSFW, setIsGIF, tags } = queryStore;

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.row}>
          <div className={Styles.left}>
            <h2 className={Styles.logo}>
              MyAnime<span className={Styles.marked}>PFP</span>
            </h2>
            <div className={Styles.toggles}>
              <h5
                className={isSFW ? Styles.bold : 0}
                onClick={() => {
                  setIsSFW(true);
                }}
              >
                SFW
              </h5>
              <h5
                className={!isSFW ? Styles.bold : 0}
                onClick={() => {
                  setIsSFW(false);
                }}
              >
                NSFW
              </h5>
              <h5
                className={isGIF ? Styles.bold : 0}
                onClick={() => {
                  setIsGIF(!isGIF);
                }}
              >
                GIF
              </h5>
            </div>
            <div className={Styles.tags} onClick={handleShow}>
              {/* @ts-ignore */}
              <img src={Tag} alt="tag icon" className={Styles.tagIcon} />
              <h4 className={Styles.tagText}>Tags</h4>
            </div>
          </div>
        </div>
      </div>
      <TagModal handleClose={handleClose} handleShow={handleShow} show={show} />
    </>
  );
});

export default NavigationBar;
