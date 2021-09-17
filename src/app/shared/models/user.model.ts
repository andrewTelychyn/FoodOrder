export interface User {
  id: string;
  role: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  token?: string;
}
