import React from "react";
import { gql, useMutation } from "@apollo/client";
import RegistrationForm from "../components/registration-form";

import { RouteComponentProps } from "@reach/router";

export const REGISTER_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $name: String!) {
    createUser(name: $name, email: $email, password: $password) {
      success
      errors {
        message
        path
      }
    }
  }
`;

interface RegistrationProps extends RouteComponentProps {}

const Registration: React.FC<RegistrationProps> = () => {  
  const [createUser, { loading }] = useMutation(REGISTER_USER, {
  });

  return <RegistrationForm createUser={createUser} loading={loading} />;
};

export default Registration;
