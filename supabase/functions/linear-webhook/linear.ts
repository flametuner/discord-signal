import {
  gql,
  GraphQLClient,
} from "https://deno.land/x/graphql_request@v4.1.0/mod.ts";
import { LINEAR_ENDPOINT } from "./consts.ts";
import { UserQuery } from "./types.ts";

const userInfoQuery = gql`
  query User($userId: String!) {
    user(id: $userId) {
      id
      email
      name
    }
  }
`;

function createLinearClient(token: string) {
  return new GraphQLClient(LINEAR_ENDPOINT, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export function LinearClient(token: string) {
  const client = createLinearClient(token);

  async function getUserById(userId: string) {
    const { user } = await client.request<UserQuery>(userInfoQuery, { userId });
    return user;
  }

  return {
    getUserById,
  };
}
