export interface Customer {
  id?: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Rep {
  id?: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export type User = Customer | Rep;
