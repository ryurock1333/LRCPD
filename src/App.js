import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import User1 from "./Components/User1";
import Register from "./Components/Register";
import CreateUser from "./Components/CreateUser";
import UpdateUser from "./Components/UpdateUser";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Login" element={<Login />} />
        <Route path="User1" element={<User1 />} />
        <Route path="Register" element={<Register />} />
        <Route path="Create" element={<CreateUser />} />
        <Route path="Update/:id" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
