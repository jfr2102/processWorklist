// import Box from "@mui/material/Box";
import Worklist from "./Views/Worklist";
import { Routes, Route } from "react-router-dom";
import OrderChainSaw from "./Forms/OrderChainSaw";
import CheckParts from "./Forms/CheckParts";
import RecieveFeedback from "./Forms/RecieveFeedback";
function App() {
  const baseUrl = "/ports/8123/";
  return (
    <div>
      <Routes>
        <Route
          strict
          path={baseUrl}
          element={
            <div>
              <p>UI: /ui</p>
              <p>Organizationmodel: /orgmodel</p>
            </div>
          }
        />
        <Route path={baseUrl + "ui"} element={<Worklist></Worklist>} />
        <Route path={baseUrl + "orderchainsaw"} element={<OrderChainSaw></OrderChainSaw>} />
        <Route path={baseUrl + "checkParts"} element={<CheckParts></CheckParts>} />
        <Route path={baseUrl + "recieveFeedback"} element={<RecieveFeedback></RecieveFeedback>} />
      </Routes>
    </div>
  );
}

export default App;
