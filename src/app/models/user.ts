import {Company} from './company';

export interface User {
  id: number;
  name: string;
  surname: string;
  birthday: string;
  age: number;
  role: string;
  email: string;
  emailToVerify?: string;
  password: string;
  passwordToVerify?: string;
  enabling?: boolean;
  registered?: boolean;
  profileImagePath?: string;
  companyDTO?: Company;
  skilIdArray?: number[];
}

