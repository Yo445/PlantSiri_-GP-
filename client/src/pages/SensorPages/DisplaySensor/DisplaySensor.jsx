import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import DisplayCard from "../../../components/DisplayCard";
import { Box } from "@mui/material";
import "./Display.css";
import { MdTimer, MdAccessTime } from "react-icons/md";
import ShowerIcon from '@mui/icons-material/Shower';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import Gauage from "../../../components/Gauage";
import { LuWind } from "react-icons/lu";
import { RiSensorFill, RiWaterPercentFill } from "react-icons/ri";
import { useTranslation } from 'react-i18next';
import { MdLandslide } from "react-icons/md";
import { IoIosSnow } from "react-icons/io";
import { FaTemperatureHalf } from "react-icons/fa6";

import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import NotFound from "../../../components/NotFound";
import { WiHumidity } from "react-icons/wi";
function capitalize(str) {
  return str.replace(/\b\w/g, function(char) {
      return char.toUpperCase();
  });
}
function getTimeDifference(currentTime, dbTime) {
  // Parse the current time
  const current = new Date(currentTime);

  // Parse the time from the database
  const [dbHours, dbMinutes, dbSeconds] = dbTime.split(":");
  const dbMilliseconds = (parseInt(dbHours, 10) * 3600 + parseInt(dbMinutes, 10) * 60 + parseInt(dbSeconds, 10)) * 1000;

  // Calculate the difference in milliseconds
  const difference = dbMilliseconds - current.getTime();

  // Convert difference to hours, minutes, seconds
  const hours = Math.floor(Math.abs(difference) / (1000 * 60 * 60));
  const minutes = Math.floor((Math.abs(difference) % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((Math.abs(difference) % (1000 * 60)) / 1000);

  // Format the difference
  const formattedDifference = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedDifference;
}

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};


const DisplaySensor = ({ sensorData }) => {
  const { t } = useTranslation();

//------------------------------------
  /* حاجات الساعة و حلة الرى */
  // const initialTime = localStorage.getItem('remainingTime') ? parseInt(localStorage.getItem('remainingTime')) : sensorData.IrrigationDuration;
const currentTime  = new Date();

const initialTime = getTimeDifference(currentTime, sensorData.end_irrigation);

console.log(currentTime,sensorData.end_irrigation,initialTime)
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [status, setStatus] = useState(sensorData.Status);
  
   
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prevTime => {
        const newTime = prevTime > 0 ? prevTime - 1 : 0;
        localStorage.setItem(`remainingTime`, newTime);
        // if (newTime === 0 && status === "not irrigated" ) {
        //   setStatus("irrigated");
        //   sensorData.Status = "irrigated";
        // }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, sensorData]);
  
//------------------------------------

  const formatValue = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const translatedCycleStatus = () => {
    if (sensorData.cycle_status === "OFF") {
      return t('cycle_status_off');
    } else if (sensorData.cycle_status === "ON") {
      return t('cycle_status_on');
    } else if (sensorData.cycle_status === "truncate") {
      return t('cycle_status_truncate');
    } else {
      return sensorData.cycle_status;
    }
  };

  const translatedCrop = sensorData.CropType === "wheat" ? t('crop') : t('ancrop');

  const getTemperatureSettings = (temperature) => {
    if (temperature < 15) {
      return {
        strokeColor: "#b9e8ea",
        unitIcon: <IoIosSnow style={{ fontSize: "13px" }} />,
        cardIcon: <IoIosSnow style={{ fontSize: "17px" }} />
      };
    } else if (temperature >= 15 && temperature <= 25) {
      return {
        strokeColor: "rgb(175 74 41)",
        unitIcon: <FaTemperatureHalf style={{ fontSize: "13px" }} />,
        cardIcon: <FaTemperatureHalf style={{ fontSize: "17px" }} />
      };
    } else {
      return {
        strokeColor: "#892323",
        unitIcon: <FontAwesomeIcon icon={faFireFlameCurved} style={{ fontSize: "13px" }} />,
        cardIcon: <FontAwesomeIcon icon={faFireFlameCurved} style={{ fontSize: "17px" }} />
      };
    }
  };

  const temperatureSettings = getTemperatureSettings(sensorData.Tmax);

  return (
    <div className="display-content">
      {/* Header */}
      <Container>
        <Row>
          <h1><RiSensorFill style={{ fontSize: "35px", marginBottom: "7px" }} /> {sensorData.sensor_id}<span>{translatedCrop}</span></h1>
        </Row>
      </Container>

      {/* Cards */}
      <Box display="flex" justifyContent="center" flexWrap="wrap">

        {/* Date */}
        <DisplayCard
          title={t('date')}
          icon={<MdAccessTime />}
        >
          <div>
            <h6>{t('start')}</h6>
            <h1 style={{ color: "rgb(64 82 64)" }}>{sensorData.start_date}</h1>
            <hr />
            <h6>{t('end')}</h6>
            <h1 style={{ color: "rgb(64 82 64)" }}>{sensorData.end_date}</h1>
          </div>
        </DisplayCard>
{/*--------------------------------------------------*/}
    {/*حاجات الساعة و حلة الرى */}
        {/* Remaining Time */}
        <DisplayCard
          title={t('remaining_time')}
          icon={<MdTimer />}
        >
          <div>
            <h1 style={{ fontSize: "50px", color: "#467aa6" }}>{sensorData.Status === "irrigated" ? formatTime(0) : formatTime(sensorData.IrrigationDuration)}</h1>
            <p style={{ fontSize: "24px", textAlign: "center", marginTop: "0", marginBottom: "5px", color: "#467aa6" }}>{t('hour_min_sec')}</p>
          </div>
        </DisplayCard>

        {/* Irrigation Status */}
        <DisplayCard
          title={t('irrigation_status')}
          icon={<ShowerIcon fontSize="large" />}
        >
          <h1 style={{ color: sensorData.Status === "not irrigated" ? "#6b2f4b" : "#78f8fb" }}>
            {capitalize(sensorData.Status)}
          </h1>
        </DisplayCard>
{/*--------------------------------------------------*/}

        {/* Duration */}
        <DisplayCard
          title={t('duration')}
          icon={<FontAwesomeIcon fontSize="small" icon={faHourglassHalf} />}
        >
          <div>
            <h6>{t('irrigation_duration')}</h6>
            <h1 style={{ color: "beige" }}>{sensorData.IrrigationDuration}</h1>
            <hr />
            <div style={{ display: "flex" }}>
              <div>
                <h6>{t('cycle_status')}</h6>
                <h1 className="cycle_status">{translatedCycleStatus()}</h1>
              </div>
              <div className="dash">|</div>
              <div>
                <h6>{t('cycle')}</h6>
                <h1 style={{ color: "beige" }}>{sensorData.Cycle}</h1>
              </div>
            </div>
          </div>
        </DisplayCard>

        {/* Soil Moisture */}
        <DisplayCard
          title={t('soil_moisture')}
          icon={<MdLandslide />}
        >
          <Gauage
            units={'%'}
            value={formatValue(sensorData.soil_moisture)}
            unitIcon={<MdLandslide fontSize={"14px"} />}
            strokeColor="#2c642c"
          />
        </DisplayCard>

        {/* Temperature */}
        <DisplayCard
          title={t('temperature')}
          icon={temperatureSettings.cardIcon}
        >
          <Gauage
            units={'°C'}
            value={formatValue(sensorData.Tmax)}
            strokeColor={temperatureSettings.strokeColor}
            unitIcon={temperatureSettings.unitIcon}
          />
        </DisplayCard>

        {/* Humidity */}
        <DisplayCard
          title={t('humidity')}
          icon={<RiWaterPercentFill />}
        >
          <Gauage
            units={'%'}
            value={formatValue(sensorData.RH_max)}
            strokeColor="rebeccapurple"
            unitIcon={<RiWaterPercentFill fontSize={"14px"} />}
          />
        </DisplayCard>

        {/* Wind Speed */}
        <DisplayCard
          title={t('wind_speed')}
          icon={<LuWind fontSize="19px" />}
        >
          <Gauage
            units={'m/s'}
            value={formatValue(sensorData.u2)}
            strokeColor="rgb(217 217 205)"
            unitIcon={<LuWind fontSize="15px"/>}
          />
        </DisplayCard>
      </Box>
    </div>
  );
};

export default DisplaySensor;
