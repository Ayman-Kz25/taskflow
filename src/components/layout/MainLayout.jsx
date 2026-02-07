import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  }
  return (
    <div className="container">
      {/* Top Header */}
      <Header onToggleSidebar={toggleSidebar} />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} isClose={closeSidebar}/>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
