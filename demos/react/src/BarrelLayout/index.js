import { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import "./index.css";

function Demo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      new Interaction();
      new Loader();
      new Barrel();
    }
  }, [visible]);

  return (
    <div>
      <Button onClick={() => setVisible(!visible)}>showModal</Button>
      <Modal
        title="insert photo"
        visible={visible}
        width="1048px"
        id="modal"
        className="modal"
      >
        <input id="search-ipt"></input>
        <main id="results"></main>
      </Modal>
    </div>
  );
}

export default Demo;

//事件管理器
class Event {
  static on(type, handler) {
    return document.addEventListener(type, handler);
  }
  static trigger(type, data) {
    return document.dispatchEvent(
      new CustomEvent(type, {
        detail: data,
      })
    );
  }
}

//Event.on('search', e=>console.log(e.detail))
//Event.trigger('search', 'start to search')

class Interaction {
  constructor() {
    this.searchInput = document.querySelector("#search-ipt");
    this.resultEle = document.querySelector("#results");
    this.bind();
  }
  bind() {
    this.searchInput.oninput = this.throttle(() => {
      Event.trigger("search", this.searchInput.value);
    }, 300);
    this.resultEle.onresize = this.throttle(() => Event.trigger("resize"), 300);
    this.resultEle.onscroll = this.throttle(() => {
      if (this.isToBottom()) {
        console.log("isToBottom");
        Event.trigger("bottom");
      }
    });
  }
  throttle(fn, delay) {
    let timer = null;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.bind(this)(arguments), delay);
    };
  }
  isToBottom() {
    return (
      this.resultEle.scrollHeight -
        this.resultEle.scrollTop -
        this.resultEle.clientHeight <
      5
    );
  }
}
// Event.on('search', e=>console.log(e.detail))
// Event.on('resize', e=>console.log('resize'))

// 加载数据的模块
class Loader {
  constructor() {
    this.page = 1;
    this.per_page = 30;
    this.keyword = "";
    this.total_hits = 0;
    this.url = "//pixabay.com/api/";

    this.bind();
  }
  bind() {
    Event.on("search", (e) => {
      this.page = 1;
      this.keyword = e.detail;
      this.loadData()
        .then((data) => {
          console.log(this);
          this.total_hits = data.totalHits;
          Event.trigger("load_first", data);
        })
        .catch((err) => console.log(err));
    });

    Event.on("bottom", (e) => {
      if (this.loading) return;
      if (this.page * this.per_page > this.total_hits) {
        Event.trigger("load_over");
        return;
      }
      this.loading = true;

      ++this.page;
      this.loadData()
        .then((data) => Event.trigger("load_more", data))
        .catch((err) => console.log(err));
    });
  }

  loadData() {
    return fetch(
      this.fullUrl(this.url, {
        key: "5856858-0ecb4651f10bff79efd6c1044",
        q: this.keyword,
        image_type: "photo",
        per_page: this.per_page,
        page: this.page,
      })
    ).then((res) => {
      this.loading = false;
      return res.json();
    });
  }
  fullUrl(url, json) {
    let arr = [];
    for (let key in json) {
      arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(json[key]));
    }
    return url + "?" + arr.join("&");
  }
}

class Barrel {
  constructor() {
    this.mainNode = document.querySelector("#results");
    this.rowHeightBase = 120;
    this.rowTotalWidth = 0;
    this.rowList = [];
    this.allImgInfo = [];

    this.bind();
  }
  bind() {
    Event.on("load_first", (e) => {
      this.mainNode.innerHTML = "";
      this.rowList = [];
      this.rowTotalWidth = 0;
      this.allImgInfo = [...e.detail.hits];

      this.render(e.detail.hits);
    });

    Event.on("load_more", (e) => {
      console.log("load_more");
      this.allImgInfo.push(...e.detail.hits);
      this.render(e.detail.hits);
    });

    Event.on("load_over", (e) => {
      this.layout(this.rowList, this.rowHeightBase);
    });

    Event.on("resize", (e) => {
      this.mainNode.innerHTML = "";
      this.rowList = [];
      this.rowTotalWidth = 0;
      this.render(this.allImgInfo);
    });
  }
  render(data) {
    if (!data) return;
    let mainNodeWidth = parseFloat(getComputedStyle(this.mainNode).width);
    data.forEach((imgInfo) => {
      imgInfo.ratio = imgInfo.webformatWidth / imgInfo.webformatHeight;
      imgInfo.imgWidthAfter = imgInfo.ratio * this.rowHeightBase;

      if (this.rowTotalWidth + imgInfo.imgWidthAfter <= mainNodeWidth) {
        this.rowList.push(imgInfo);
        this.rowTotalWidth += imgInfo.imgWidthAfter;
      } else {
        let rowHeight =
          (mainNodeWidth / this.rowTotalWidth) * this.rowHeightBase;
        this.layout(this.rowList, rowHeight);
        this.rowList = [imgInfo];
        this.rowTotalWidth = imgInfo.imgWidthAfter;
      }
    });
  }

  layout(row, rowHeight) {
    row.forEach((imgInfo) => {
      var figureNode = document.createElement("figure");
      var imgNode = document.createElement("img");
      imgNode.src = imgInfo.webformatURL;
      figureNode.appendChild(imgNode);
      figureNode.style.height = rowHeight + "px";
      figureNode.style.width = rowHeight * imgInfo.ratio + "px";
      this.mainNode.appendChild(figureNode);
    });
  }
}
