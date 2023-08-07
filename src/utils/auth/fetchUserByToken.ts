import client from "@/GraphqlClient/client";
import { getUserByTokenQuery } from "@/queries/queries";
import { QueryOptions } from "@apollo/client";
import { User } from '@/interfaces/User';



// Function to fetch the user from the server using the token and refreshToken
export const fetchUserByToken = (token: string, refreshToken: string): Promise<User> => {  

    const options: QueryOptions = {
        query: getUserByTokenQuery,
        variables: {
          token,
          refreshToken,
        },
      };
    return new Promise((resolve, reject) => {
      client
        .query(options)
        .then((response) => {
          const user = response.data.getUserByToken.user;
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };