// import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
function App() {
  return <div>
    <Routes>
                    <Route strict path="/" element={<div><p>HOME</p></div>} />
                    <Route path="/worklist" element={<div><p>WORKLIST</p></div>} />
    </Routes>

  </div>;

}

export default App;
