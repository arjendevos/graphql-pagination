"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const modules_1 = require("./modules");
const context_1 = require("./context");
const utils_1 = require("./utils");
const port = process.env.PORT || 5000;
new apollo_server_1.ApolloServer({ schema: modules_1.schema, context: context_1.context, formatError: utils_1.formatError }).listen({ port }, () => {
    return console.log(`Server ready at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map