import { useState, useEffect, useRef } from "react";
import { partial } from "lodash";
import Masonry from "react-masonry-css";
import { Button, Modal, Input, Checkbox, Skeleton } from "antd";
import ReactLoading from "react-loading";
import { useThrottleFn } from "ahooks";
import fetchPhotos from "./fetchPhoto";
import "./index.css";

const HALF_SCREEN = document.body.clientHeight / 2;
const DEFAULT_SEARCH_KEYWORD = "cat";

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

  const [visible, setVisible] = useState(true);
  const [checkedIndexes, setCheckedIndexes] = useState([]);

  const containerRef = useRef();

  const triggerSearch = () => {
    getData({
      ...pageObj,
      ...{ key: searchKey, page: 1 },
    });
  };

  // 预设关键字搜索
  useEffect(() => {
    setSearchKey(DEFAULT_SEARCH_KEYWORD);
    triggerSearch();
  }, [visible]);

  const hasReachedBottom = () => {
    let element = containerRef.current;
    return (
      element.scrollHeight -
        Math.abs(element.scrollTop) -
        element.clientHeight <
      HALF_SCREEN
    );
  };

  const { run: handleScroll, cancel } = useThrottleFn(
    () => {
      if (hasReachedBottom()) {
        console.log("pageObj", pageObj);
        if (pageObj.page === pageObj.totalPage) return;
        getData({ ...pageObj, key: searchKey, page: pageObj.page + 1 });
      }
    },
    { waiting: 300 }
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
          setPhotos(newPhotos);
        } else {
          setPhotos([...photos, ...newPhotos]);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

  const renderMasonry = () => {
    return (
      <>
        <div
          className="masonry-container"
          onScroll={handleScroll}
          ref={containerRef}
        >
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
                  <img
                    src={photo.currentSrc || "./images/placeholder.png"}
                    className="img active"
                  ></img>
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

  const renderSkeleton = () => {
    return <Skeleton />;
  };

  const renderNoMore = () => {
    return <div>no more data...</div>;
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
        <>
          <div className="input-wrapper">
            <Input
              placeholder="Basic usage"
              value={searchKey}
              onEnter={triggerSearch}
            />
            <Button onClick={triggerSearch}>Search</Button>
          </div>
          {pageObj.page === 1 ? renderSkeleton() : renderMasonry()}
          {pageObj.page === pageObj.totalPages && renderNoMore()}
        </>
      </Modal>
    </>
  );
}

export default MasonryDemo;
