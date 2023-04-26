import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const baseOptions = {
  responsive: true,
  aspectRatio: 1|1,
  maintainAspectRatio: true,
  
  plugins: {
    legend: {
      display: false
    }
  },
  elements: {
    point: {
      radius: 0
    }
  },
  scales: {
    r: {
      beginAtZero: true,
    }
  }
}

export default function RadarChart({title, labels, data}) {

  // Override the existing title
  const options = {
    ...baseOptions,
    ...baseOptions.plugins.title = {
      display: true,
      text: title
    }
  }

  const radarData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Radar options={options} data={radarData} />;
}