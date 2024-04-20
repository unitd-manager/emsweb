//import logo from './logo.svg';
import './App.css';
import {  Route, BrowserRouter as Router ,Routes} from 'react-router-dom';

import Home from './pages/home';
import BlogDetails from './pages/BlogDetails';
import ServiceDetails from './pages/ServiceDetails';
import TeamPage from './pages/TeamPage';
import Events from './pages/Events';
import EventsEdit from './pages/EventsEdit';
import Ahlubaith from './pages/Ahlubaith';
import Kolgaigal from './pages/Kolgaigal';
import Thandhainayagam from './pages/Thandhainayagam';

function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes as needed */}
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/service-details" element={<ServiceDetails />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/EventsEdit/:id" element={<EventsEdit />} />
          <Route path="/Ahlubaith" element={<Ahlubaith />} />
          <Route path="/Kolgaigal" element={<Kolgaigal/>} />
          <Route path="/Thandhainayagam" element={<Thandhainayagam/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
