import React from "react";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Container from "./components/Container";
import Users from "./pages/Users";
import Chart from "./pages/Chart";
import { Space } from "antd";

export default function App() {
  return (
    <Router>
      <Container>
        <nav style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/chart">Chart</Link>
          </Space>
        </nav>
      </Container>

      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/chart" element={<Chart />}></Route>
      </Routes>
    </Router>
  );
}
