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
exports.PostResolvers = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const database_1 = require("../../database");
var QueryStatus;
(function (QueryStatus) {
    QueryStatus["success"] = "SUCCESS";
    QueryStatus["notFound"] = "NOT_FOUND";
    QueryStatus["error"] = "ERROR";
})(QueryStatus || (QueryStatus = {}));
// THIS IS OFFSET AND LIMIT PAGINATION
exports.PostResolvers = {
    Query: {
        getPostsOffsetPagination: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!(context === null || context === void 0 ? void 0 : context.account_id))
                throw new apollo_server_errors_1.AuthenticationError("invalid_token");
            const { limit, page } = args;
            const where = {
                where: {
                    creator_account_id: context.account_id,
                },
            };
            const posts = yield database_1.db.post.findMany(Object.assign(Object.assign({}, where), { orderBy: {
                    created_at: "desc",
                }, take: limit, skip: page * limit }));
            const aggregate = yield database_1.db.post.aggregate(Object.assign(Object.assign({}, where), { _count: { _all: true } }));
            const count = aggregate._count._all;
            return {
                nodes: posts,
                meta: {
                    nodeCount: count,
                    pageCount: Math.ceil(count / limit),
                    pageCurrent: (page * limit) / limit,
                    nodesPerPage: limit,
                },
            };
            // const lastInResults = results[args.limit - 1];
            // const cursor = lastInResults.id;
            // return {
            //   edges: results,
            //   page_info: {
            //     cursor,
            //     has_next_page: true,
            //   },
            // };
        }),
        getPostsCursorPagination: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!(context === null || context === void 0 ? void 0 : context.account_id))
                throw new apollo_server_errors_1.AuthenticationError("invalid_token");
            try {
                const { limit, cursor } = args;
                const where = {
                    where: {
                        creator_account_id: context.account_id,
                    },
                };
                // Get posts with limit but get also 1 more.
                const posts = yield database_1.db.post.findMany(Object.assign(Object.assign(Object.assign({}, where), (cursor && {
                    cursor: {
                        id: cursor,
                    },
                })), { orderBy: {
                        created_at: "desc",
                    }, take: limit + 1 }));
                if (!posts) {
                    return {
                        status: QueryStatus.notFound,
                        node: null,
                    };
                }
                // Here we look if there is more
                const hasNextPage = posts.length > limit;
                let endCursor = null;
                if (hasNextPage) {
                    // The one we asked extra is going to be our cursor
                    endCursor = posts[posts.length - 1].id;
                    // Remove last one from array before sending it to the client
                    if (hasNextPage)
                        posts.pop();
                }
                return {
                    status: QueryStatus.success,
                    node: {
                        edges: posts,
                        page_info: {
                            end_cursor: endCursor,
                            has_next_page: hasNextPage,
                        },
                    },
                };
            }
            catch (e) {
                return {
                    status: QueryStatus.error,
                    message: e.message,
                };
            }
        }),
    },
};
//# sourceMappingURL=resolvers.js.map