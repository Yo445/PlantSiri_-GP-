/* ChartRight.js */
import React from "react";
import DisplayCard from "../../../../components/DisplayCard";

export default function ChartRight({ sensorData }) {
    console.log(sensorData);

    return (
        <div className="right-content">
            <DisplayCard title="Card 8" width="100%" height="810px">
                {sensorData.name}
            </DisplayCard>
        </div>
    );
}
