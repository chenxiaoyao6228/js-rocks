export function createUUID() {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx"
    .replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0;
      let v = c === "x" ? r : (r & 3) | 8;
      return v.toString(16);
    })
    .toUpperCase();
}
