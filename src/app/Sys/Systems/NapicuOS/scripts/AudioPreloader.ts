/**
 * Function for preloading audio
 * @param src
 */
export function imagePreloader(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Audio();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
}
