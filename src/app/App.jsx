
import { BrowserRouter } from "react-router-dom";
import AuthInit from "../features/auth/AuthInit";
import AppRoutes from "./AppRoutes";
import { Toaster } from "react-hot-toast"; // ✅ Add this import

function App() {
  return (
    <BrowserRouter>
      <AuthInit>
        <AppRoutes />
        <Toaster // ✅ Add this component
          position="top-right"
          toastOptions={{
            duration: 3000,
            success: {
              style: {
                background: "#22c55e",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#ef4444",
                color: "#fff",
              },
            },
          }}
        />
      </AuthInit>
    </BrowserRouter>
  );
}

export default App;