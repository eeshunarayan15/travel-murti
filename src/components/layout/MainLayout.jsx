// import { Outlet, useLocation } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import SubNavbar from "./SubNavbar";
// import ContactForm from "../common/ContactForm";
// import ChatBot from "../../features/chatbot/ChatBot";

// const HIDDEN_LAYOUT_ROUTES = [
//   "/admin",
//   "/employee",
// ];

// function MainLayout() {
//   const { pathname } = useLocation();

//   // Hide layout for admin & employee routes (including nested)
//   const hideLayout = HIDDEN_LAYOUT_ROUTES.some((route) =>
//     pathname.startsWith(route)
//   );

//   return (
//     <>
//       {/* Top bars */}
//       {!hideLayout && <SubNavbar />}
//       {!hideLayout && <Navbar />}

//       {/* Page Content */}
//       <main className={!hideLayout ? "pt-0" : ""}>
//         <Outlet />
//       </main>

//       {/* Extras */}
//       {!hideLayout && <ChatBot />}
//       {!hideLayout && <ContactForm />}
//       {!hideLayout && <Footer />}
//     </>
//   );
// }

// export default MainLayout;
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubNavbar from "./SubNavbar";
import ContactForm from "../common/ContactForm";
import ChatBot from "../../features/chatbot/ChatBot";

function MainLayout() {
  return (
    <>
      <SubNavbar />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <ChatBot />
      <ContactForm />
      <Footer />
    </>
  );
}

export default MainLayout;