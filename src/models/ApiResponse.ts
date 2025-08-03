export interface ApiResponse<T> {
    Result: T[];
    error?: "string";
}