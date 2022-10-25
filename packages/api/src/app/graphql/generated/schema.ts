import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User } from '../../db/models/User';
import { Recipient } from '../../db/models/Recipient';
import { Avatar } from '../../db/models/Avatar';
import { DeliveryMan } from '../../db/models/DeliveryMan';
import { Delivery } from '../../db/models/Delivery';
import { DeliveryEdge } from '../modules/delivery/types/schema';
import { DeliveryProblem } from '../../db/models/DeliveryProblem';
import { GraphQLContext } from '../context';
import { z } from 'zod'
export type Maybe<T> = T | null;
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
  DateTime: Date;
  EmailAddress: string;
  NegativeFloat: number;
  NegativeInt: number;
  NonNegativeFloat: number;
  NonNegativeInt: number;
  NonPositiveFloat: number;
  NonPositiveInt: number;
  PositiveFloat: number;
  PositiveInt: number;
};

export type GQLCreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};



export type GQLLoginInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type GQLLoginPayload = {
  __typename?: 'LoginPayload';
  id: Scalars['ID'];
  token: Scalars['String'];
  user: GQLUser;
};

export type GQLMutation = {
  __typename?: 'Mutation';
  addContact: GQLUserEdge;
  createUser: GQLUserEdge;
  deleteUser: GQLUserEdge;
  login?: Maybe<GQLLoginPayload>;
  removeContact: GQLUserEdge;
  updateUser: GQLUserEdge;
};


export type GQLMutationAddContactArgs = {
  id: Scalars['String'];
};


export type GQLMutationCreateUserArgs = {
  input: GQLCreateUserInput;
};


export type GQLMutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type GQLMutationLoginArgs = {
  input: GQLLoginInput;
};


export type GQLMutationRemoveContactArgs = {
  id: Scalars['String'];
};


export type GQLMutationUpdateUserArgs = {
  id: Scalars['String'];
  input: GQLUpdateUserInput;
};



export type GQLNode = {
  id: Scalars['ID'];
};





export type GQLPageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};



export type GQLQuery = {
  __typename?: 'Query';
  me?: Maybe<GQLUser>;
  node?: Maybe<GQLNode>;
  nodes?: Maybe<Array<Maybe<GQLNode>>>;
  users?: Maybe<GQLUserConnection>;
};


export type GQLQueryNodeArgs = {
  id: Scalars['ID'];
};


export type GQLQueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type GQLQueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};

export type GQLUpdateUserInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type GQLUser = GQLNode & {
  __typename?: 'User';
  id: Scalars['ID'];
  _id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['EmailAddress']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  contacts?: Maybe<GQLUserConnection>;
};

export type GQLUserConnection = {
  __typename?: 'UserConnection';
  pageInfo: GQLPageInfo;
  edges: Array<Maybe<GQLUserEdge>>;
  startCursorOffset: Scalars['Int'];
  endCursorOffset: Scalars['Int'];
  count: Scalars['Int'];
};

