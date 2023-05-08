import './App.css';
import Login from "./components/login";
import Register  from './components/register';
import ReactDOM from "react-dom/client";
import Home from "./components/home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element= { <Home/>} />
      <Route path="/" element= { <Register/>} />
      <Route path="/login" element= { <Login/>} />
    </Routes>
</BrowserRouter>
  );
}

export default App;
