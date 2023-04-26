import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { generatePoints } from '../../../utils/Helpers';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const options = {
  responsive: true,
  aspectRatio: 1|1,
  maintainAspectRatio: true,

  plugins: {
    title: {
      display: true,
      text: 'Multitype Chart',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: generatePoints(-1000, 1000, labels.length),
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgb(75, 192, 192)',
      data: generatePoints(-1000, 1000, labels.length),
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: generatePoints(-1000, 1000, labels.length),
    },
  ],
};

export default function MultiLineChart() {
  return <Chart type='bar' options={options} data={data} />;
}
