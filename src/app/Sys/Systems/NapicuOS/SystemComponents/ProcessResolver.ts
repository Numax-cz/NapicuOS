export abstract class ProcessResolver<T> {
  public abstract processResolver?: (value: (PromiseLike<T> | T)) => void


}
