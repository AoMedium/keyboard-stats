import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  plugins: {
    legend: {
      display: false
    }
  }
};

type args = {
  sectors: Map<string, number>;
  /**
   * Property that dictates whether this component's fields should be updated.
   */
  updateProp: any;
}

export default function PieChart({sectors, updateProp}: args) {

  const [labels, setLabels] = useState<string[]>([]);
  const [inputSectors, setInputSectors] = useState<number[]>([]);

  useEffect(() => {

  console.log("chart")
    let newLabels: string[] = [];
    let newSectors: number[] = [];

    sectors.forEach((value, key) => {
      newLabels.push(key);
      newSectors.push(value);
    });

    setLabels(newLabels);
    setInputSectors(newSectors);
  }, [updateProp])

  const chartData = {
    labels: labels,
    datasets: [{
      label: "Count",
      data: inputSectors,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
    }]
  };

  return (
    <Pie options={options} data={chartData} />
  );
  
}