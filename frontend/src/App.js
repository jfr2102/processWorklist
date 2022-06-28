// import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
function App() {
  const baseUrl = "/ports/8123/"
  return <div>
    <Routes>
                    <Route strict path={baseUrl} element={<div><p>HOME</p></div>} />
                    <Route path={baseUrl + "worklist"} element={<div><p>WORKLIST</p></div>} />
    </Routes>

  </div>;

}

export default App;
