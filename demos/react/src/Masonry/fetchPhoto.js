// const API_ENDPOINT = "https://jsonplaceholder.typicode.com/photos";
import data from "./data-2";
// import data from "./data";

const dataList = [data.slice(0, 30), data.slice(31, 60), data.slice(61, 100)];
let dataIndex = -1;

export default function fetchPhotos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dataIndex === 2) {
        dataIndex = -1;
      }
      dataIndex++;
      resolve(dataList[dataIndex]);
    }, 2000);
  });
}