export type GQLUserEdge = {
  __typename?: 'UserEdge';
  node: GQLUser;
  cursor: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
export type GQLResolversTypes = {
  CreateUserInput: GQLCreateUserInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  LoginInput: GQLLoginInput;
  LoginPayload: ResolverTypeWrapper<Omit<GQLLoginPayload, 'user'> & { user: GQLResolversTypes['User'] }>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']>;
  Node: GQLResolversTypes['User'];
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']>;
  PageInfo: ResolverTypeWrapper<GQLPageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  UpdateUserInput: GQLUpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserConnection: ResolverTypeWrapper<Omit<GQLUserConnection, 'edges'> & { edges: Array<Maybe<GQLResolversTypes['UserEdge']>> }>;
  UserEdge: ResolverTypeWrapper<Omit<GQLUserEdge, 'node'> & { node: GQLResolversTypes['User'] }>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  CreateUserInput: GQLCreateUserInput;
  String: Scalars['String'];
  DateTime: Scalars['DateTime'];
  EmailAddress: Scalars['EmailAddress'];
  LoginInput: GQLLoginInput;
  LoginPayload: Omit<GQLLoginPayload, 'user'> & { user: GQLResolversParentTypes['User'] };
  ID: Scalars['ID'];
  Mutation: {};
  NegativeFloat: Scalars['NegativeFloat'];
  NegativeInt: Scalars['NegativeInt'];
  Node: GQLResolversParentTypes['User'];
  NonNegativeFloat: Scalars['NonNegativeFloat'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  NonPositiveFloat: Scalars['NonPositiveFloat'];
  NonPositiveInt: Scalars['NonPositiveInt'];
  PageInfo: GQLPageInfo;
  Boolean: Scalars['Boolean'];
  PositiveFloat: Scalars['PositiveFloat'];
  PositiveInt: Scalars['PositiveInt'];
  Query: {};
  Int: Scalars['Int'];
  UpdateUserInput: GQLUpdateUserInput;
  User: User;
  UserConnection: Omit<GQLUserConnection, 'edges'> & { edges: Array<Maybe<GQLResolversParentTypes['UserEdge']>> };
  UserEdge: Omit<GQLUserEdge, 'node'> & { node: GQLResolversParentTypes['User'] };
};

export interface GQLDateTimeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface GQLEmailAddressScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type GQLLoginPayloadResolvers<ContextType = GraphQLContext, ParentType extends GQLResolversParentTypes['LoginPayload'] = GQLResolversParentTypes['LoginPayload']> = {
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<GQLResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMutationResolvers<ContextType = GraphQLContext, ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation']> = {
  addContact?: Resolver<GQLResolversTypes['UserEdge'], ParentType, ContextType, RequireFields<GQLMutationAddContactArgs, 'id'>>;
  createUser?: Resolver<GQLResolversTypes['UserEdge'], ParentType, ContextType, RequireFields<GQLMutationCreateUserArgs, 'input'>>;
  deleteUser?: Resolver<GQLResolversTypes['UserEdge'], ParentType, ContextType, RequireFields<GQLMutationDeleteUserArgs, 'id'>>;
  login?: Resolver<Maybe<GQLResolversTypes['LoginPayload']>, ParentType, ContextType, RequireFields<GQLMutationLoginArgs, 'input'>>;
  removeContact?: Resolver<GQLResolversTypes['UserEdge'], ParentType, ContextType, RequireFields<GQLMutationRemoveContactArgs, 'id'>>;
  updateUser?: Resolver<GQLResolversTypes['UserEdge'], ParentType, ContextType, RequireFields<GQLMutationUpdateUserArgs, 'id' | 'input'>>;
};

export interface GQLNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface GQLNegativeIntScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export type GQLNodeResolvers<ContextType = GraphQLContext, ParentType extends GQLResolversParentTypes['Node'] = GQLResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'User', ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
};

export interface GQLNonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface GQLNonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface GQLNonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface GQLNonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export type GQLPageInfoResolvers<ContextType = GraphQLContext, ParentType extends GQLResolversParentTypes['PageInfo'] = GQLResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface GQLPositiveIntScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export type GQLQueryResolvers<ContextType = GraphQLContext, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType>;
  node?: Resolver<Maybe<GQLResolversTypes['Node']>, ParentType, ContextType, RequireFields<GQLQueryNodeArgs, 'id'>>;
  nodes?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Node']>>>, ParentType, ContextType, RequireFields<GQLQueryNodesArgs, 'ids'>>;
  users?: Resolver<Maybe<GQLResolversTypes['UserConnection']>, ParentType, ContextType, RequireFields<GQLQueryUsersArgs, never>>;
};

export type GQLUserResolvers<ContextType = GraphQLContext, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = {
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  _id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<GQLResolversTypes['EmailAddress']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>;
  contacts?: Resolver<Maybe<GQLResolversTypes['UserConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserConnectionResolvers<ContextType = GraphQLContext, ParentType extends GQLResolversParentTypes['UserConnection'] = GQLResolversParentTypes['UserConnection']> = {
  pageInfo?: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<Maybe<GQLResolversTypes['UserEdge']>>, ParentType, ContextType>;
  startCursorOffset?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  endCursorOffset?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserEdgeResolvers<ContextType = GraphQLContext, ParentType extends GQLResolversParentTypes['UserEdge'] = GQLResolversParentTypes['UserEdge']> = {
  node?: Resolver<GQLResolversTypes['User'], ParentType, ContextType>;
  cursor?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResolvers<ContextType = GraphQLContext> = {
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  LoginPayload?: GQLLoginPayloadResolvers<ContextType>;
  Mutation?: GQLMutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  Node?: GQLNodeResolvers<ContextType>;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  PageInfo?: GQLPageInfoResolvers<ContextType>;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  Query?: GQLQueryResolvers<ContextType>;
  User?: GQLUserResolvers<ContextType>;
  UserConnection?: GQLUserConnectionResolvers<ContextType>;
  UserEdge?: GQLUserEdgeResolvers<ContextType>;
};




type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export function GQLCreateUserInputSchema(): z.ZodObject<Properties<GQLCreateUserInput>> {
  return z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
  })
}

export function GQLLoginInputSchema(): z.ZodObject<Properties<GQLLoginInput>> {
  return z.object({
    email: z.string().email(),
    password: z.string()
  })
}

export function GQLUpdateUserInputSchema(): z.ZodObject<Properties<GQLUpdateUserInput>> {
  return z.object({
    name: z.string().nullish(),
    email: z.string().nullish(),
    password: z.string().nullish()
  })
}
