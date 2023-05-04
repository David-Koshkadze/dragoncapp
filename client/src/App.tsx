import React, { useEffect } from "react";
import { usersStore } from "./store/usersStore";

import { Button, Popconfirm, Table } from "antd";
import "antd/dist/reset.css";
import { ColumnsType } from "antd/es/table";

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
  const users = usersStore((state) => state.users);
  const loading = usersStore((state) => state.loading);
  const hasErrors = usersStore((state) => state.hasErrors);
  const fetchUsers = usersStore((state) => state.fetch);

  function handleDelete(key: number | string) {
    alert(key);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const tableColumns = [
    ...defaultTableColumns,
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      // render: (text) => <a>Text</a>
      render: (_: any, record: { id: number }) => (
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button type="primary">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      {loading ? <p>Loading</p> : null}
      {hasErrors ? <p>Cannot read the data</p> : null}

      <Button type="default">Add</Button>

      <Table dataSource={users} columns={tableColumns} />
    </>
  );
}

export default App;
