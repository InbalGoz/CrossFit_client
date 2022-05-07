export interface Customer {
  id: number;
  fName: string;
  lName: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date | null;
  subStart: Date | null;
  subEnd: Date | null;
  isAdmin: boolean; //delete
  isVerified: boolean;
}
