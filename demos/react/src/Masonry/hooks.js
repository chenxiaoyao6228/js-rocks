import { useSize } from "ahooks";
const Modal_HEIGHT_RATIO = 1920 / 1148;
const Modal_WIDTH_RATIO = 1080 / 752;
export function useModalSize() {
  const { width, height } = useSize(document.body);
  let modalWidth = width / Modal_WIDTH_RATIO;
  let modalHeight = height / Modal_WIDTH_RATIO;
  if (modalWidth >= 1070) modalWidth = 1070;
  if (modalWidth <= 748) modalWidth = 748;

  if (modalHeight >= 732) modalHeight = 732;
  if (modalHeight <= 512) modalHeight = 512;

  console.log("modalWidth, modalHeight", modalWidth, modalHeight);
  return { modalWidth, modalHeight };
}
