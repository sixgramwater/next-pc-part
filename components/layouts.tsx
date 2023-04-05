import React, { PropsWithChildren } from "react";
import Navbar from "./navbar";
import styles from '@/styles/layout.module.scss';
import Footer from "./footer";
// import { Footer } from "antd/es/layout/layout";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
