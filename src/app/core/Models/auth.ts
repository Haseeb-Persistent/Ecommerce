export interface RegisterReq {
  userName: string;
  email: string;
  password: string;
}


export interface LogOut {
    accessToken: string;
    refreshToken: string;
}


