import React, { useEffect, useState } from "react";
import { usersStore } from "./store/usersStore";

import { Button, Modal, Popconfirm, Table, Form, Select, Input } from "antd";
import "antd/dist/reset.css";
import { ColumnsType } from "antd/es/table";

const { Option } = Select;

interface DataType {
  key: string;
  name: string;
  email: string;
  gender: string;
  address: string;
  phone: string;
}

const defaultTableColumns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address.street",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);

  const [form] = Form.useForm();

  const users = usersStore((state) => state.users);
  const loading = usersStore((state) => state.loading);
  const hasErrors = usersStore((state) => state.hasErrors);
  const fetchUsers = usersStore((state) => state.fetch);
  const deleteUser = usersStore((state) => state.deleteUser);

  function handleDelete(key: number) {
    deleteUser(key);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (values: any) => {
    setIsModalOpen(false);
    console.log(values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const tableColumns = [
    ...defaultTableColumns,
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: { id: number }) => (
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button type="default" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      {loading ? <p>Loading</p> : null}
      {hasErrors ? <p>Cannot read the data</p> : null}

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        <Modal
          title="Add user"
          open={isModalOpen}
          okText="Submit"
          cancelText="Cancel"
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                handleSubmit(values);
              })
              .catch((info) => {
                console.log("Valideation failed", info);
              });
          }}
          onCancel={handleCancel}
        >
          <Form form={form} name="control-forms" layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select placeholder="Choose gender">
                <Option value="male">male</Option>
                <Option value="female">female</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        <Button type="default" onClick={showModal}>
          Add
        </Button>

        <Table dataSource={users} columns={tableColumns} />
      </div>
    </>
  );
}

export default App;
