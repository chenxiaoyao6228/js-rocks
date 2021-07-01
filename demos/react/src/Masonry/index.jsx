import { useState, useEffect, useRef } from "react";
import { partial } from "lodash";
import Masonry from "react-masonry-css";
import { Button, Modal, Input, Checkbox } from "antd";
import ReactLoading from "react-loading";
import { useInViewport } from "ahooks";
import fetchPhotos from "./fetchPhoto";
import "./index.css";

function MasonryDemo() {
  const [visible, setVisible] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [checkedIndexes, setCheckedIndexes] = useState([]);

  //   useEffect(() => {
  //     const getPhotos = async () => {
  //       let photos = await fetchPhotos();
  //       setPhotos(photos);
  //     };
  //     getPhotos();
  //   }, []);

  // onLoadMore
  const ref = useRef();
  const inViewPort = useInViewport(ref);
  if (inViewPort) {
    const getPhotos = async () => {
      let newPhotos = await fetchPhotos();
      console.log("newPhotos", newPhotos);
      setPhotos([...photos, ...newPhotos]);
    };
    getPhotos();
  }

  const handleChange = (index, e) => {
    let findIndex = checkedIndexes.indexOf(index);
    if (findIndex === -1) {
      checkedIndexes.push(index);
      setCheckedIndexes([...checkedIndexes]);
    } else {
      checkedIndexes.splice(findIndex, 1);
      setCheckedIndexes([...checkedIndexes]);
    }
  };

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>showModal</Button>
      <br></br>
      <Modal
        title={`insert photos(${checkedIndexes.length})`}
        visible={visible}
        width="600px"
        className="modal"
        onOk={() => setVisible(!visible)}
      >
        <div className="input-wrapper">
          <Input placeholder="Basic usage" value={searchKey} />
        </div>
        <div className="masonry-container">
          <Masonry
            breakpointCols={5}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {photos.map((photo, index) => {
              return (
                <div className="item-container" key={index}>
                  <Checkbox
                    className="item-checkbox"
                    onChange={partial(handleChange, index)}
                  ></Checkbox>
                  {/* <div
                    className="img active"
                    style={{
                      backgroundImage: "url(" + photo.currentSrc + ")",
                    }}
                  ></div> */}
                  <img
                    src={photo.currentSrc || "./images/placeholder.png"}
                    className="img active"
                  ></img>
                </div>
              );
            })}
          </Masonry>
          <div className="loading-wrapper" ref={ref}>
            <ReactLoading color="#000000"></ReactLoading>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MasonryDemo;
