import React from "react";
import { gql, useMutation } from "@apollo/client";

import { LoginForm, Loading } from "../components";
import * as LoginTypes from "./__generated__/login";
import { isLoggedInVar } from "../cache";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

const Login :React.FC<any> = () => {
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      console.log("LOGIIIIIIIIIIIN", login)
      localStorage.setItem('id', login.id);
      isLoggedInVar(true)
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}

export default Login;
