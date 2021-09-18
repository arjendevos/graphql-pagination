import { AuthenticationError, UserInputError } from 'apollo-server';
import { Resolvers } from '../../graphql/types';
import { Context } from '../../context';
import { db } from '../../database';

type CreateUserArgs = {
  email: string;
  username: string;
};

export const AccountResolvers: Resolvers<Context> = {
  Query: {
    me: async (_parent, _args, context) => {
      if (!context.account_id) throw new AuthenticationError('invalid_token');
      return db.account.findUnique({ where: { id: context.account_id } });
    }
  },
  Mutation: {
    createAccount: async (_parent: any, args: CreateUserArgs, context) => {
      // if (!context.account_id) throw new AuthenticationError('invalid_token');
      if (!args.email || !args.username) throw new UserInputError('invalid_args');
      return db.account.create({ data: { email: args.email!, username: args.username } });
    }
  }
};
