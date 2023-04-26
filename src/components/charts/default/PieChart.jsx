import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { CHART_BACKGROUND_COLORS, CHART_BORDER_COLORS } from '../../../utils/Colors';

ChartJS.register(ArcElement, Tooltip, Legend);

const baseOptions = {
  plugins: {
    legend: {
      display: false
    }
  }
};

export default function PieChart({title, sectors, updateProp}) {

  const [labels, setLabels] = useState([]);
  const [inputSectors, setInputSectors] = useState([]);

  useEffect(() => {
    // Read the data and labels for each sector

    let newLabels = [];
    let newSectors = [];

    sectors.forEach((value, key) => {
      newLabels.push(key);
      newSectors.push(value);
    });

    setLabels(newLabels);
    setInputSectors(newSectors);
  }, [updateProp])

   // Override the existing title
  const options = {
    ...baseOptions,
    ...baseOptions.plugins.title = {
      display: true,
      text: title
    }
  }

  const chartData = {
    labels: labels,
    datasets: [{
      label: "Count",
      data: inputSectors,
      backgroundColor: CHART_BACKGROUND_COLORS,
      borderColor: CHART_BORDER_COLORS
    }]
  };

  return (
    <Pie options={options} data={chartData} />
  );
  
}