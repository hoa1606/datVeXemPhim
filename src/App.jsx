import useRouteElements from "./routes/useRouteElements";
import { Toaster } from "react-hot-toast";
import HomePage from "./modules/home/HomePage/HomePage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const routeElement = useRouteElements();
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {routeElement}
      </LocalizationProvider>
      <Toaster />
    </div>
  );
}

export default App;
