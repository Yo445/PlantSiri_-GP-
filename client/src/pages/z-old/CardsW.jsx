import { Box } from "@mui/material";
import LandslideIcon from "@mui/icons-material/Landslide";
import OpacityIcon from "@mui/icons-material/Opacity";
import TornadoIcon from "@mui/icons-material/Tornado";
import GridCard from "../../components/GridCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import Temp from "../imgs/hot.png";
import Hum from "../imgs/humidity (2).png";
import Soil from "../imgs/meter.png";
import Wat from "../imgs/water.png";

function Cards() {
  return (
    <Box
      className="card-container"
      display="flex"
      justifyContent="center"
      flexWrap="wrap"
    >
      <GridCard
        title={"Humidity"}
        icon={<TornadoIcon />}
        color={"#973aa8"}
        imgUrl={Hum}
        value={50} //Humidity value
        unit={"%"}
      ></GridCard>

      <GridCard
        title={"Temperature"}
        icon={
          <FontAwesomeIcon
            icon={faFireFlameCurved}
            style={{ fontSize: "17px" }}
          />
        }
        color={"#dc2f02"}
        imgUrl={Temp}
        value={75} //Temperature value
        unit={"°C"}
      ></GridCard>

      <GridCard
        title={"Soil Moisiture"}
        icon={<LandslideIcon />}
        color={"#7ba132"}
        imgUrl={Soil}
        value={80} //Soil Moisiture value
        unit={"%"}
      ></GridCard>

      <GridCard
        title={"Water Ratio"}
        icon={<OpacityIcon />}
        color={"rgb(86 175 255)"}
        imgUrl={Wat}
        value={30} //Water Ratio value
        unit={"%"}
      ></GridCard>
    </Box>
  );
}

export default Cards;
