import { Modal, Form, Input, Select } from "antd";
import { User } from "../types/userTypes";
import { useEffect } from "react";

const { Option } = Select;

interface AddUserModalProps {
  setEditUserId: (zeroId: number) => void;
  defaultValues: User;
  setDefaultValues: ({}) => void;
  open: boolean;
  onEdit: (values: any) => void;
  onCancel: () => void;
}

export default function EditUserModal({
  setEditUserId,
  defaultValues,
  setDefaultValues,
  open,
  onEdit,
  onCancel,
}: AddUserModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("Modal Rendered");
  }, []);

  function afterClose() {
    setDefaultValues({});
    setEditUserId(0);
  }

  return (
    <Modal
      title="Edit user"
      open={open}
      okText="Submit"
      cancelText="Cancel"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // form.resetFields();
            onEdit(values);
          })
          .catch((info) => {
            console.log("Validation failed", info);
          });
      }}
      onCancel={onCancel}
      afterClose={afterClose}
      destroyOnClose={true}
    >
      <Form
        form={form}
        name="control-forms"
        layout="vertical"
        initialValues={defaultValues}
        preserve={false}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "Email is not valid",
            },
            { required: true, message: "Email is required" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select placeholder="Choose gender">
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name={["address", "street"]}
          label="Street"
          rules={[{ required: true, message: "Please enter a street" }]}
        >
          <Input placeholder="Enter street" />
        </Form.Item>

        <Form.Item
          name={["address", "city"]}
          label="City"
          rules={[{ required: true, message: "Please enter a city" }]}
        >
          <Input placeholder="Enter city" />
        </Form.Item>

        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
