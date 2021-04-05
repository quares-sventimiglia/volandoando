import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import RegistrationForm from "../components/registration-form";
import LoadingRegistration from "../components/loading-registration";
import RegistrationCompleted from "../components/registration-completed";

import { RouteComponentProps } from "@reach/router";

export const REGISTER_USER = gql`
  mutation register($email: String!, $password: String!, $name: String!) {
    register(
      registerInput: { name: $name, email: $email, password: $password }
    ) {
      id
      email
      name
      token
    }
  }
`;

interface RegistrationProps extends RouteComponentProps {}

const Registration: React.FC<RegistrationProps> = () => {
  const [register, { loading, error, called }] = useMutation(REGISTER_USER);
  console.log("LOADING", error);

  if (called && loading) return <LoadingRegistration />;
  if (!called) return <RegistrationForm register={register} loading={loading} />;

  return <RegistrationCompleted/>;
};

export default Registration;
