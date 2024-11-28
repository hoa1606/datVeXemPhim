import useRouteElements from "./routes/useRouteElements";
import { Toaster } from "react-hot-toast";

function App() {
  const routeElement = useRouteElements();
  return (
    <div>
      {routeElement}
      <Toaster />
    </div>
  );
}

export default App;
