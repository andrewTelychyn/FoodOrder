export interface User {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  username: string;
  password: string;
  token?: string;
  ordersList: string[];
}

export interface UserDTO {
  id: string;
  firstname: string;
  lastname: string;
  email?: string;
  phone?: string;
}
