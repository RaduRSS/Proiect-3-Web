import { Route, Routes } from "react-router-dom";
import LogIn from "./Components/FrontPage/LogIn";
import Register from "./Components/FrontPage/Register";
import Main from "./Components/MainPage/Main";
import Profile from "./Components/SecondaryPage/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
