import { Navigate } from './BiosRouter';
/**
 * Loading animation (black screen)
 * @param redirect Redirection path after the end of amination
 * @param outTime  Animation end time
 * @param inTime Animation loading time
 */
export function Loading(redirect: string, outTime: number, inTime?: number): void {
  inTime = inTime || 0;
  setTimeout(() => {
    Navigate('/blackloading');
    setTimeout(() => {
      Navigate(redirect); 
    }, outTime);
  }, inTime);
}
