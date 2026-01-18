import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div className="container">
      {/* Top Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
