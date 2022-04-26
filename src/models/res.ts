export interface Res {
  data: Data;
}

interface Data {
  scucess: boolean;
  data?: any;
  err: any;
}
