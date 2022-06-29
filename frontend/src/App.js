// import Box from "@mui/material/Box";
import Worklist from "./Views/Worklist";
import { Routes, Route } from "react-router-dom";
function App() {
  const baseUrl = "/ports/8123/"
  return <div>
    <Routes>
                    <Route strict path={baseUrl} element={<div><p>HOME</p></div>} />
                    <Route path={baseUrl + "ui"} element={<Worklist></Worklist>} />
    </Routes>

  </div>;

}

export default App;
