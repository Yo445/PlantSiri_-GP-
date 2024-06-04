import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRemainingTime, decrementTime } from "../../../Redux/actions";
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

const DisplaySensor = ({ sensorData }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const remainingTime = useSelector((state) => state.remainingTime);

  useEffect(() => {
    if (remainingTime === null) {
      dispatch(setRemainingTime(sensorData.IrrigationDuration));
    }
  }, [dispatch, remainingTime, sensorData.IrrigationDuration]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const formatValue = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const translatedStatus = sensorData.Status === "!Not Irrigated" ? t('not_irrigated') : t('irrigated');

  const translatedCycleStatus = sensorData.cycle_status === "OFF" ? t('cycle_status_off') : t('cycle_status_on');

  const translatedCrop = sensorData.CropType === "wheat" ? t('crop') : t('ancrop'); 

  return (
    <div className="display-content">
      <Container>
        <Row>
          <h1><RiSensorFill style={{ fontSize: "35px", marginBottom: "7px" }} /> {sensorData.sensor_id}<span>{translatedCrop}</span></h1>
        </Row>
      </Container>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
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
        
        <DisplayCard
          title={t('remaining_time')}
          icon={<MdTimer />}
        >
          <div>
            <h1 style={{ fontSize: "50px", color: "#467aa6" }}>{formatTime(remainingTime)}</h1>
            <p style={{ fontSize: "24px", textAlign: "center", marginTop: "0", marginBottom: "5px", color: "#467aa6" }}>{t('hour_min_sec')}</p>
          </div>
        </DisplayCard>
        
        <DisplayCard
          title={t('irrigation_status')}
          icon={<ShowerIcon fontSize="large" />}
        >
          <h1 style={{ color: sensorData.Status === "!Not Irrigated" ? "darkolivegreen" : "#78f8fb" }}>
            {translatedStatus}
          </h1>
        </DisplayCard>

        <DisplayCard
          title={t('duration')}
          icon={<FontAwesomeIcon fontSize="small" icon={faHourglassHalf} />}
        >
          <div>
            <h6>{t('irrigation_duration')}</h6>
            <h1 style={{ color: "beige" }}>{sensorData.IrrigationDuration}</h1>
            <hr />
            <div style={{display:"flex"}}>
            <div>
            <h6>{t('cycle_status')}</h6>
            <h1 className="cycle_status">{translatedCycleStatus}</h1>
            </div>
            <div className="dash">|</div>
            <div>
            <h6>{t('cycle')}</h6>
            <h1 style={{ color: "beige" }}>{sensorData.Cycle}</h1>
            </div>
            </div>
          </div>
        </DisplayCard>

        <DisplayCard
          title={t('soil_moisture')}
          icon={<MdLandslide />}
        >
          <Gauage
            units={'%'}
            value={formatValue(sensorData.soil_moisture)}
            unitIcon={<MdLandslide fontSize={"14px"}/>}
            strokeColor="#2c642c"
          />
        </DisplayCard>

        <DisplayCard
          title={t('temperature')}
          icon={<FontAwesomeIcon icon={faFireFlameCurved} style={{ fontSize: "17px" }} />}
        >
          <Gauage
            units={'°C'}
            value={formatValue(sensorData.Tmax)}
            strokeColor="#892323"
            unitIcon={<FontAwesomeIcon icon={faFireFlameCurved} style={{ fontSize: "13px" }} />}
          />
        </DisplayCard>
        
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
        
        <DisplayCard
          title={t('wind_speed')}
          icon={<LuWind fontSize="19px" />}
        >
          <Gauage
            units={'m/s'}
            value={formatValue(sensorData.u2)}
            strokeColor="rgb(217 217 205)"
            unitIcon={<LuWind fontSize="15px" />}
          />
        </DisplayCard>
      </Box>
    </div>
  );
};

export default DisplaySensor;
