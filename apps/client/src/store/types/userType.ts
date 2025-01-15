export interface UserType {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface userUpdateToAdmin {
  id: string;
  isAdmin: boolean;
}
