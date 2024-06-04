import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis } from 'recharts';

const ScatterChartComponent = ({ data, scatterColor }) => {
    const formatTick = (tick) => Math.round(tick);

    return (
        <ResponsiveContainer width={'95%'} height={190}>
            <ScatterChart width={'100%'} height={'100%'}>
                <XAxis
                    name="RH Max"
                    dataKey={'x'}
                    stroke="black"
                    tickFormatter={tick => tick.toFixed(2)}
                />
                <YAxis
                    name="Water Requirement"
                    dataKey={'y'}
                    stroke="black"
                    tickFormatter={formatTick}
                />
                <Scatter
                    line={true}
                    fill={scatterColor}
                    data={data?.map(i => ({ x: parseFloat(i.RH_max.toFixed(2)), y: parseFloat(i.water_requirement.toFixed(2)) }))}
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default ScatterChartComponent;
