import { useSize } from "ahooks";
import * as _ from "lodash";
const DEFAULT_SCREEN_WIDTH = 1920;
const DEFAULT_SCREEN_HEIGHT = 1080;
const MAX_MODAL_HEIGHT = 748;
const MAX_MODAL_WIDTH = 1070;
const MIN_MODAL_HEIGHT = 512;
const MIN_MODAL_WIDTH = 732;

export function useModalSize() {
  const { width, height } = useSize(document.body);
  const r_w = width / DEFAULT_SCREEN_WIDTH;
  const r_h = height / DEFAULT_SCREEN_HEIGHT;
  const r = _.min([r_w, r_h]);
  const w = r * width;
  const h = r * height;

  console.log("w, h, w/h", w, h, w / h);
  console.log(
    "DEFAULT_SCREEN_WIDTH/DEFAULT_SCREEN_HEIGHT",
    DEFAULT_SCREEN_WIDTH / DEFAULT_SCREEN_HEIGHT
  );

  let modalWidth = (w * MAX_MODAL_WIDTH) / DEFAULT_SCREEN_WIDTH;
  let modalHeight = (h * MAX_MODAL_HEIGHT) / DEFAULT_SCREEN_HEIGHT;

  console.log("originModaWidth, originModalHeight", modalWidth, modalHeight);

  if (modalWidth >= MAX_MODAL_WIDTH || modalHeight >= MAX_MODAL_HEIGHT) {
    modalWidth = MAX_MODAL_WIDTH;
    modalHeight = MAX_MODAL_HEIGHT;
  }
  if (modalHeight <= MIN_MODAL_HEIGHT || modalWidth <= MIN_MODAL_WIDTH) {
    modalWidth = MIN_MODAL_WIDTH;
    modalHeight = MIN_MODAL_HEIGHT;
  }

  console.log("modalWidth, modalHeight", modalWidth, modalHeight);
  return { modalWidth, modalHeight };
}
