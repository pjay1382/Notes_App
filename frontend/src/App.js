import {
  HashRouter as Router,
  Route,
  Routes
 } from "react-router-dom";
import './App.css';
import Header from './components/Header.tsx'
import NotesListPage from './pages/NotesListPage.tsx'
import NotePage from './pages/NotePage.tsx'

function App() {
  return (
    <Router> 
      <div className="container dark">
        <div className="app">
          <Header/>
          <Routes>
            <Route path="/" exact element={<NotesListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
