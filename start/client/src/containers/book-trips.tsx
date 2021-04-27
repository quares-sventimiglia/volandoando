import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "semantic-ui-react";

import { Loading } from "../components";
import { GET_ALL_LAUNCHES } from "./action-button";

export const BOOK_ALL = gql`
  mutation BookAll {
    bookAll {
      message
      success
    }
  }
`;

const BookTrips: React.FC = () => {
  const [bookAll, { data, loading }] = useMutation(BOOK_ALL, {
    refetchQueries: [{ query: GET_ALL_LAUNCHES }],
  });

  if (loading) return <Loading />;

  return data && data.bookTrips && !data.bookTrips.success ? (
    <p data-testid="message">{data.bookTrips.message}</p>
  ) : (
    <Button
      onClick={async () => {
        await bookAll();
      }}
      data-testid="book-button"
      color="purple"
      size="big"
      style={{
        marginTop: "1em"
      }}
    >
      Book All
    </Button>
  );
};

export default BookTrips;
