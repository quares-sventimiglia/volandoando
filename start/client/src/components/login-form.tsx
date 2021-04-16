import React, { useState } from "react";
import styled from "react-emotion";

import { Button, Message } from "semantic-ui-react";
import space from "../assets/images/space.jpg";
import { colors, unit } from "../styles";
import MenuItem from "./menu-item";
import { navigate } from "@reach/router"

const LoginForm = ({ login, loading, client }: any) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>([]);
  // const [success, setSuccess] = useState<boolean>(false)

  const hasInputValues = (): boolean => {
    return Boolean(values.email && values.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const parsedErrorsToShow = (
    errors: [{ path: string; message: string }]
  ): any => {
    return errors.map((error) => `${error.path}: ${error.message}`);
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      const { errors, success, token } = data.login;
      setErrors(errors);
      if (success) {
        localStorage.setItem("x-token", token)
        await navigate('/')
      }
    } catch (e) {
      console.log("ERRRROOR", e);
    }
  };

  return (
    <Container>
      <Heading>VolandoAndo</Heading>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput
          required
          type="email"
          name="email"
          placeholder="Email"
          data-testid="login-input"
          onChange={onChange}
        />
        <StyledInput
          required
          type="password"
          name="password"
          placeholder="Password"
          data-testid="login-input"
          onChange={onChange}
        />
        {errors.length ? (
          <Message
            error
            header="There was some errors with your login"
            list={parsedErrorsToShow(errors)}
          />
        ) : null}
        <Button
          fluid
          color="purple"
          size="big"
          type="submit"
          disabled={!hasInputValues()}
          loading={loading}
        >
          Log in
        </Button>
        <MenuItem to="/registration">
          <StyledRegistration>
            If you don't have an account, sign up.
          </StyledRegistration>
        </MenuItem>
      </StyledForm>
    </Container>
  );
};

export default LoginForm;

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
  fontSize: "13px",
  letterSpacing: "2px",
  color: colors.accent,
  marginTop: "2em !important",
  ":hover": {
    textDecoration: "underline",
  },
});
