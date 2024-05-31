import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis } from 'recharts';

const ScatterChartComponent = ({ data, scatterColor  }) => {
    return (
        <ResponsiveContainer width={'70%'} height={190}>
            <ScatterChart width={'100%'} height={'100%'}>
                <XAxis name="RH Max" dataKey={'x'} />
                <YAxis name="Water Requirement" dataKey={'y'} />
                <Scatter
                    line={true}
                    fill={scatterColor}
                    data={data?.map(i => ({ x: i.RH_max, y: i.water_requirement }))}
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default ScatterChartComponent;
