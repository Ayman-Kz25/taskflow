import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import InProgressPage from "./pages/InProgressPage";
import CompletedPage from "./pages/CompletedPage";
import CalendarPage from "./pages/CalendarPage"
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/in-progress" element={<InProgressPage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
