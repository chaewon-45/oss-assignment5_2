import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./components/Pages/ListPage";
import DetailPage from "./components/Pages/DetailPage";
import UpdatePage from "./components/Pages/UpdatePage";
import CreatePage from "./components/Pages/CreatePage";

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <h1 className="mb-4">학생 관리 React CRUD</h1>

        <Routes>
          {/* / 로 접속해도 /list 보여주기 */}
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/update/:id" element={<UpdatePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
