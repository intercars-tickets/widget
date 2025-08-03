export interface ResetPasswordRequest {
    code: string,
    phone: string,
    password: string,
    confirmPassword: string,
    lang: string
}