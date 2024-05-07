/* LeftTop.js */
import React from "react";
import DisplayCard from "../../../../components/DisplayCard";
import { BarChart } from '@mui/x-charts/BarChart';



export default function LeftTop({ sensorData }) {
    return (
        <div>
            <DisplayCard title="Card 8" width="100%" height="100%">
                {/* Add Your logic */}


                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                    width={500}
                    height={300}
                />
            </DisplayCard>
        </div>
    )
}
