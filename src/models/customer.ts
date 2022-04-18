export interface Customer {
  id?: number;
  fName: string;
  lName: string;
  password: string;
  phone: string;
  birthday: Date;
  subStart: Date;
  subEnd: Date;
  isVerified:boolean
}
