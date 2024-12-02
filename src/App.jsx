import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import { Outlet } from "react-router";

const App = () => {
  return (
    <main className="bg-emerald-800">
      <NavigationBar />
      <Outlet />
      <Footer />
    </main>
  );
};
export default App;
