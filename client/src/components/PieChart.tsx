import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";
import { usersStore } from "../store/usersStore";

import { User } from "../types/userTypes";

type CityCount = { [key: string]: number };

function getCityCounts(data: User[]): CityCount[] {
  const cityCounts: CityCount = data.reduce((acc: CityCount, curr: User) => {
    const { city } = curr.address;
    if (acc[city]) {
      acc[city]++;
    } else {
      acc[city] = 1;
    }
    return acc;
  }, {});

  const cityStats = Object.entries(cityCounts).map(([city, count]) => ({
    type: city,
    value: count,
  }));

  console.log(cityStats);

  return cityStats;
}

const PieChart = () => {
  const users = usersStore((state) => state.users);

  // const data = [
  //   {
  //     type: "Dato",
  //     value: 25,
  //   },
  //   {
  //     type: "分类二",
  //     value: 25,
  //   },
  //   {
  //     type: "分类三",
  //     value: 18,
  //   },
  //   {
  //     type: "分类四",
  //     value: 15,
  //   },
  //   {
  //     type: "分类五",
  //     value: 10,
  //   },
  //   {
  //     type: "其他",
  //     value: 5,
  //   },
  // ];

  const data = getCityCounts(users);

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: { percent: number }) =>
        `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 15,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

export default PieChart;
