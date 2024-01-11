import "./App.css";
import NoteListPage from "./pages/NoteListPage";
import NotePage from "./pages/NotePage";
import Header from "./components/Headers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<NoteListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </div>
      </div>
      {/* header will be used inside all pages, that's why we didn't put it in a route */}
    </Router>
  );
}

export default App;
