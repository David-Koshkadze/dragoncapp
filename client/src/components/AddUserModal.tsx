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
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select placeholder="Choose gender">
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
