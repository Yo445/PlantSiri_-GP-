import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const DATA = [
    {
        "fact_id": 2,
        "sensor_id": "xqGpHY4R",
        "CropType": "maize",
        "start_date": "2024-05-12",
        "end_date": "2024-05-08",
        "Cycle": 2,
        "cycle_status": "OFF",
        "IrrigationDuration": 1359,
        "end_irrigation": "14:42:52",
        "Status": "irrigated",
        "water_requirement": 271823.1173898592,
        "u2": 4.248287547146547,
        "RH_max": 39.01127955572761,
        "RH_min": 24.9350079130019,
        "Tmax": 27.264884321214048,
        "Tmin": 21.491406489013965,
        "ET0": 0.000011123402477735301
    },
    {
        "fact_id": 3,
        "sensor_id": "xqGpHY4R",
        "CropType": "wheat",
        "start_date": "2024-05-12",
        "end_date": "2024-05-09",
        "Cycle": 3,
        "cycle_status": "OFF",
        "IrrigationDuration": 481,
        "end_irrigation": "14:48:00",
        "Status": "irrigated",
        "water_requirement": 96212.35826257552,
        "u2": 5.050880242430836,
        "RH_max": 41.99677257869851,
        "RH_min": 29.946153845240993,
        "Tmax": 26.652798979421448,
        "Tmin": 20.958884794331453,
        "ET0": 0.000010821087681866357
    },
    {
        "fact_id": 4,
        "sensor_id": "xqGpHY4R",
        "CropType": "rice",
        "start_date": "2024-05-12",
        "end_date": "2024-05-10",
        "Cycle": 4,
        "cycle_status": "OFF",
        "IrrigationDuration": 1605,
        "end_irrigation": "14:49:53",
        "Status": "irrigated",
        "water_requirement": 320979.7483208574,
        "u2": 5.072583677890789,
        "RH_max": 33.730113242415015,
        "RH_min": 12.508113014834649,
        "Tmax": 27.02922842770569,
        "Tmin": 18.47117011014664,
        "ET0": 0.000012628235683257209
    },
    {
        "fact_id": 5,
        "sensor_id": "xqGpHY4R",
        "CropType": "tomato",
        "start_date": "2024-05-12",
        "end_date": "2024-05-11",
        "Cycle": 5,
        "cycle_status": "OFF",
        "IrrigationDuration": 62,
        "end_irrigation": "14:51:01",
        "Status": "irrigated",
        "water_requirement": 12430.757853164161,
        "u2": 2.1344305284605047,
        "RH_max": 61.212153361358766,
        "RH_min": 15.66933428483315,
        "Tmax": 32.70288626562463,
        "Tmin": 18.429796181083333,
        "ET0": 0.000009066410847835419
    },
    {
        "fact_id": 6,
        "sensor_id": "xqGpHY4R",
        "CropType": "tomato",
        "start_date": "2024-05-15",
        "end_date": "2024-05-12",
        "Cycle": 6,
        "cycle_status": "TRUNCATE",
        "IrrigationDuration": 348,
        "end_irrigation": "16:40:00",
        "Status": "irrigated",
        "water_requirement": 69581.79741696759,
        "u2": 5.030531146779019,
        "RH_max": 42.2795974747474,
        "RH_min": 18.71089996205293,
        "Tmax": 28.11622039018493,
        "Tmin": 22.02369931685658,
        "ET0": 0.000012786436560047919
    },
    {
        "fact_id": 30,
        "sensor_id": "karim",
        "CropType": "tomato",
        "start_date": "2024-05-12",
        "end_date": "2024-05-12",
        "Cycle": 1,
        "cycle_status": "OFF",
        "IrrigationDuration": 1534,
        "end_irrigation": "18:09:22",
        "Status": "irrigated",
        "water_requirement": 306791.64311383007,
        "u2": 3.7367654348050183,
        "RH_max": 51.74504609234859,
        "RH_min": 25.959508616839813,
        "Tmax": 28.590794091470816,
        "Tmin": 22.760274012140187,
        "ET0": 0.000010366287471883761
    }
]

const BarChartComponent = ({ data, barColor }) => {
    const formatTick = (tick) => (tick * 1000).toFixed(3);

    return (
        <ResponsiveContainer width={"80%"} height={190}>
            <BarChart width={150} height={150} data={data}>
                <XAxis dataKey={'Cycle'} stroke="black" />
                <YAxis stroke="black" tickFormatter={formatTick} />
                <Bar dataKey={'ET0_mm'} fill={barColor} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
