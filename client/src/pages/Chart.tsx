import Container from "../components/Container";
import PieChart from "../components/PieChart";
import { Space } from "antd";

export default function Chart() {
  return (
    <Container>
      <Space direction="vertical">
        <h1>Chart</h1>
        <p>Pie chart about people percentage of the cities</p>
      </Space>
      <PieChart />
    </Container>
  );
}
