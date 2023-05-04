import { useEffect, useState } from "react";
import { usersStore } from "./store/usersStore";

import { Button, Popconfirm, Table } from "antd";
import "antd/dist/reset.css";
import { ColumnsType } from "antd/es/table";
import AddUserModal from "./components/AddUserModal";

interface DataType {
  key: string;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
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
    key: "address",
    render: ({ address }: { address: { street: string; city: string } }) => {
      return `${address.street}, ${address.city}`;
    },
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

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
        <AddUserModal
          open={isModalOpen}
          onCreate={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />

        <Button type="default" onClick={showModal}>
          Add
        </Button>

        <Table dataSource={users} columns={tableColumns} />
      </div>
    </>
  );
}

export default App;
