import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const baseOptions = {
  responsive: true,
  aspectRatio: 1|1,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  elements: {
    point: {
      radius: 0
    }
  },
  animations: {
    x: { duration: 1000 },
    y: { duration: 1000 }
  },
  scales: {
    x: {
      grid: {
        // display: false,
        color: "#ddd"
      }
    },
    y: {
      grid: {
        color: "#ddd"
      },
      // beginAtZero: true,
      suggestedMax: 20,
      ticks: {
        stepSize: 1
      }
    }
  },
  maintainAspectRatio: true,
};

export default function MultiLineChart({title, figures, startTime}) {

  const [inputFigures, setInputFigures] = useState([]);

  useEffect(() => {
    let inputFigures = figures.map(figure => {
      return figure.fields;
    });

    setInputFigures(inputFigures);
    // console.log(inputFigures)
  }, [figures])

   // Override the existing title
  const options = {
    ...baseOptions,
    ...baseOptions.plugins.title = {
      display: true,
      text: title
    }
  }

  const chartData = {
    labels: figures[0].entryData.map((entry) => Math.round((entry.timestamp - startTime)/1000)),
    datasets: inputFigures
  };

  return (
    <Line options={options} data={chartData} />
  );
}