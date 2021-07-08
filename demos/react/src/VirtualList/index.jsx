// 虚拟滚动列表demo, 原文见： https://zhuanlan.zhihu.com/p/34585166
import { useState, useEffect, useRef } from "react";

import "./index.css";
import data from "./data";

export default function Demo({ itemHeight = 30 }) {
  const [visibleData, setVisibleData] = useState([]);
  const container = useRef();
  const content = useRef();

  const updateVisibleData = (scrollTop) => {
    scrollTop = scrollTop || 0;
    const visibleCount = Math.ceil(container.current.clientHeight / itemHeight); // 取得可见区域的可见列表项数量
    const start = Math.floor(scrollTop / itemHeight); // 取得可见区域的起始数据索引
    const end = start + visibleCount; // 取得可见区域的结束数据索引
    setVisibleData(data.slice(start, end)); // 计算出可见区域对应的数据，让 React 更新
    content.current.style.webkitTransform = `translate3d(0, ${
      start * itemHeight
    }px, 0)`; // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
  };

  useEffect(() => {
    updateVisibleData();
  }, []);

  const handleScroll = () => {
    const scrollTop = container.current.scrollTop;
    updateVisibleData(scrollTop);
  };

  const contentHeight = data.length * itemHeight + "px";
  return (
    <>
      <div class="list-view" onScroll={handleScroll} ref={container}>
        <div class="list-view-phantom" style={{ height: contentHeight }}></div>
        <div ref={content} class="list-view-content">
          {visibleData.map((item) => {
            return (
              <div
                class="list-view-item"
                style={{
                  height: itemHeight + "px",
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
