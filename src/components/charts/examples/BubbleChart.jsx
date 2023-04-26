import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { generatePoint } from '../../../utils/Helpers';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const options = {
  responsive: true,
  aspectRatio: 1|1,
  maintainAspectRatio: true,

  plugins: {
    title: {
      display: true,
      text: 'Bubble Chart',
    },
  },

  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const data = {
  datasets: [
    {
      label: 'Red dataset',
      data: Array.from({ length: 50 }, () => ({
        x: generatePoint(-100, 100),
        y: generatePoint(-100, 100),
        r: generatePoint(5, 20),
      })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Blue dataset',
      data: Array.from({ length: 50 }, () => ({
        x: generatePoint(-100, 100),
        y: generatePoint(-100, 100),
        r: generatePoint(5, 20),
      })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function BubbleChart() {
  return <Bubble options={options} data={data} />;
}
