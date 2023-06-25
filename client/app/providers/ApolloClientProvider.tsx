"use client";
import { ApolloProvider } from "@apollo/client";
import { FC } from "react";
import apolloClient from "../lib/apollo-client";
interface ApolloProviderProps {
  children: any;
}

const ApolloClientProvider: FC<ApolloProviderProps> = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
export default ApolloClientProvider;
