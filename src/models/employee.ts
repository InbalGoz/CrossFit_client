export interface Employee {
  id: number;
  fName: string;
  lName: string;
  password: string;
  phone: string;
  isAdmin: boolean;
  lessons?: any[];
}
