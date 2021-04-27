import React, { useState } from "react";
import styled from "react-emotion";
import { Button, Message } from "semantic-ui-react";
import galaxy from "../assets/images/galaxy.jpg";
import RegistrationCompleted from "../components/registration-completed";


import { colors, unit } from "../styles";

const RegistrationForm = ({ createUser, loading }: any) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<any>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const hasInputValues = (): boolean => {
    return Boolean(values.name && values.email && values.password);
  };

  const parsedErrorsToShow = (errors: [{path: string, message: string}]): any => {
    return errors.map(error => `${error.path}: ${error.message}`)
  }

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const { data } = await createUser({
        variables: {
          email: values.email,
          password: values.password,
          name: values.name,
        },
      });
      const { errors, success } = data.createUser;
      setSuccess(success);
      setErrors(errors);
    } catch (e) {
      console.log("ERRRROOR", e);
    }
  };
  
  if (success) return <RegistrationCompleted/>
  return (
    <Container>
      <Heading>Registration</Heading>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput
          required
          type="name"
          name="name"
          placeholder="Name"
          data-testid="registration-input"
          onChange={onChange}
        />
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
            header="There was some errors with your registration"
            list={parsedErrorsToShow(errors)}
          />
        ) : null}
        <Button
          disabled={!hasInputValues()}
          fluid
          type="submit"
          color="purple"
          size="big"
          loading={loading}
        >
          Sign Up
        </Button>
      </StyledForm>
    </Container>
  );
};

export default RegistrationForm;

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
  marginTop: "2rem !important"
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
