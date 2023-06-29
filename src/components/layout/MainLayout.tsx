import Header from "../header/Header";
import Footer from "../footer/Footer";

interface MainLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
