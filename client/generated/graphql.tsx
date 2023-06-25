import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CheckVerificationCodeResponse = {
  __typename?: 'CheckVerificationCodeResponse';
  errors?: Maybe<Array<FieldError>>;
  hasPassword?: Maybe<Scalars['Boolean']['output']>;
  isLogin?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<UserSessionInfo>;
};

export type FieldError = {
  __typename?: 'FieldError';
  message: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  checkVerificationCode: CheckVerificationCodeResponse;
  setupUserInfo: SetupUserInfoResponse;
};


export type MutationCheckVerificationCodeArgs = {
  code: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
};


export type MutationSetupUserInfoArgs = {
  options: SetupUserInfoInput;
};

export type Query = {
  __typename?: 'Query';
  passwordLogin: CheckVerificationCodeResponse;
  sendVerificationCode: SendVerificationCodeResponse;
};


export type QueryPasswordLoginArgs = {
  mobile: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QuerySendVerificationCodeArgs = {
  mobile: Scalars['String']['input'];
};

export type SendVerificationCodeResponse = {
  __typename?: 'SendVerificationCodeResponse';
  errors?: Maybe<Array<FieldError>>;
  hasPassword?: Maybe<Scalars['Boolean']['output']>;
  isLogin?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SetupUserInfoInput = {
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  confPassword?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fName?: InputMaybe<Scalars['String']['input']>;
  gender: Scalars['String']['input'];
  lName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  promoCode?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SetupUserInfoResponse = {
  __typename?: 'SetupUserInfoResponse';
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<UserSessionInfo>;
};

export type UserSessionInfo = {
  __typename?: 'UserSessionInfo';
  id: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type CheckVerificationCodeMutationVariables = Exact<{
  mobile: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type CheckVerificationCodeMutation = { __typename?: 'Mutation', checkVerificationCode: { __typename?: 'CheckVerificationCodeResponse', success: boolean, isLogin?: boolean | null, hasPassword?: boolean | null, errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null, user?: { __typename?: 'UserSessionInfo', id: string, role: string } | null } };

export type PasswordLoginQueryVariables = Exact<{
  mobile: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type PasswordLoginQuery = { __typename?: 'Query', passwordLogin: { __typename?: 'CheckVerificationCodeResponse', success: boolean, isLogin?: boolean | null, errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null, user?: { __typename?: 'UserSessionInfo', id: string, role: string } | null } };

export type SetupUserInfoMutationVariables = Exact<{
  options: SetupUserInfoInput;
}>;


export type SetupUserInfoMutation = { __typename?: 'Mutation', setupUserInfo: { __typename?: 'SetupUserInfoResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', message: string, path: string }> | null, user?: { __typename?: 'UserSessionInfo', id: string, role: string } | null } };

export type SendVerificationCodeQueryVariables = Exact<{
  mobile: Scalars['String']['input'];
}>;


export type SendVerificationCodeQuery = { __typename?: 'Query', sendVerificationCode: { __typename?: 'SendVerificationCodeResponse', success: boolean, isLogin?: boolean | null, hasPassword?: boolean | null, errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null } };


export const CheckVerificationCodeDocument = gql`
    mutation CheckVerificationCode($mobile: String!, $code: String!) {
  checkVerificationCode(mobile: $mobile, code: $code) {
    success
    isLogin
    hasPassword
    errors {
      path
      message
    }
    user {
      id
      role
    }
  }
}
    `;
export type CheckVerificationCodeMutationFn = Apollo.MutationFunction<CheckVerificationCodeMutation, CheckVerificationCodeMutationVariables>;

/**
 * __useCheckVerificationCodeMutation__
 *
 * To run a mutation, you first call `useCheckVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkVerificationCodeMutation, { data, loading, error }] = useCheckVerificationCodeMutation({
 *   variables: {
 *      mobile: // value for 'mobile'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useCheckVerificationCodeMutation(baseOptions?: Apollo.MutationHookOptions<CheckVerificationCodeMutation, CheckVerificationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckVerificationCodeMutation, CheckVerificationCodeMutationVariables>(CheckVerificationCodeDocument, options);
      }
export type CheckVerificationCodeMutationHookResult = ReturnType<typeof useCheckVerificationCodeMutation>;
export type CheckVerificationCodeMutationResult = Apollo.MutationResult<CheckVerificationCodeMutation>;
export type CheckVerificationCodeMutationOptions = Apollo.BaseMutationOptions<CheckVerificationCodeMutation, CheckVerificationCodeMutationVariables>;
export const PasswordLoginDocument = gql`
    query PasswordLogin($mobile: String!, $password: String!) {
  passwordLogin(mobile: $mobile, password: $password) {
    success
    isLogin
    errors {
      path
      message
    }
    user {
      id
      role
    }
  }
}
    `;

/**
 * __usePasswordLoginQuery__
 *
 * To run a query within a React component, call `usePasswordLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `usePasswordLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePasswordLoginQuery({
 *   variables: {
 *      mobile: // value for 'mobile'
 *      password: // value for 'password'
 *   },
 * });
 */
export function usePasswordLoginQuery(baseOptions: Apollo.QueryHookOptions<PasswordLoginQuery, PasswordLoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PasswordLoginQuery, PasswordLoginQueryVariables>(PasswordLoginDocument, options);
      }
export function usePasswordLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PasswordLoginQuery, PasswordLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PasswordLoginQuery, PasswordLoginQueryVariables>(PasswordLoginDocument, options);
        }
export type PasswordLoginQueryHookResult = ReturnType<typeof usePasswordLoginQuery>;
export type PasswordLoginLazyQueryHookResult = ReturnType<typeof usePasswordLoginLazyQuery>;
export type PasswordLoginQueryResult = Apollo.QueryResult<PasswordLoginQuery, PasswordLoginQueryVariables>;
export const SetupUserInfoDocument = gql`
    mutation SetupUserInfo($options: SetupUserInfoInput!) {
  setupUserInfo(options: $options) {
    errors {
      message
      path
    }
    success
    user {
      id
      role
    }
  }
}
    `;
export type SetupUserInfoMutationFn = Apollo.MutationFunction<SetupUserInfoMutation, SetupUserInfoMutationVariables>;

/**
 * __useSetupUserInfoMutation__
 *
 * To run a mutation, you first call `useSetupUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetupUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setupUserInfoMutation, { data, loading, error }] = useSetupUserInfoMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSetupUserInfoMutation(baseOptions?: Apollo.MutationHookOptions<SetupUserInfoMutation, SetupUserInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetupUserInfoMutation, SetupUserInfoMutationVariables>(SetupUserInfoDocument, options);
      }
export type SetupUserInfoMutationHookResult = ReturnType<typeof useSetupUserInfoMutation>;
export type SetupUserInfoMutationResult = Apollo.MutationResult<SetupUserInfoMutation>;
export type SetupUserInfoMutationOptions = Apollo.BaseMutationOptions<SetupUserInfoMutation, SetupUserInfoMutationVariables>;
export const SendVerificationCodeDocument = gql`
    query SendVerificationCode($mobile: String!) {
  sendVerificationCode(mobile: $mobile) {
    success
    isLogin
    hasPassword
    errors {
      path
      message
    }
  }
}
    `;

/**
 * __useSendVerificationCodeQuery__
 *
 * To run a query within a React component, call `useSendVerificationCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSendVerificationCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSendVerificationCodeQuery({
 *   variables: {
 *      mobile: // value for 'mobile'
 *   },
 * });
 */
export function useSendVerificationCodeQuery(baseOptions: Apollo.QueryHookOptions<SendVerificationCodeQuery, SendVerificationCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SendVerificationCodeQuery, SendVerificationCodeQueryVariables>(SendVerificationCodeDocument, options);
      }
export function useSendVerificationCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SendVerificationCodeQuery, SendVerificationCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SendVerificationCodeQuery, SendVerificationCodeQueryVariables>(SendVerificationCodeDocument, options);
        }
export type SendVerificationCodeQueryHookResult = ReturnType<typeof useSendVerificationCodeQuery>;
export type SendVerificationCodeLazyQueryHookResult = ReturnType<typeof useSendVerificationCodeLazyQuery>;
export type SendVerificationCodeQueryResult = Apollo.QueryResult<SendVerificationCodeQuery, SendVerificationCodeQueryVariables>;