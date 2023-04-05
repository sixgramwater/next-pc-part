import React, { useState } from "react";
import styles from "@/styles/builder.module.scss";
import BuilderTable, { DataType, typeType } from "@/components/builderTable";
import PartEditor from "@/components/partEditor";
import { Button, Modal, Switch, message } from "antd";
import { partsState } from "@/store";
import { useRecoilState } from "recoil";
import PartView, { PartType } from "@/components/partViewer";
import { AiOutlineDatabase, AiOutlineShareAlt } from "react-icons/ai";
import Tabs from "@/components/tabs";

const data: DataType[] = [
  {
    type: "CPU",
    empty: false,
    name: "AMD 5700x",
    price: 1349,
    where: "京东",
    img: "https://img12.360buyimg.com/n1/s450x450_jfs/t1/220364/12/15438/167638/623ad3f4E8cf3007b/4565f2a19edd9c6f.jpg.avif",
    url: "https://item.jd.com/100020455567.html",
  },
  {
    type: "主板",
    empty: true,
  },
  {
    type: "板U",
    empty: true,
  },
  {
    type: "显卡",
    empty: true,
  },
  {
    type: "内存",
    empty: true,
  },
  {
    type: "固态",
    empty: true,
  },
  // {
  //   type: '机械',
  //   empty: true,
  // },
  {
    type: "散热器",
    empty: true,
  },
  {
    type: "电源",
    empty: true,
  },
  {
    type: "机箱",
    empty: true,
  },
];

export default function Builder() {
  // const [sum, setSum] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  // parts为所有数据库中部件的list
  const [parts, setParts] = useRecoilState(partsState);
  // curParts为配置单条目
  const [curParts, setCurParts] = useState<DataType[]>(data);
  const [curRowIndex, setCurRowIndex] = useState<number>(0);
  const [curChosenPart, setChosenPart] = useState<PartType | null>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isSingleMode, setIsSingleMode] = useState(true);
  const renderedParts = curParts.filter((item) => {
    if (isSingleMode) {
      return item.type !== "板U";
    } else {
      return item.type !== "CPU" && item.type !== "主板";
    }
  });
  const sum = curParts.reduce(
    (pre, cur) => (cur.price ? pre + Number(cur.price) : pre),
    0
  );

  const handleFinishAddPart = (values: any) => {
    setParts((item) => [values].concat(item));
    messageApi.success("成功添加至数据库");
    setShowAddModal(false);
  };

  const handleToggleChoose = (row: DataType, rowIndex: number) => {
    // setChosenPart(row);
    setShowViewModal(true);
    setCurRowIndex(rowIndex);
    // setCurType(type);
  };

  const handleToggleRemove = (rowIndex: number) => {
    curParts[rowIndex] = {
      type: curParts[rowIndex].type,
      empty: true,
    };
    setCurParts(curParts.slice(0));
    messageApi.success("成功删除");
  };

  const handleCloseChoose = () => {
    setShowViewModal(false);
  };

  const handleFinishChoose = () => {
    setShowViewModal(false);
    if (!curChosenPart) return;
    if (typeof curRowIndex !== "number") return;
    curParts[curRowIndex] = {
      // type: curChosenPart.type,
      empty: false,
      ...curChosenPart,
    };
    setCurParts(curParts.slice(0));
    setChosenPart(null);
    messageApi.success("添加成功");
  };
  const handleChooseData = (item: PartType) => {
    setChosenPart(item);
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };
  const handleSwitchChange = (checked: boolean) => {
    setIsSingleMode(!checked);
  };

  return (
    <>
      {contextHolder}

      <div className={styles.builderPage}>
        <div className={styles.header}>
          {/* <div className={styles.}></div> */}
          <h2>新配置方案</h2>
          <div className={styles.options}>
            <span style={{ fontSize: "13px", color: "GrayText" }}>
              板U模式：
            </span>
            <Switch
              onChange={handleSwitchChange}
              style={{ marginRight: "6px", transform: "translateY(-1px)" }}
              size="small"
            />
            <div className={styles.btn}>
              <AiOutlineShareAlt size={20} />
            </div>
            <div className={styles.btn} onClick={handleOpenAddModal}>
              <AiOutlineDatabase size={20} />
            </div>
          </div>
        </div>
        <div className={styles.table}>
          <BuilderTable
            data={curParts}
            onToggleChoose={handleToggleChoose}
            onToggleRemove={handleToggleRemove}
          />
        </div>
        <div className={styles.footer}>
          <span>总计: ￥{sum}</span>
        </div>
        <div className={styles.tabsContainer}>
          <Tabs />
        </div>
        {/* <div className={styles.sep}></div> */}

        <Modal
          open={showViewModal}
          onOk={handleFinishChoose}
          onCancel={handleCloseChoose}
          okButtonProps={{ disabled: curChosenPart === null }}
        >
          <PartView
            type={curParts[curRowIndex].type}
            data={parts}
            onChoose={handleChooseData}
          />
        </Modal>
        <Modal
          open={showAddModal}
          width={750}
          footer={null}
          onCancel={() => {
            setShowAddModal(false);
          }}
          bodyStyle={{ marginTop: "20px" }}
        >
          <PartEditor onFinish={handleFinishAddPart} />
        </Modal>
      </div>
    </>
  );
}
