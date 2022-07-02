// import Box from "@mui/material/Box";
import { useState } from "react";
import Worklist from "./Views/Worklist";
import { Routes, Route } from "react-router-dom";
import OrderChainSaw from "./Forms/OrderChainSaw";
import CheckParts from "./Forms/CheckParts";
import RecieveFeedback from "./Forms/RecieveFeedback";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
function App() {
  const [processContext, setProcessContext] = useState({});
  const [user, setUser] = useState("");
  const local = true;
  const [host, setHost] = useState(
    local ? "http://localhost:22666" : "https://lehre.bpm.in.tum.de/ports/22666"
  );
  const baseUrl = "/ports/8123/";

  return (
    <div>
      <Routes>
        <Route
          strict
          path={baseUrl}
          element={
            <Stack>
              <Link to={baseUrl + "ui"}> Worklist UI</Link>
              <a href={host + "/orgmodel"}> Organization model (queries MongoDB)</a>
            </Stack>
          }
        />
        <Route
          path={baseUrl + "ui"}
          element={
            <Worklist
              setProcessContext={setProcessContext}
              user={user}
              setUser={setUser}
              host={host}
            />
          }
        />
        <Route
          path={baseUrl + "orderchainsaw"}
          element={
            <OrderChainSaw
              processContext={processContext}
              setProcessContext={setProcessContext}
              host={host}
            />
          }
        />
        <Route
          path={baseUrl + "checkParts"}
          element={
            <CheckParts
              processContext={processContext}
              setProcessContext={setProcessContext}
              host={host}
            />
          }
        />
        <Route
          path={baseUrl + "recieveFeedback"}
          element={
            <RecieveFeedback
              processContext={processContext}
              setProcessContext={setProcessContext}
              host={host}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
