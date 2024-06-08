import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const LineChartComponent = ({ data, lineColor1, lineColor2 }) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
                <XAxis dataKey="start_date" stroke="black" />
                <YAxis stroke="black" />
                <Line type="monotone" dataKey="Tmax" stroke={lineColor1} />
                <Line type="monotone" dataKey="Tmin" stroke={lineColor2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;
