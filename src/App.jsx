import useRouteElements from "./routes/useRouteElements";
import { Toaster } from "react-hot-toast";
import HomePage from "./modules/home/HomePage/HomePage";

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
