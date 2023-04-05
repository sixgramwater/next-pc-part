import React from "react";
import { Space, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "@/styles/builder.module.scss";

type whereType = "淘宝" | "京东" | "拼多多";
export type typeType =
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

export interface DataType {
  type: typeType;
  empty: boolean;
  name?: string;
  price?: number;
  where?: whereType;
  img?: string;
  url?: string;
  required?: boolean;
}

// const data: DataType[] = [
//   {
//     type: "CPU",
//     empty: false,
//     name: "AMD 5700x",
//     price: 1349,
//     where: "京东",
//     img: "https://img12.360buyimg.com/n1/s450x450_jfs/t1/220364/12/15438/167638/623ad3f4E8cf3007b/4565f2a19edd9c6f.jpg.avif",
//     url: "https://item.jd.com/100020455567.html",
//   },
//   {
//     type: "主板",
//     empty: true,
//   },
//   {
//     type: "显卡",
//     empty: true,
//   },
//   {
//     type: "内存",
//     empty: true,
//   },
//   {
//     type: "固态",
//     empty: true,
//   },
//   // {
//   //   type: '机械',
//   //   empty: true,
//   // },
//   {
//     type: "散热器",
//     empty: true,
//   },
//   {
//     type: "机箱",
//     empty: true,
//   },
// ];

interface BuilderTableProps {
  onToggleChoose: (row: DataType, rowIndex: number) => void;
  onToggleRemove: (rowIndex: number) => void;
  data: DataType[];
}

const BuilderTable: React.FC<BuilderTableProps> = ({
  data,
  onToggleChoose,
  onToggleRemove,
}) => {
  const columns: ColumnsType<DataType> = [
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
      render: (_, record, index) => {
        if (record.empty) {
          return (
            <Button
              type="link"
              onClick={() => handleClickChoosebtn(record, index)}
            >
              Choose from Database
            </Button>
          );
        }
        return record.img ? (
          <div className={styles.tableCell}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={record.img} width={80} height={80} alt="img" />
            {/* <Image  src={record.url} /> */}
            {/* <Image src={record.url} width={80} height={80} alt="img"/> */}
            <div className={styles.label} style={{marginLeft: '8px'}}>{record.name}</div>
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
      title: "平台",
      dataIndex: "where",
      key: "where",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Button onClick={() => onToggleRemove(index)}>Remove</Button>
        </Space>
      ),
    },
  ];
  const handleClickChoosebtn = (row: DataType, index: number) => {
    onToggleChoose && onToggleChoose(row, index);
  };
  // const handleTableChange = () => {
  //   console.log('change');
  //   let sum = 0;
  //   data.forEach((item) => {
  //     if (!item.empty && item.price) {
  //       sum += item.price;
  //     }
  //   });

  //   console.log(sum);
  //   onSumChange(sum);
  // };
  return (
    <Table
      columns={columns}
      pagination={{ disabled: true, hideOnSinglePage: true }}
      dataSource={data}
      // onChange={handleTableChange}
      
    />
  );
};

export default BuilderTable;
