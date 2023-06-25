import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
// import {
//   CompanyPublicJobPositionsQuery,
//   FavJobPositionsQuery,
//   GetCompaniesListQuery,
//   GetCompanyJobPositionsQuery,
//   GetCompanyOperatorsQuery,
//   GetJobPositionsListQuery,
//   GetPaymentsHistoryQuery,
//   GetUsersListQuery,
//   SentCvHistoryQuery,
// } from "./generated/graphql";
const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Apollo-Require-Preflight": "true",
    "Access-Control-Allow-Origin": "*",
  },
  credentials: "include",
  fetch,
});

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  link: ApolloLink.from([uploadLink]),
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      //   Query: {
      //     fields: {
      //       getConversationMessages: offsetLimitPagination(["conversationId"]),
      //       getAcceptedCompanies: offsetLimitPagination(),
      //       getJobPositionsList: {
      //         keyArgs: ["status"],
      //         merge(
      //           _:
      //             | GetCompanyJobPositionsQuery["getCompanyJobPositions"]
      //             | undefined,
      //           incoming:
      //             | GetJobPositionsListQuery["getJobPositionsList"]
      //             | undefined
      //         ): GetJobPositionsListQuery["getJobPositionsList"] {
      //           return incoming;
      //         },
      //       },
      //       getPaymentsHistory: {
      //         merge(
      //           _: GetPaymentsHistoryQuery["getPaymentsHistory"] | undefined,
      //           incoming:
      //             | GetPaymentsHistoryQuery["getPaymentsHistory"]
      //             | undefined
      //         ): GetPaymentsHistoryQuery["getPaymentsHistory"] {
      //           return incoming;
      //         },
      //       },
      //       GetUsersList: {
      //         keyArgs: ["user_role_id"],
      //         merge(
      //           _: GetUsersListQuery["getUsersList"] | undefined,
      //           incoming: GetUsersListQuery["getUsersList"] | undefined
      //         ): GetUsersListQuery["getUsersList"] {
      //           return incoming;
      //         },
      //       },
      //       getCompanyJobPositions: {
      //         keyArgs: ["status"],
      //         merge(
      //           _:
      //             | GetCompanyJobPositionsQuery["getCompanyJobPositions"]
      //             | undefined,
      //           incoming:
      //             | GetCompanyJobPositionsQuery["getCompanyJobPositions"]
      //             | undefined
      //         ): GetCompanyJobPositionsQuery["getCompanyJobPositions"] {
      //           return incoming;
      //         },
      //       },
      //       sentCvHistory: {
      //         keyArgs: ["status", "orderBy"],
      //         merge(
      //           _: SentCvHistoryQuery["sentCvHistory"] | undefined,
      //           incoming: SentCvHistoryQuery["sentCvHistory"] | undefined,
      //           { args: { offset = 0 } }
      //         ): SentCvHistoryQuery["sentCvHistory"] {
      //           return incoming;
      //         },
      //       },
      //       getCompaniesList: {
      //         keyArgs: ["status", "orderBy"],
      //         merge(
      //           _: GetCompaniesListQuery["getCompaniesList"] | undefined,
      //           incoming: GetCompaniesListQuery["getCompaniesList"] | undefined,
      //           { args: { offset = 0 } }
      //         ): GetCompaniesListQuery["getCompaniesList"] {
      //           return incoming;
      //         },
      //       },
      //       favJobPositions: {
      //         keyArgs: ["status", "orderBy"],
      //         merge(
      //           _: FavJobPositionsQuery["favJobPositions"] | undefined,
      //           incoming: FavJobPositionsQuery["favJobPositions"] | undefined,
      //           { args: { offset = 0 } }
      //         ): FavJobPositionsQuery["favJobPositions"] {
      //           return incoming;
      //         },
      //       },
      //       companyPublicJobPositions: {
      //         merge(
      //           _: FavJobPositionsQuery["favJobPositions"] | undefined,
      //           incoming:
      //             | CompanyPublicJobPositionsQuery["companyPublicJobPositions"]
      //             | undefined
      //         ): CompanyPublicJobPositionsQuery["companyPublicJobPositions"] {
      //           return incoming;
      //         },
      //       },
      //       getCompanyOperators: {
      //         keyArgs: [],
      //         merge(
      //           _: GetCompanyOperatorsQuery["getCompanyOperators"] | undefined,
      //           incoming:
      //             | GetCompanyOperatorsQuery["getCompanyOperators"]
      //             | undefined,
      //           { args: { offset = 0 } }
      //         ): GetCompanyOperatorsQuery["getCompanyOperators"] {
      //           return incoming;
      //         },
      //       },
      //     },
      //   },
    },
  }),
});

export default apolloClient;
