import * as React from "react";
import DisplayCard from "../../../../components/DisplayCard";
import Liquidgauge from "../../../../components/old/Liquidgauge";


export default function ChartRight() {

    return (
        <div>
            <DisplayCard title="Card 8" width="100%" height="840px">
                {/* Add Your logic */}
                <Liquidgauge />
            </DisplayCard>
        </div>
    );
}
