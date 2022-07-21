export interface Res {
  data: Data;
}

interface Data {
  success: boolean;
  data?: any;
  err: any;
}
