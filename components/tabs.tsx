import React from "react";
import styles from "@/styles/tabs.module.scss";
import { AiOutlinePlus } from "react-icons/ai";

const TabItem = () => {
  return (
    <div className={styles.tabItem}>
      <div className={styles.title}>
        <span>新配置方案</span>
      </div>
      <div className={styles.preview}></div>
      <div className={styles.price}>￥8960</div>
    </div>
  );
};

const Tabs: React.FC = () => {
  return (
    <div className={styles.tabs}>
      <TabItem />
      <TabItem />
      <div className={styles.newTabItem}>
        <AiOutlinePlus size={26}/>
      </div>
      {/* <TabItem /> */}
    </div>
  );
};

export default Tabs;
