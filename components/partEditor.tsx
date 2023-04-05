import React from "react";
import styles from "@/styles/builder.module.scss";
import { Button, Checkbox, Form, Input, Select } from "antd";



const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface PartEditorProps {
  onFinish?: (data: any) => void;
}

const PartEditor: React.FC<PartEditorProps> = (props) => {
  const { onFinish: onFinishEditor } = props;
  const onFinish = (values: any) => {
    console.log("Success:", values);
    onFinishEditor && onFinishEditor(values);
  };
  const handlePasteUrl = () => {
    // 自动解析url中信息
  }
  
  return (
    <div className={styles.partEditor}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="类型"
          name="type"
          rules={[{ required: true, message: "Please input type!" }]}
        >
          <Select
            // defaultValue="lucy"
            style={{ width: 120 }}
            // onChange={handleChangeSelect}
            options={[
              { value: "CPU", label: "CPU" },
              { value: "显卡", label: "显卡" },
              { value: "主板", label: "主板" },
              { value: "板U", label: "板U" },
              { value: "内存", label: "内存" },
              { value: "固态", label: "固态" },
              { value: "电源", label: "电源" },
              { value: "机箱", label: "机箱" },
              { value: "散热器", label: "散热器" },

              // { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="型号"
          name="name"
          rules={[{ required: true, message: "Please input type!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="价格"
          name="price"
          rules={[
            { required: true, message: "Please input price!" },
          ]}
        >
          <Input style={{ width: 120 }} prefix="￥" suffix="RMB"/>
        </Form.Item>
        <Form.Item
          label="平台"
          name="where"
          rules={[{ required: true, message: "Please select platform!" }]}
        >
          <Select
            // defaultValue="lucy"
            style={{ width: 120 }}
            // onChange={handleChangeSelect}
            options={[
              { value: "淘宝", label: "淘宝" },
              { value: "京东", label: "京东" },
              { value: "拼多多", label: "拼多多" },
              // { value: "内存", label: "内存" },
              // { value: "固态", label: "固态" },
              // { value: "电源", label: "电源" },
              // { value: "机箱", label: "机箱" },
              // { value: "散热器", label: "散热器" },

              // { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
        <Form.Item
          label="来源"
          name="url"
          rules={[{ message: "Please input url!", type: 'url' }]}
        >
          <Input onPaste={handlePasteUrl}/>
        </Form.Item>
        <Form.Item
          label="图片"
          name="img"
          rules={[{ message: "Please input url!", type: 'url' }]}
        >
          <Input onPaste={handlePasteUrl}/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PartEditor;
