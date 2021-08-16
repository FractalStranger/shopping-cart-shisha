export const scrollToRef = (ref: any) => window.scrollTo(0, ref.current.offsetTop)
// export const scrollToRefSmooth = (ref: any) => {
//   setTimeout(() => {
//     ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   }, 1);
// };
