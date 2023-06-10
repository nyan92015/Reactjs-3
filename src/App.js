import Router from "./Router";
import "./App.scss";
import Header from "./Components/Header";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />;
    </BrowserRouter>
  );
}

export default App;
