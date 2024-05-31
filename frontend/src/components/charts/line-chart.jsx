import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const LineChartComponent = ({ data, lineColor }) => {
    return (
        <ResponsiveContainer width={'80%'} height={200}>
            <LineChart width={'100%'} height={'100%'} data={data}>
                <XAxis dataKey={'start_date'} />
                <YAxis dataKey={'Tmax'} />
                <Line type="monotone" dataKey={'Tmax'} stroke={lineColor} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;
