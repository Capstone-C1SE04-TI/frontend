import axios from 'axios';
import { useEffect, useState } from 'react';
import { HistoricalChart } from '~/configs/api';

import { Line } from 'react-chartjs-2';

const currency = 'INR';
const day = 1;

function P2P() {
    const [historicData, setHistoricData] = useState();

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart('bitcoin', day, currency));

        setHistoricData(data.prices);
    };

    console.log({ historicData });

    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);

    return (
        <div styles={{ backgroundColor: '#14161a' }}>
            <Line
                data={{
                    labels: historicData?.map((coin) => {
                        let date = new Date(coin[0]);
                        let time =
                            date.getHours() > 12
                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                : `${date.getHours()}:${date.getMinutes()} AM`;

                        return day === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                        {
                            data: historicData?.map((coin) => coin[1]),
                            label: `Price ( Past ${day} Days ) in ${currency}`,
                            borderColor: '#EEBC1D',
                        },
                    ],
                }}
                options={{
                    elements: {
                        point: {
                            radius: 1,
                        },
                    },
                    maintainAspectRatio: false,
                    plugins: {
                        legend: false, // Hide legend
                    },
                    scales: {
                        y: {
                            display: false, // Hide Y axis labels
                        },
                        x: {
                            display: false, // Hide X axis labels
                        },
                    },
                }}
            />
        </div>
    );
}

export default P2P;
