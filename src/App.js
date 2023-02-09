import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./pages/Home"
import Footer from "./layouts/Footer"
import NavBar from "./layouts/NavBar"

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
