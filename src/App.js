import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import News from "./components/News";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Bengali from "./components/Bengali";
import Health from "./components/health/Health";
import Tech from "./components/tech/Tech";
import TechArticle from "./components/techarticle/TechArticle";
import Space from "./components/space/Space";
import Sports from "./components/sports/Sports";
import Cricket from "./components/cricket/Cricket";
import Football from "./components/Football/Football";
import Entertainment from "./components/entertainment/Entertainment";
import Politics from "./components/politics/Politics";
import Registration from "./components/Registration/Registration";
import Login from "./components/login/Login";
import { UserProvider } from "./components/context/UserContext";
import User from "./components/userdetails/User";
import Logout from "./components/Logout/Logout";
import CryptoDashboard from "./components/crypto/CryptoDashboard";
import ContactUsPage from "./components/Contactus/Contact";
import WeatherApp from "./components/Weather/WeatherApp";
import AboutUs from "./components/Aboutus/AboutUs";
import PicOfDayDetails from "./components/picofday/PicOfDayDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            {/* <Route path="/user/logout" element={<Logout />}></Route> */}
          </Routes>

          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/contactus" element={<ContactUsPage/>}></Route>
            <Route path="/aboutus" element={<AboutUs/>}></Route>
            <Route path="/pic-of-day-details" element={<PicOfDayDetails/>}></Route>
            <Route path="/crypto" element={<CryptoDashboard  />}></Route>
            <Route path="/weather" element={<WeatherApp/>}></Route>
            <Route path="/news" element={<News />}></Route>
            <Route path="/user/info" element={<User/>}></Route>
            <Route path="/bengali" element={<Bengali />}></Route>
            <Route path="/health" element={<Health />}></Route>
            <Route path="/tech" element={<Tech />}></Route>
            <Route path="/space" element={<Space />}></Route>
            <Route path="/sports" element={<Sports />}></Route>
            <Route path="/entertainment" element={<Entertainment />}></Route>
            <Route path="/politics" element={<Politics />}></Route>
            <Route path="/sports/cricket" element={<Cricket />}></Route>
            <Route path="/sports/football" element={<Football />}></Route>
            <Route path="/article/:articleId" element={<TechArticle />} />
            <Route path="/bengali/:pageNo" element={<Bengali />} />
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
