import * as React from "react";
import DisplayCard from "../../../../components/DisplayCard";
import Liquidgauge from "../../../../components/old/Liquidgauge";

export default function LeftButton() {
    return (
        <div>
            <DisplayCard title="Card 8" width="100%" height="100%">
                {/* Add Your logic */}
                <Liquidgauge />
            </DisplayCard>
        </div>
    )
}
