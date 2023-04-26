import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { generatePoints } from '../../../utils/Helpers';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  aspectRatio: 1|1,
  maintainAspectRatio: true,

  plugins: {
    title: {
      display: true,
      text: 'Polar Area Chart',
    },
  },
}

const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

const data = {
  labels: labels,
  datasets: [
    {
      label: '# of Votes',
      data: generatePoints(5, 30, labels.length),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function PolarAreaChart() {
  return <PolarArea options={options} data={data} />;
}
