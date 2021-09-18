"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountResolvers = void 0;
const apollo_server_1 = require("apollo-server");
const database_1 = require("../../database");
exports.AccountResolvers = {
    Query: {
        me: (_parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!(context === null || context === void 0 ? void 0 : context.account_id))
                throw new apollo_server_1.AuthenticationError("invalid_token");
            return database_1.db.account.findUnique({ where: { id: context.account_id } });
        }),
    },
    Mutation: {
        createAccount: (_parent, args, _context) => __awaiter(void 0, void 0, void 0, function* () {
            // if (!context.account_id) throw new AuthenticationError('invalid_token');
            if (!args.email || !args.username)
                throw new apollo_server_1.UserInputError("invalid_args");
            return database_1.db.account.create({
                data: { email: args.email, username: args.username },
            });
        }),
    },
};
//# sourceMappingURL=resolvers.js.map