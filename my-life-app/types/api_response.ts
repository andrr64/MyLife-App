export type ApiResponse<T> = {
    timestamp: string;      // LocalDateTime → ISO string
    statusCode?: number;    // nullable di Java → optional di TS
    message?: string;
    data?: T;
    details?: any;          // untuk error validasi
};
