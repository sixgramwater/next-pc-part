import styles from "@/styles/builder.module.scss";
import React from "react";
import { Space, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

type whereType = "淘宝" | "京东" | "拼多多";
type typeType =
  | "CPU"
  | "散热器"
  | "主板"
  | "显卡"
  | "内存"
  | "固态"
  | "机械"
  | "电源"
  | "机箱"
  | "板U";

interface itemType {}

export interface PartType {
  type: typeType;
  name: string;
  price: number;
  where: whereType;
  img?: string;
  url?: string;
}

const columns: ColumnsType<PartType> = [
  {
    title: "类别",
    dataIndex: "type",
    key: "type",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "型号",
    dataIndex: "name",
    key: "name",
    render: (_, record) => {
      return record.url ? (
        <div className={styles.tableCell}>
          <img src={record.img} width={80} height={80} alt="img" />
          {/* <Image  src={record.url} /> */}
          {/* <Image src={record.url} width={80} height={80} alt="img"/> */}
          <div className={styles.label}>{record.name}</div>
        </div>
      ) : (
        <span>{record.name}</span>
      );
    },
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price",
    render: (text) => text && `￥${text}`,
  },
  {
    title: "来源",
    dataIndex: "where",
    key: "where",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record.name}</a> */}
        <Button>Remove</Button>
      </Space>
    ),
  },
];

// const data: PartType[] = [];

interface PartViewProps {
  type: typeType;
  data: PartType[];
  onChoose: (data: PartType) => void;
}

const PartView: React.FC<PartViewProps> = (props) => {
  const { type, data, onChoose } = props;
  const showedData = data.filter((item) => (item ? item.type === type : true));
  const handleClickRow = (row: PartType) => {
    console.log(row);
    onChoose && onChoose(row);
  }
  return (
    <div className={styles.partView}>
      
      <Table
        
        columns={columns}
        // dataSource={data}
        pagination={{ disabled: true, hideOnSinglePage: true }}
        dataSource={showedData}
        onRow={(record) => {
          return {
            onClick: () => handleClickRow(record)
          }
        }}
      />
    </div>
  );
};

export default PartView;
