import React from "react";
import styled, { css } from "react-emotion";
import { Link } from "@reach/router";

import galaxy from "../assets/images/galaxy.jpg";
import iss from "../assets/images/iss.jpg";
import moon from "../assets/images/moon.jpg";
import blackspace from "../assets/images/blackspace.jpeg";
import flight from "../assets/images/flight.jpg";
import pexels from "../assets/images/pexels.jpeg";
import space from "../assets/images/space.jpg";
import satellite from "../assets/images/satellite.jpeg";

import { unit } from "../styles";
import { Container } from "semantic-ui-react";
import { removeLaunchToCart } from "../containers/action-button";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

export const REMOVE_TO_CART = gql`
  mutation RemoveToCart($launchId: ID!) {
    removeToCart(launchId: $launchId) {
      success
    }
  }
`;

const backgrounds = [galaxy, iss, moon, blackspace, flight, pexels, satellite, space];
export function getBackgroundImage(id: string) {
  return `url(${backgrounds[Number(id) % backgrounds.length]})`;
}

const removeLauncher = async (event: any, id: any, removeLaunch: any) => {
  event.preventDefault();
  await removeLaunchToCart(id, removeLaunch);
}

export default ({ launch, fromCart }: any) => {
  const [removeLaunch] = useMutation(REMOVE_TO_CART);
  const { id, mission, rocket } = launch;
  return (
    <Container>
      <StyledLink
        to={`/launch/${id}`}
        style={{
          backgroundImage: getBackgroundImage(id),
        }}
      >
        <HeaderCard>
          <h2 style={{ margin: 0 }}>{mission.name}</h2>
          {fromCart && (
            <Icon
              onClick={(event) => removeLauncher(event, id, removeLaunch)}
              className="big circular trash alternate outline link icon"
            ></Icon>
          )}
        </HeaderCard>
        <h3>{rocket.name}</h3>
      </StyledLink>
    </Container>
  );
};

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

export const cardClassName = css({
  padding: `${unit * 4}px ${unit * 5}px`,
  color: "white",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const padding = unit * 2;
const StyledLink = styled(Link)(cardClassName, {
  display: "block",
  height: 193,
  marginTop: padding,
  transition: "opacity 0.2s",
  textDecoration: "none",
  ":not(:last-child)": {
    marginBottom: padding * 2,
  },
  ":hover": {
    color: "white",
    opacity: 0.5,
  },
});

const HeaderCard = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

const Icon = styled("i")({
  transition: "color 0.2s ease, box-shadow 0.2s ease !important",
  color: "rgba(255 255 255/50%)",
  boxShadow: "0 0 0 0.1em rgb(255 255 255 /50%) inset !important",
  ":hover": {
    color: "rgba(255,0,17)",
    boxShadow: "0 0 0 0.1em rgb(255 0 17) inset !important",
  },
});
