import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import Header from "./Components/Sheard/Header/Header";

function App() {
  return (
    <>
      <Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </Header>
    </>
  );
}

export default App;
