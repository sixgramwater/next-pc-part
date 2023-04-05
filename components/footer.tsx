import React from "react";
import Navbar from "./navbar";
import styles from '@/styles/layout.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerText}>Made By SixGramWater</div>
    </div>
  );
};

export default Footer;
