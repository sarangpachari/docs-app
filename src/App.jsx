
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import SignUp from './pages/SignUp';

function App() {
  

  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/editor/:id" element={<Editor />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
