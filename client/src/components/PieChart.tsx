import { Pie } from "@ant-design/plots";
import { usersStore } from "../store/usersStore";

import { User, CityCount, CityCountStats } from "../types/userTypes";

function getCityCounts(data: User[]): CityCountStats[] {
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

export default function PieChart() {
  const users = usersStore((state) => state.users);

  const data = getCityCounts(users);

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
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
}
