import React from "react";
import styled from "react-emotion";
import { Button } from "semantic-ui-react";

import galaxy from "../assets/images/galaxy.jpg";
import { colors, unit } from "../styles";
import { Link } from "@reach/router";

const RegistrationCompleted = () => {
  return (
    <Container>
      <Heading>Registration Completed</Heading>
      <StyledForm>
        <Link to="/login">
          <Button fluid color="purple" size="big">
            Go To Login
          </Button>
        </Link>
      </StyledForm>
    </Container>
  );
};

export default RegistrationCompleted;

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
  height: "100vh",
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
  a: {
    textDecoration: "none",
  },
});
