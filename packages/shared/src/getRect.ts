export function getRect(element: HTMLElement | null | undefined) {
  if (element === null || element === undefined)
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
    };
  const { top, bottom, left, right, width, height } =
    element.getBoundingClientRect();
  const scrollTop = window.scrollY;
  return {
    top: top + scrollTop,
    bottom,
    left,
    right,
    width,
    height,
  };
}
export default getRect;
