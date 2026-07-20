import React from "react";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Global Header */}
      <Navbar />
      
      {/* 
        Main content area expands to fill available space.
        id="main-content" is an accessibility standard for "Skip to Content" links.
      */}
      <main id="main-content" className="relative flex flex-col flex-1 w-full outline-none">
        <AppRoutes />
      </main>
      
      {/* Global Footer */}
      <Footer />
      
    </div>
  );
}

export default App;