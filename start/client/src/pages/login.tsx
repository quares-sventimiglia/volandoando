import React from "react";
import { gql, useMutation } from "@apollo/client";

import { LoginForm } from "../components";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      token
      errors {
        message
        path
      }
    }
  }
`;

const Login: React.FC<any> = () => {
  const [login, { client,loading, error }] = useMutation(LOGIN_USER);

  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} loading={loading} client={client}/>;
};

export default Login;
