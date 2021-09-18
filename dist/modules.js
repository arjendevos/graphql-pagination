"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const lodash_1 = require("lodash");
const path_1 = require("path");
const schema_1 = require("@graphql-tools/schema");
const load_1 = require("@graphql-tools/load");
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
// Resolvers
const account_1 = require("./modules/account");
const post_1 = require("./modules/post");
// Load all GraphQl files from modules
const baseSchema = (0, load_1.loadSchemaSync)((0, path_1.join)(__dirname, "modules/**/*.graphql"), {
    loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
});
exports.schema = (0, schema_1.addResolversToSchema)({
    schema: baseSchema,
    resolvers: (0, lodash_1.merge)(account_1.AccountResolvers, post_1.PostResolvers),
});
//# sourceMappingURL=modules.js.map