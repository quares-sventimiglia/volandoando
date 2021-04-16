import React from "react";
import styled from "react-emotion";

import { menuItemClassName } from "../components/menu-item";

import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";

const LogoutButton = () => {
  return (
    <StyledButton data-testid="logout-button">
      <ExitIcon />
      Logout
    </StyledButton>
  );
};

export default LogoutButton;

const StyledButton = styled("button")(menuItemClassName, {
  background: "none",
  border: "none",
  padding: 0,
});
