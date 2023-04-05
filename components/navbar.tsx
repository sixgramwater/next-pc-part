import React from "react";
import styles from "@/styles/navbar.module.scss";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarInner}>
        <div className={styles.logo}>
          <Image src='/logo(1).png' alt="Zyrex" width={130} height={45}/>
          <span></span>
        </div>
        <div className={styles.navRight}>
          <div className={styles.navItem}>
            <span>Builder</span>
          </div>
          <div className={styles.navItem}>
            <span>Forum</span>
          </div>
          <div className={styles.navItem}>
            <span>Personal</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
