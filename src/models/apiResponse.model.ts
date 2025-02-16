export interface APIResponse<T = any> {
    success: boolean;
    message?: string;
    error?: string;
    data?: T;
}