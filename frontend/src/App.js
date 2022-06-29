// import Box from "@mui/material/Box";
import { useState } from "react";
import Worklist from "./Views/Worklist";
import { Routes, Route } from "react-router-dom";
import OrderChainSaw from "./Forms/OrderChainSaw";
import CheckParts from "./Forms/CheckParts";
import RecieveFeedback from "./Forms/RecieveFeedback";
function App() {
  const [processContext, setProcessContext] = useState({});
  const [user, setUser] = useState("");

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
        <Route
          path={baseUrl + "ui"}
          element={<Worklist setProcessContext={setProcessContext} user={user} setUser={setUser} />}
        />
        <Route
          path={baseUrl + "orderchainsaw"}
          element={
            <OrderChainSaw processContext={processContext} setProcessContext={setProcessContext} />
          }
        />
        <Route
          path={baseUrl + "checkParts"}
          element={
            <CheckParts processContext={processContext} setProcessContext={setProcessContext} />
          }
        />
        <Route
          path={baseUrl + "recieveFeedback"}
          element={
            <RecieveFeedback
              processContext={processContext}
              setProcessContext={setProcessContext}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
