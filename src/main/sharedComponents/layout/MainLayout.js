import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNav, { COLLAPSED_WIDTH, EXPANDED_WIDTH } from "../../features/SideNav";
import MessengerBar from "../../features/MessengerBar";


const MainLayout = () => {
  const location = useLocation();
  const isMessengerRoute =
    location.pathname.startsWith("/messenger") ||
    location.pathname.startsWith("/mail-box");

  /* Mirror sidebar width — initialise from localStorage to avoid layout flash */
  const [sideNavWidth, setSideNavWidth] = useState(() => {
    try {
      return localStorage.getItem("sidenav_collapsed") === "true"
        ? COLLAPSED_WIDTH
        : EXPANDED_WIDTH;
    } catch {
      return EXPANDED_WIDTH;
    }
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav onWidthChange={setSideNavWidth} />

      <div
        className="flex flex-col bg-[#f6f6f9] overflow-hidden transition-all duration-300"
        style={{ marginLeft: sideNavWidth, flex: 1 }}
      >
        <main className="flex-1 overflow-auto px-3 pb-3">
          <Outlet />
        </main>
      </div>

      {!isMessengerRoute && <MessengerBar />}
    </div>
  );
};

export default MainLayout;
