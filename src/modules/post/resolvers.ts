import { AuthenticationError } from "apollo-server-errors";
import { Resolvers } from "../../graphql/types";
import { Context } from "../../context";
import { db } from "../../database";

interface getPostsOffsetPaginationArgs {
  limit: number;
  page: number;
}

interface getPostsCursorPaginationArgs {
  limit: number;
  cursor?: string;
}

enum QueryStatus {
  success = "SUCCESS",
  notFound = "NOT_FOUND",
  error = "ERROR",
}

// THIS IS OFFSET AND LIMIT PAGINATION

export const PostResolvers: Resolvers<Context> = {
  Query: {
    getPostsOffsetPagination: async (
      _parent,
      args: getPostsOffsetPaginationArgs,
      context
    ) => {
      if (!context?.account_id) throw new AuthenticationError("invalid_token");

      const { limit, page } = args;
      const where = {
        where: {
          creator_account_id: context.account_id,
        },
      };

      const posts = await db.post.findMany({
        ...where,
        orderBy: {
          created_at: "desc",
        },
        take: limit,
        skip: page * limit,
      });

      const aggregate = await db.post.aggregate({
        ...where,
        _count: { _all: true },
      });
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
    },
    getPostsCursorPagination: async (
      _parent,
      args: getPostsCursorPaginationArgs,
      context
    ) => {
      if (!context?.account_id) throw new AuthenticationError("invalid_token");

      try {
        const { limit, cursor } = args;
        const where = {
          where: {
            creator_account_id: context.account_id,
          },
        };

        // Get posts with limit but get also 1 more.
        const posts = await db.post.findMany({
          ...where,
          ...(cursor && {
            cursor: {
              id: cursor,
            },
          }),
          orderBy: {
            created_at: "desc",
          },
          take: limit + 1,
        });

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
          if (hasNextPage) posts.pop();
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
      } catch (e) {
        return {
          status: QueryStatus.error,
          message: e.message,
        };
      }
    },
  },
};
