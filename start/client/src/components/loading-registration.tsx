import React, { useState } from "react";
import styled, { css } from "react-emotion";

import Button from "./button";
import galaxy from "../assets/images/galaxy.jpg";
import { colors, unit } from "../styles";
import Loading from "./loading";

const LoadingRegistration = () => {

  return (
    <Container>
      <Heading>Loading ...</Heading>
      <StyledForm>
        <Loading></Loading>
      </StyledForm>
    </Container>
  );
};

export default LoadingRegistration;

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexGrow: 1,
  paddingBottom: unit * 6,
  color: "white",
  backgroundColor: colors.primary,
  backgroundImage: `url(${galaxy})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh"
});

const Heading = styled("h1")({
  margin: `${unit * 3}px 0 ${unit * 6}px`,
});

const StyledForm = styled("form")({
  width: "100%",
  maxWidth: 406,
  padding: unit * 3.5,
  borderRadius: 3,
  boxShadow: "6px 6px 1px rgba(0, 0, 0, 0.25)",
  color: colors.text,
  backgroundColor: "white",
});

