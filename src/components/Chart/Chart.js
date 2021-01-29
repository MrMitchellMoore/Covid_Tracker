import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({confirmed, recovered, deaths}) => {
  const [dailyData, setDailyData] = useState ([]);

  useEffect (() => {
    const fetchAPI = async () => {
      const initialDailyData = await fetchDailyData ();
      setDailyData (initialDailyData);
    };
    fetchAPI ();
  }, []);
  
  const lineChart = dailyData
    ? <Line
        data={{
          labels: dailyData.map (({date}) => date),
          datasets: [
            {
              data: dailyData.map (({confirmed}) => confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            },
            {
              data: dailyData.map (({deaths}) => deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true,
            },
          ],
        }}
      />
    : null;

  console.log(window.length);

  return (
    <div className={styles.container}>
      {lineChart}
    </div>
  );
};

export default Chart;
