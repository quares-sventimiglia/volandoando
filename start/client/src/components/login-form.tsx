import React, { Component } from "react";
import styled, { css } from "react-emotion";

import Button from "./button";
import space from "../assets/images/space.jpg";
import { colors, unit } from "../styles";
import MenuItem from "./menu-item";

interface LoginFormProps {
  login: (a: { variables: any }) => void;
}

interface LoginFormState {
  email: string;
  password: string;
}

export default class LoginForm extends Component<
  LoginFormProps,
  LoginFormState
> {
  state = { email: "", password: "" };

  onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = (event.target as HTMLInputElement).value;
    this.setState((s) => ({ email }));
  };

  onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = (event.target as HTMLInputElement).value;
    this.setState((s) => ({ password }));
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.login({
      variables: { email: this.state.email, password: this.state.password },
    });
  };

  render() {
    return (
      <Container>
        <Heading>VolandoAndo</Heading>
        <StyledForm onSubmit={(e) => this.onSubmit(e)}>
          <StyledInput
            required
            type="email"
            name="email"
            placeholder="Email"
            data-testid="login-input"
            onChange={(e) => this.onChangeEmail(e)}
          />
          <StyledInput
            required
            type="password"
            name="password"
            placeholder="Password"
            data-testid="login-input"
            onChange={(e) => this.onChangePassword(e)}
          />
          <Button type="submit">Log in</Button>
          <MenuItem to="/registration">
            <StyledRegistration>
              If you don't have an account, sign up.
            </StyledRegistration>
          </MenuItem>
        </StyledForm>
      </Container>
    );
  }
}

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
  backgroundImage: `url(${space})`,
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

const StyledInput = styled("input")({
  width: "100%",
  marginBottom: unit * 2,
  boxSizing: "border-box",
  padding: `${unit * 1.25}px`,
  border: `1px solid ${colors.grey}`,
  fontSize: 16,
  outline: "none",
  ":focus": {
    borderColor: colors.primary,
  },
});

const StyledRegistration = styled("p")({
  width: "100%",
  textAlign: "center",
  margin: "20px 0 0 0",
  fontSize: "14px",
  letterSpacing: "2px",
  color: colors.accent,
  ":hover": {
    textDecoration: "underline"
  }
})