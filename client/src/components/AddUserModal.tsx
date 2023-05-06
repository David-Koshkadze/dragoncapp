import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;

interface AddUserModalProps {
  open: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}

export default function AddUserModal({
  open,
  onCreate,
  onCancel,
}: AddUserModalProps) {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add user"
      open={open}
      okText="Submit"
      cancelText="Cancel"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validation failed", info);
          });
      }}
      onCancel={onCancel}
    >
      <Form form={form} name="control-forms" layout="vertical">
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
