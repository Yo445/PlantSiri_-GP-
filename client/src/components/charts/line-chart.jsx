import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const LineChartComponent = ({ data, lineColor }) => {
    return (
        <ResponsiveContainer width={'94%'} height={200}>
            <LineChart width={'100%'} height={'100%'} data={data}>
                <XAxis dataKey={'start_date'} stroke="black" />
                <YAxis dataKey={'Tmax'} stroke="black" />
                <Line type="monotone" dataKey={'Tmax'} stroke={lineColor} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;
