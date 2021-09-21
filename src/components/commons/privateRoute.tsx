import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
  component: any;
  exact: boolean;
  path: string;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const { keycloak, initialized } = useKeycloak();

  if (keycloak.authenticated || process.env.REACT_APP_DISABLE_AUTH) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}
