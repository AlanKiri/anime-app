import { observer } from "mobx-react-lite";
import { NavigationBar } from "../../Components";
import ImageBoard from "../../Components/ImageBoard/ImageBoard";

const Main = observer(() => {
  return (
    <div>
      <NavigationBar />
      <ImageBoard />
      {/* {images?.images && images?.images.map((image) => <img src={image.url} style={{ width: 100, height: 300 }}></img>)} */}
    </div>
  );
});

export default Main;
