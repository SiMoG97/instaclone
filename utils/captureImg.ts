import html2canvas from "html2canvas";

export default async function captureImg(element: HTMLElement) {
  return html2canvas(element);
}
