import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Account, Post } from './node_modules/prisma/client/index.d.ts';
export type Maybe<T> = T | undefined | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  password_hash?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type CursorPaginatedPosts = {
  __typename?: 'CursorPaginatedPosts';
  message?: Maybe<Scalars['String']>;
  node?: Maybe<CursorPaginatedPostsNode>;
  status: Scalars['String'];
};

export type CursorPaginatedPostsNode = {
  __typename?: 'CursorPaginatedPostsNode';
  edges?: Maybe<Array<Maybe<Post>>>;
  page_info?: Maybe<CursorPaginatedPostsPageInfo>;
};

export type CursorPaginatedPostsPageInfo = {
  __typename?: 'CursorPaginatedPostsPageInfo';
  end_cursor?: Maybe<Scalars['String']>;
  has_next_page?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<Account>;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};

export type OffsetPaginatedPosts = {
  __typename?: 'OffsetPaginatedPosts';
  meta?: Maybe<OffsetPaginatedPostsMeta>;
  nodes?: Maybe<Array<Maybe<Post>>>;
};

export type OffsetPaginatedPostsMeta = {
  __typename?: 'OffsetPaginatedPostsMeta';
  nodeCount: Scalars['Int'];
  nodesPerPage: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageCurrent: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  created_at: Scalars['DateTime'];
  creator_account_id?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  getPostsCursorPagination?: Maybe<CursorPaginatedPosts>;
  getPostsOffsetPagination?: Maybe<OffsetPaginatedPosts>;
  me?: Maybe<Account>;
};


export type QueryGetPostsCursorPaginationArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryGetPostsOffsetPaginationArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CursorPaginatedPosts: ResolverTypeWrapper<Omit<CursorPaginatedPosts, 'node'> & { node?: Maybe<ResolversTypes['CursorPaginatedPostsNode']> }>;
  CursorPaginatedPostsNode: ResolverTypeWrapper<Omit<CursorPaginatedPostsNode, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversTypes['Post']>>> }>;
  CursorPaginatedPostsPageInfo: ResolverTypeWrapper<CursorPaginatedPostsPageInfo>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  OffsetPaginatedPosts: ResolverTypeWrapper<Omit<OffsetPaginatedPosts, 'nodes'> & { nodes?: Maybe<Array<Maybe<ResolversTypes['Post']>>> }>;
  OffsetPaginatedPostsMeta: ResolverTypeWrapper<OffsetPaginatedPostsMeta>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  Boolean: Scalars['Boolean'];
  CursorPaginatedPosts: Omit<CursorPaginatedPosts, 'node'> & { node?: Maybe<ResolversParentTypes['CursorPaginatedPostsNode']> };
  CursorPaginatedPostsNode: Omit<CursorPaginatedPostsNode, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversParentTypes['Post']>>> };
  CursorPaginatedPostsPageInfo: CursorPaginatedPostsPageInfo;
  DateTime: Scalars['DateTime'];
  Int: Scalars['Int'];
  Mutation: {};
  OffsetPaginatedPosts: Omit<OffsetPaginatedPosts, 'nodes'> & { nodes?: Maybe<Array<Maybe<ResolversParentTypes['Post']>>> };
  OffsetPaginatedPostsMeta: OffsetPaginatedPostsMeta;
  Post: Post;
  Query: {};
  String: Scalars['String'];
};

export type AccountResolvers<ContextType = any, ParentType = ResolversParentTypes['Account']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CursorPaginatedPostsResolvers<ContextType = any, ParentType = ResolversParentTypes['CursorPaginatedPosts']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['CursorPaginatedPostsNode']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CursorPaginatedPostsNodeResolvers<ContextType = any, ParentType = ResolversParentTypes['CursorPaginatedPostsNode']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  page_info?: Resolver<Maybe<ResolversTypes['CursorPaginatedPostsPageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CursorPaginatedPostsPageInfoResolvers<ContextType = any, ParentType = ResolversParentTypes['CursorPaginatedPostsPageInfo']> = {
  end_cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  has_next_page?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType = ResolversParentTypes['Mutation']> = {
  createAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'email' | 'username'>>;
};

export type OffsetPaginatedPostsResolvers<ContextType = any, ParentType = ResolversParentTypes['OffsetPaginatedPosts']> = {
  meta?: Resolver<Maybe<ResolversTypes['OffsetPaginatedPostsMeta']>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OffsetPaginatedPostsMetaResolvers<ContextType = any, ParentType = ResolversParentTypes['OffsetPaginatedPostsMeta']> = {
  nodeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nodesPerPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageCurrent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType = ResolversParentTypes['Post']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator_account_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType = ResolversParentTypes['Query']> = {
  getPostsCursorPagination?: Resolver<Maybe<ResolversTypes['CursorPaginatedPosts']>, ParentType, ContextType, RequireFields<QueryGetPostsCursorPaginationArgs, 'limit'>>;
  getPostsOffsetPagination?: Resolver<Maybe<ResolversTypes['OffsetPaginatedPosts']>, ParentType, ContextType, RequireFields<QueryGetPostsOffsetPaginationArgs, 'limit' | 'page'>>;
  me?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  CursorPaginatedPosts?: CursorPaginatedPostsResolvers<ContextType>;
  CursorPaginatedPostsNode?: CursorPaginatedPostsNodeResolvers<ContextType>;
  CursorPaginatedPostsPageInfo?: CursorPaginatedPostsPageInfoResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  OffsetPaginatedPosts?: OffsetPaginatedPostsResolvers<ContextType>;
  OffsetPaginatedPostsMeta?: OffsetPaginatedPostsMetaResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

