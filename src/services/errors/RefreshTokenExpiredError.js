class RefreshTokenExpiredError extends Error {
    constructor(message = "La sesión ha expirado, el refresh token esta vencido...") {
      super(message);
      this.name = "SessionExpiredError";
    }
}

export default RefreshTokenExpiredError;