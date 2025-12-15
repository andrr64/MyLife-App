export interface ValueByCategoryResponse <T> {
  key: string;
  value: T;
  percentage: number | undefined;
}