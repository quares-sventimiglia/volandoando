  
import React from 'react';
import { gql, useQuery } from '@apollo/client';

import LaunchTile from '../components/launch-tile';
import { LAUNCH_TILE_DATA } from '../pages/launches';
import * as LaunchDetailTypes from '../pages/__generated__/LaunchDetails';
import { Loading } from '../components';

export const GET_LAUNCH = gql`
  query GetLaunch($launchId: ID!) {
    launch(id: $launchId) {
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface CartItemProps extends LaunchDetailTypes.LaunchDetailsVariables {
  fromCart?:boolean
}

const CartItem: React.FC<CartItemProps> = ({ launchId, fromCart }) => {
  const { data, loading, error } = useQuery<LaunchDetailTypes.LaunchDetails, LaunchDetailTypes.LaunchDetailsVariables>(
    GET_LAUNCH,
    { variables: { launchId } }
  );
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;
  return data.launch && <LaunchTile launch={data.launch} fromCart/>;
}

export default CartItem;