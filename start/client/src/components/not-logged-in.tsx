import { Link } from "@reach/router";
import React from "react";
import { Button } from "semantic-ui-react";

const NotLoggedIn: React.FC = () => {
  return (
    <Link to="/login">
      <Button fluid color="purple" size="big">
        You are not logged in, please click me and login.
      </Button>
    </Link>
  );
};

export default NotLoggedIn;
