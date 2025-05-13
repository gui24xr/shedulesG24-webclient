export class PlatformServiceError extends Error {
    constructor(message, originalError, statusCode) {
        super(message);
        this.name = 'PlatformServiceError';
        this.originalError = originalError;
        this.statusCode = statusCode;
        this.isRefreshTokenExpired = statusCode === 401 && originalError?.response?.config?.url?.includes('refresh-token');
    }

    static fromAxiosError(error) {
        const statusCode = error.response?.status;
        const message = error.response?.data?.message || error.message;
        return new PlatformServiceError(message, error, statusCode);
    }
} 