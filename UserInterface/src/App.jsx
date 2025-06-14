// We are importing three components from a folder called 'components': Navbar, Sidebar, and Home
import { Navbar, Sidebar, Home } from "./components";

// From react-router-dom, we bring in "Outlet". This is a placeholder where other pages will be shown inside this layout.
import { Outlet } from 'react-router-dom';

// These two React tools help us store values (useState) and run side-effects (useEffect) like reacting to screen size.
import { useState, useEffect } from "react";

function App() {
  // We are creating a variable called isOpen to track if the sidebar should be visible or not.
  // By default, it starts as true, meaning the sidebar is visible.
  const [isOpen, setIsOpen] = useState(true);

  // This part runs once when the app starts (because of the empty [] dependency).
  // It also sets up a listener that watches if the screen is resized.
  useEffect(() => {
    // This function checks how wide the screen is.
    // If it's less than 768 pixels (like on a phone), we hide the sidebar.
    // Otherwise, on big screens, we keep it visible.
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);  // Hide sidebar
      } else {
        setIsOpen(true);   // Show sidebar
      }
    };

    // Start watching for resize events
    window.addEventListener('resize', handleResize);

    // Run the check right away to set the correct sidebar state
    handleResize();

    // Cleanup: When this component goes away, stop watching for resize
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Run this once when component loads

  return (
    <>
      {/* The Navbar stays at the top. We pass a function that toggles the sidebar when a button is clicked. */}
      <Navbar openChange={() => setIsOpen(prev => !prev)} />

      {/* This is the wrapper that holds both the Sidebar and main content.
          It uses Tailwind classes to make it look nice and behave responsively. */}
      <div className={`flex pt-8 overflow-hidden bg-gray-50`}>
        
        {/* Sidebar appears based on isOpen value. If isOpen is true, it shows. If false, it's hidden. */}
        <Sidebar hidden={isOpen} />

        {/* This is the space where all the main content appears.
            We give it extra left margin if the sidebar is open (so it doesn't overlap).
            On large screens, lg:ml-52 gives space. On small ones, it's ml-0 (no margin). */}
        <div
          id="main-content"
          className={`relative w-full h-full overflow-y-auto bg-gray-50 ${isOpen ? "lg:ml-52" : "ml-0"}`}
        >
          <main>
            {/* Outlet is a special tag that acts like a gate.
                Whatever page is supposed to show (like Home, Videos, etc.), appears here. */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

// Finally, we make this component usable by others by exporting it.
export default App;
