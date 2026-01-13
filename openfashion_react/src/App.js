import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <div>
        <Navbar />
        <AppRoutes />
      </div>
    </>
  );
}
