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
import NumberEntry from '../domain/NumberEntry';
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

export const options = {
  responsive: true,
  aspectRatio: 1|1,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Key Statistics',
    },
  },
  elements: {
    point: {
      radius: 0
    }
  },
  animations: {
    x: { duration: 0 },
    y: { duration: 1000 }
  },
  scales: {
    x: {
      grid: {
        // display: false,
        color: "#222"
      }
    },
    y: {
      grid: {
        color: "#222"
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

type FigureFields = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

export class Figure {
  fields: FigureFields;
  entryData: NumberEntry[];
  dataOffset: number; 

  constructor(label: string, entryData: NumberEntry[], borderColor?: string | undefined, backgroundColor?: string | undefined, dataOffset?: number | undefined) {
    this.entryData = entryData;
    this.dataOffset = dataOffset || 0;

    let data = entryData ? entryData.map((entry: NumberEntry, index) => {
      return entry.value
    }): [];

    data.splice(0, dataOffset);

    borderColor = borderColor || 'rgb(255, 99, 132)';
    backgroundColor = backgroundColor || 'rgba(255, 99, 132, 0.5)';

    this.fields = {
      label,
      data,
      borderColor,
      backgroundColor
    }
  }
}

type args = {
  figures: Figure[];
  startTime: number;
}

export default function LineChart({figures, startTime}: args) {

  const [inputFigures, setInputFigures] = useState<FigureFields[]>([]);

  useEffect(() => {
    let inputFigures = figures.map(figure => {
      return figure.fields;
    });

    setInputFigures(inputFigures);
  }, [figures])

  const chartData = {
    // labels: [1,2,3,4,5,6,7,8,9,10],
    labels: figures[0].entryData.map((entry: NumberEntry) => Math.round((entry.timestamp - startTime)/1000)),
    datasets: inputFigures
  };

  return (
    <Line options={options} data={chartData} />
  );
}