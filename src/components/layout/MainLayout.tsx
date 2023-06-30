import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./styles.module.scss";

interface MainLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles["main-layout-container"]}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
