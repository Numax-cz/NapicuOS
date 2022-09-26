/**
 * Function for preloading audio
 * @param src
 */
export function audioPreloader(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.oncanplay = () => resolve();
    audio.onerror = () => reject();
    audio.src = src;
  });
}
