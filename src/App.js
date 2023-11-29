//import logo from './logo.svg';
import './App.css';
import {  Route, BrowserRouter as Router ,Routes} from 'react-router-dom';

import Home from './pages/home';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes as needed */}
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
