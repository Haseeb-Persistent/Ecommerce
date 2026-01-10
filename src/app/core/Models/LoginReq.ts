export interface LoginReq {
    email: string;
    password: string;
}   


export interface LoginResData {
    accessToken: string;
    refreshToken: string;
    role: string;
    username: string;
    userId?: number | undefined;

}