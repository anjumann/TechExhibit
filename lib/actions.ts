import { createUserMutation, getUserQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : "http://127.0.0.1:4000/graphql";
const apiKey =  isProduction? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : "1234567890";

const serveUrl = isProduction? process.env.NEXT_PUBLIC_SERVE_URL || '' : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);
const makeGraphQLRequest = async (query: string, variables={}) => {
    try{

        return await client.request(query, variables)

    }catch(error){
        console.log(error);
        throw error
    }
}

export const getUser = async (email: string) => {
    client.setHeader('x-api-key', apiKey)
    return await makeGraphQLRequest(getUserQuery, {email})
}


export const createUser = (name: string, email: string, avatarUrl: string) => {
    
    client.setHeader("x-api-key", apiKey);
    const variables = {
      input: {
        name: name,
        email: email,
        avatarUrl: avatarUrl
      },
    };
    
    return makeGraphQLRequest(createUserMutation, variables);
  };