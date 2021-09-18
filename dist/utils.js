"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = exports.config = void 0;
exports.config = {
    TOKEN_SECRET: process.env.TOKEN_SECRET || "my_secret_jwt_token",
};
function formatError(err) {
    // @ts-expect-error
    delete err.extensions;
    return err;
}
exports.formatError = formatError;
//# sourceMappingURL=utils.js.map