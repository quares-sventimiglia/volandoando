import React from "react";
import { useApolloClient } from "@apollo/client";
import styled from "react-emotion";

import MenuItem from "./menu-item";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as CartIcon } from "../assets/icons/cart.svg";
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";
import { colors, unit } from "../styles";


export default function Footer(props: any) {
  
  const client = useApolloClient();
  
  const signOut = () => {
    client.clearStore().then(
      () => localStorage.clear()
    );
    
  };
  return (
    <Container>
      <InnerContainer>
        <MenuItem to="/">
          <HomeIcon />
          Home
        </MenuItem>
        <MenuItem to="/cart">
          <CartIcon />
          Cart
        </MenuItem>
        <MenuItem
          onClick={async () => {
            signOut();
          }}
          to="/login"
        >
          <ExitIcon />
          Logout
        </MenuItem>
      </InnerContainer>
    </Container>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled("footer")({
  flexShrink: 0,
  marginTop: "auto",
  backgroundColor: "white",
  color: colors.textSecondary,
  position: "sticky",
  bottom: 0,
});

const InnerContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  maxWidth: 460,
  padding: unit * 2.5,
  margin: "0 auto",
});
