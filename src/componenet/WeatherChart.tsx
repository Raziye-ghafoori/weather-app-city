import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeatherChartProps {
  list: any[],
  deg:string
}

const WeatherChart: React.FC<WeatherChartProps> = ({ list ,deg}) => {
  const labels = list.slice(0, 8).map((item) => {
    const date = new Date(item.dt_txt);
    return `${date.getHours()}:00`;
  });

  const temperatures = list.slice(0, 8).map((item) =>{
    if (deg==='C') {
        return item.main.temp
    }
    return (item.main.temp * 1.8) + 32
  } );
  const data = {
    labels,
    datasets: [
      {
        label:'دما',
        data: temperatures,
        borderColor: '#8AAAE5',
        backgroundColor: '#ffffff',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
      <div className='m-[10px] w-[100%] flex justify-center'>
        <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;
