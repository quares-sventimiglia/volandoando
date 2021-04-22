import React from "react";
import { gql, useQuery } from "@apollo/client";

import { LAUNCH_TILE_DATA } from "./launches";
import { Loading, Header, LaunchDetail, Footer } from "../components";
import { ActionButton } from "../containers";
import { RouteComponentProps } from "@reach/router";
import styled from 'react-emotion'

import * as LaunchDetailsTypes from "./__generated__/LaunchDetails";

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface LaunchProps extends RouteComponentProps {
  launchId?: any;
}

const Launch: React.FC<LaunchProps> = ({ launchId }) => {
  const { data, loading, error } = useQuery<
    LaunchDetailsTypes.LaunchDetails,
    LaunchDetailsTypes.LaunchDetailsVariables
  >(GET_LAUNCH_DETAILS, { variables: { launchId } });

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Container>
      <Header
        image={
          data.launch && data.launch.mission && data.launch.mission.missionPatch
        }
      >
        {data && data.launch && data.launch.mission && data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
      <Footer />

    </Container>
  );
};

export default Launch;

const Container = styled(`div`)({
  width: '100%',
  height: '100vh',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column'
})