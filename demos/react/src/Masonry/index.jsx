import { useState, useEffect, useRef } from "react";
import { partial } from "lodash";
import Masonry from "react-masonry-css";
// import Masonry from "./masonry.js";
import { Button, Modal, Input, Checkbox, Skeleton } from "antd";
import ReactLoading from "react-loading";
import { useThrottleFn, useKeyPress, useSize } from "ahooks";
import fetchPhotos from "./fetchPhoto";
import "./index.css";

const HALF_SCREEN = document.body.clientHeight / 2;
const DEFAULT_SEARCH_KEYWORD = "cat";
const COLUMN_COUNT = 6;

import { useModalSize } from "./hooks";

function MasonryDemo() {
  const [searchKey, setSearchKey] = useState("");

  // data, error, loading
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageObj, setPageObj] = useState({
    page: 1,
    totalPage: 10,
  });

  //ref
  const inputRef = useRef();
  const masonryRef = useRef();
  const modalRef = useRef(document.querySelector("#masonry-modal"));

  // modal
  const { modalWidth, modalHeight } = useModalSize();
  useEffect(() => {
    if (!masonryRef.current) return;
    masonryRef.current.style.height = modalHeight + "px";
  });

  const [visible, setVisible] = useState(false);
  const [checkedIndexes, setCheckedIndexes] = useState([]);
  const [focusedIndex, setFocusIndex] = useState(-1);
  const [loadedIndexes, setLoadedIndexes] = useState([]);

  const heightOfColumn = useState(new Array(COLUMN_COUNT).fill(0));

  const triggerSearch = () => {
    setPhotos([]);
    console.log("searching: ", searchKey);
    getData({
      ...pageObj,
      ...{ key: searchKey, page: 1 },
    });
  };

  // 滚动的时候更改元素选中, 默认为第一个
  useKeyPress("ArrowUp", () => {
    if (focusedIndex == 0) return;
    if (focusedIndex < COLUMN_COUNT) {
      setFocusIndex(0);
    } else {
      setFocusIndex(focusedIndex - COLUMN_COUNT);
    }
  });
  useKeyPress("ArrowDown", () => {
    setFocusIndex(focusedIndex + COLUMN_COUNT);
  });
  useKeyPress("ArrowLeft", () => {
    setFocusIndex(focusedIndex - 1);
  });
  useKeyPress("ArrowRight", () => {
    setFocusIndex(focusedIndex + 1);
  });

  useKeyPress("Enter", () => {
    console.log("document.activeElement", document.activeElement);
    console.log("inputRef.current", inputRef.current);
    console.log("masonryRef.current", masonryRef.current);
    if (document.activeElement === inputRef.current.input) {
      inputRef.current.input.blur();
      masonryRef.current.focus();
      triggerSearch();
      setTimeout(() => {
        console.log("document.activeElement", document.activeElement);
      }, 1000);
    } else {
      check(focusedIndex);
    }
  });

  const loadImageSize = (imageList = []) => {
    if (!imageList.length) return;
    return new Promise((resolve, reject) => {
      const length = imageList.length;
      let count = 0;
      const load = (index) => {
        let imgEle = new Image();
        const checkIfFinished = () => {
          count++;
          if (count === length) {
            resolve(imageList);
          }
        };
        imgEle.onload = () => {
          imageList[index] = {
            ...imageList[index],
            originHeight: imgEle.height,
            originWidth: imgEle.width,
          };
          checkIfFinished();
        };
        imgEle.onerror = () => {
          heights[index] = 0;
          checkIfFinished();
        };
        imgEle.src = imageList[index].currentSrc;
      };
      imageList.forEach((img, index) => load(index));
    });
  };

  // 预设关键字搜索
  useEffect(() => {
    setSearchKey(DEFAULT_SEARCH_KEYWORD);
    triggerSearch();
  }, [visible]);

  const hasReachedBottom = () => {
    let element = masonryRef.current;
    return (
      element.scrollHeight -
        Math.abs(element.scrollTop) -
        element.clientHeight <
      HALF_SCREEN
    );
  };

  const loadMore = () => {
    if (hasReachedBottom()) {
      if (pageObj.page === pageObj.totalPage) return;
      getData({ ...pageObj, key: searchKey, page: pageObj.page + 1 });
    }
  };

  const { run: handleScroll, cancel } = useThrottleFn(
    () => {
      loadMore();
    },
    {
      waiting: 300,
    }
  );

  const getData = (payload) => {
    console.log("payload", payload);
    // loading
    if (loading) return;
    setLoading(true);
    fetchPhotos(payload)
      .then((newPhotos) => {
        // 处理pageObj
        setPageObj({
          ...pageObj,
          page: pageObj.page + 1,
          key: searchKey,
        });
        if (pageObj.page === 1) {
          inputRef.current.blur();
          masonryRef.current.focus();
          setFocusIndex(0);

          loadImageSize(newPhotos).then((newPhotosWithSize) => {
            setPhotos(newPhotosWithSize);
            // console.log("newPhotosWithSize", newPhotosWithSize);
          });
        } else {
          loadImageSize(newPhotos).then((newPhotosWithSize) => {
            setPhotos([...photos, ...newPhotosWithSize]);
            // console.log("newPhotosWithSize", newPhotosWithSize);
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCheck = (index, e) => {
    // 聚焦
    setFocusIndex(index);
    // 选中
    check(index);
  };

  const check = (index) => {
    let findIndex = checkedIndexes.indexOf(index);
    if (findIndex === -1) {
      checkedIndexes.push(index);
      setCheckedIndexes([...checkedIndexes]);
    } else {
      checkedIndexes.splice(findIndex, 1);
      setCheckedIndexes([...checkedIndexes]);
    }
  };
  const handleImgLoad = (index, e) => {
    if (!loadedIndexes.includes(index)) {
      setLoadedIndexes([...loadedIndexes, index]);
    }
  };

  const renderSkeleton = () => {
    return <Skeleton />;
  };

  const renderNoMore = () => {
    return <div>no more data...</div>;
  };

  const handleInput = (e) => {
    setSearchKey(e.target.value);
  };

  const renderMasonry = () => {
    return (
      <>
        <div
          className="masonry-container"
          onScroll={handleScroll}
          ref={masonryRef}
        >
          <Masonry
            breakpointCols={COLUMN_COUNT}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {photos.map((photo, index) => {
              return (
                <div
                  className="item-container"
                  key={index}
                  tabIndex="-1"
                  onClick={partial(handleCheck, index)}
                >
                  <Checkbox
                    checked={checkedIndexes.includes(index)}
                    className="item-checkbox"
                  ></Checkbox>
                  <div
                    className="image-bg"
                    style={{ backgroudColor: "#141646" }}
                  >
                    <img
                      src={photo.currentSrc || "./images/placeholder.png"}
                      className={`img 
                      ${focusedIndex === index ? "focus" : ""} 
                      ${checkedIndexes.includes(index) ? "checked" : ""}
                      ${loadedIndexes.includes(index) ? "loaded" : ""}
                      `}
                      onLoad={partial(handleImgLoad, index)}
                    ></img>
                  </div>
                </div>
              );
            })}
          </Masonry>
          <div className="loading-wrapper">
            <ReactLoading color="#000000"></ReactLoading>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>showModal</Button>
      <br></br>
      <Modal
        title={`insert photos(${checkedIndexes.length})`}
        visible={true}
        className="modal"
        id="masonry-modal"
        onOk={() => setVisible(!visible)}
        width={modalWidth}
        ref={modalRef}
      >
        <>
          <div className="input-wrapper">
            <Input
              ref={inputRef}
              placeholder="Basic usage"
              value={searchKey}
              onChange={handleInput}
            />
            <Button onClick={triggerSearch}>Search</Button>
          </div>
          {pageObj.page === 1 ? renderSkeleton() : renderMasonry()}
          {pageObj.page === pageObj.totalPage && renderNoMore()}
        </>
      </Modal>
    </>
  );
}

export default MasonryDemo;
