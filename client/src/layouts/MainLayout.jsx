import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = ({ children, darkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;