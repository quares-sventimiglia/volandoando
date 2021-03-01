import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import { gql, useQuery } from "@apollo/client";
import { LAUNCH_TILE_DATA } from "./launches";
import { Header, LaunchTile, Loading } from "../components";
import launchTile from "../components/launch-tile";

interface ProfileProps extends RouteComponentProps {}

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface ProfileProps extends RouteComponentProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { data, loading, error } = useQuery(GET_MY_TRIPS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data || data === undefined) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map((trip: any) => (
          <LaunchTile key={trip.id} launch={trip} />
        ))
      ) : (
        <h2>You don't have trips booked</h2>
      )}
    </Fragment>
  );
};

export default Profile;
