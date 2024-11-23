import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import useRouteElements from "./routes/useRouteElements";

function App() {
  const routeElement = useRouteElements();
  return <div>{routeElement}</div>;
}

export default App;
