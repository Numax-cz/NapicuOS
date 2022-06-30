import {Vector2f} from "../interface/Vector2f";
import {percentage, percentageValue} from "./getPercentage";

/**
 *
 * @param x
 * @param y
 * @param xMax
 * @param yMax
 * @param scaleXMax
 * @param scaleYMax
 */
export function SystemVector2fUpscale(x: number, y: number, xMax: number, yMax: number, scaleXMax: number, scaleYMax: number): Vector2f {
  //Percentages
  let fx: number = percentage(x, xMax);
  let fy: number = percentage(y, yMax);
  //Pixels
  let pxScaleX: number = percentageValue(fx, scaleXMax);
  let pxScaleY: number = percentageValue(fy, scaleYMax);

  return {x: pxScaleX, y: pxScaleY};
}
