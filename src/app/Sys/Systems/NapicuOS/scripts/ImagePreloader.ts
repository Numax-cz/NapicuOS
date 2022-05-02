/**
 * Function for preloading images
 * @param src
 */
export function imagePreloader(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
}
