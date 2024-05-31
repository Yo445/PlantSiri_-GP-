from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, struct
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, IntegerType, FloatType
from pyspark.sql.functions import udf, expr, when 


import math
import datetime

## Logic ## 
def get_crop_coefficient(crop_type):
    crop_coefficients = {
        "maize": 1.2,
        "wheat": 0.9,
        "tomato": 0.8,
        "rice": 1.0,
        "soybean": 0.8,
    }
    
    if crop_type in crop_coefficients:
        return crop_coefficients[crop_type]
    else:
        return 0
    
def get_crop_coefficient_udf_fun(crop_type):
    return get_crop_coefficient(crop_type)

def calculate_mean_temperature(Tmax, Tmin):
    return (Tmax + Tmin) / 2

def calculate_slope_of_saturation_vapor_pressure_curve(Tmean):
    # Constants for the Clausius–Clapeyron equation
    a = 17.27
    b = 237.7

    # Temperature in Celsius
    T = Tmean

    # Saturated vapor pressure calculation
    es = 0.6108 * math.exp((a * T) / (T + b))
    slp = (4098 * es) / math.pow(T + 237.3, 2)
    return slp
def calculate_psychrometric_constant(P, cp, latent_heat_of_vaporization):
    # Calculate the psychrometric constant (γ)
    # γ = cp * P / (0.622 * latent heat of vaporization)
    gamma = cp * P / (0.622 * latent_heat_of_vaporization)
    return gamma

def calculate_delta_term(pressure_curve, gamma,wind_speed):
    return pressure_curve / (pressure_curve + gamma * (1+0.34 *wind_speed))

def calculate_psi_term(pressure_curve, gamma,wind_speed):
    return pressure_curve / (pressure_curve + gamma * (1+0.34 *wind_speed))
def calculate_temperature_term(Tmean):
    # Calculate the Temperature term (TT)
    # TT is an auxiliary calculation for the wind term
    # Implement the actual calculation based on the provided formula
    # ...
    pass
def calculate_mean_saturation_vapor_pressure(Tmax, Tmin):
    # Constants for the Clausius–Clapeyron equation
    a = 17.27
    b = 237.7
    # Saturated vapor pressure calculation
    et_max = 0.6108 * math.exp((a * Tmax) / (Tmax + b))
    et_min = 0.6108 * math.exp((a * Tmin) / (Tmin + b))
    es = (et_max + et_min) / 2
    return es
def calculate_actual_vapor_pressure(RH_max, RH_min, Tmax, Tmin):

    a = 17.27
    b = 237.7
    et_max = 0.6108 * math.exp((a * Tmax) / (Tmax + b))
    et_min = 0.6108 * math.exp((a * Tmin) / (Tmin + b))
    ea = (et_min * (RH_max/100) + et_max * (RH_min/100)) / 2
    return ea
def calculate_inverse_relative_distance_and_declination(julian_day):
    # Calculate the inverse relative distance Earth-Sun (dr) and solar declination (delta)
    
    # Earth's elliptical orbit eccentricity (approximately constant)
    e = 0.0167
    
    # Mean anomaly (radians)
    M = 2 * math.pi * (julian_day - 1) / 365.0
    
    # Eccentric anomaly (initial value)
    E = M
    
    # Iterative calculation of Eccentric anomaly using Kepler's equation
    for _ in range(10):  # You can adjust the number of iterations for accuracy
        E = M + e * math.sin(E)
    
    # Sun's apparent angular velocity
    w = 2 * math.pi / 365.0
    
    # Equation of time correction (in minutes)
    equation_of_time = 229.18 * (0.000075 + 0.001868 * math.cos(M) - 0.032077 * math.sin(M) - 0.014615 * math.cos(2 * M) - 0.040849 * math.sin(2 * M))
    
    # Solar declination calculation (in radians)
    solar_declination = math.asin(math.sin(E) * math.sin(math.radians(23.45)))
    
    # Inverse relative distance Earth-Sun calculation
    dr = 1 + e * math.cos(E)
    
    return dr, solar_declination

#!!!!!!!!!!!!############ NOT IMPORTANT #################!!!!!!!!!!!!
# Example usage: 
#current_date = datetime.datetime.now()
#print("data:", current_date)
#julian_day = current_date.timetuple().tm_yday
#print("julian_day:", julian_day)
#dr, solar_declination = calculate_inverse_relative_distance_and_declination(julian_day)
#print("Inverse Relative Distance (dr):", dr)
#print("Solar Declination:", math.degrees(solar_declination))
#!!!!!!!!!!!!############ NOT IMPORTANT #################!!!!!!!!!!!!

def calculate_latitude_in_radians(latitude): 
    return (latitude * math.pi) / 180.0
  
def calculate_sunset_hour_angle(latitude, solar_declination):
    # Convert latitude and solar declination to radians
    latitude_rad = math.radians(latitude)
    solar_declination_rad = math.radians(solar_declination)

    # Calculate sunset hour angle
    sunset_hour_angle = math.acos(-math.tan(latitude_rad) * math.tan(solar_declination_rad))

    return sunset_hour_angle
def calculate_extraterrestrial_radiation(inverse_relative_distance, sunset_hour_angle, latitude, solar_declination):
    # Calculate extraterrestrial radiation (Ra)
    solar_constant = 0.0820
    Ra = solar_constant * inverse_relative_distance * (sunset_hour_angle * math.sin(latitude) * math.sin(solar_declination) + math.cos(latitude) * math.cos(solar_declination) * math.sin(sunset_hour_angle))

    return Ra
def calculate_clear_sky_solar_radiation(Ra, altitude):
    Rso = (0.75 + 2e-5 * altitude) * Ra
    return Rso

def calculate_net_solar_radiation(albedo, solar_radiation):
     # Calculate net solar radiation (Rns)
    Rns = (1 - albedo) * solar_radiation
    return Rns
def calculate_net_outgoing_long_wave_radiation(emissivity, Tmean):
    # Stefan-Boltzmann constant
    sigma = 5.67e-8  # W m^-2 K^-4

    # Convert temperature to Kelvin
    T_mean_kelvin = Tmean + 273.16

    # Net outgoing long-wave radiation calculation
    Rnl = sigma * emissivity * (T_mean_kelvin ** 4) * ((1 / emissivity) - 1) * 1e-9
    return Rnl
def calculate_net_radiation(net_solar_radiation, net_outgoing_long_wave_radiation):
    # Net radiation calculation
    net_radiation = net_solar_radiation - net_outgoing_long_wave_radiation
    return net_radiation

def penman_monteith(Tmax, Tmin, Rs, u2, RH_max, RH_min, soil_moisture, P, cp, latent_heat_of_vaporization, latitude, altitude, albedo, emissivity, G, IrrigationDuration, Kc):
    Tmax = Tmax # Max Temperature (°C).
    Tmin = Tmin # Min Temperature (°C).
    Rs = Rs # Solar Radiation (MJ/m²/day)
    u2 = u2 # Wind Speed (m/s).

    RH_MAX = RH_max # Max Humidity percentage
    RH_MIN = RH_min # Min Humidity percentage 
    P = P # kPa (standard atmospheric pressure at sea level)
    cp = cp # kJ/kg°C (specific heat of air at constant pressure)
    latent_heat_of_vaporization = latent_heat_of_vaporization # MJ/kg (latent heat of vaporization for water)
    
    # Calculate Julian day
    current_date = datetime.datetime.now()
    julian_day = current_date.timetuple().tm_yday
    

    # Calculate mean temperature
    Tmean = calculate_mean_temperature(Tmax, Tmin) #DONE

    # Calculate the slope of saturation vapor pressure curve (pressure_curve)
    pressure_curve = calculate_slope_of_saturation_vapor_pressure_curve(Tmean) #DONE

    # Calculate the psychrometric constant (γ)
    gamma = calculate_psychrometric_constant(P, cp, latent_heat_of_vaporization)

    # Calculate the Delta term (DT)
    DT = calculate_delta_term(pressure_curve, gamma,u2) #DONEEE

    # Calculate the Psi term (PT)
    PT = calculate_psi_term(pressure_curve, gamma,u2) # 3`leban msh hs5dmhaaa

    # Calculate the Temperature term (TT)
    TT = calculate_temperature_term(Tmean) # 3`leban msh hs5dmhaaa

    # Calculate mean saturation vapor pressure (es)
    es = calculate_mean_saturation_vapor_pressure(Tmax, Tmin) #DONEEE

    # Calculate actual vapor pressure (ea)
    ea = calculate_actual_vapor_pressure(RH_MAX, RH_MIN, Tmax,Tmin) #DONEEE

    # Calculate the inverse relative distance Earth-Sun (dr) and solar declination (pressure_curve)
    dr, solar_declination = calculate_inverse_relative_distance_and_declination(julian_day) #DONEEE

    # Convert latitude (Φ) in degrees to radians
    latitude_in_radians = calculate_latitude_in_radians(latitude) #DONEEE

    # Calculate sunset hour angle (ωs)
    omega_s = calculate_sunset_hour_angle(latitude, solar_declination) #DONEEE

    # Calculate extraterrestrial radiation (Ra)
    Ra = calculate_extraterrestrial_radiation(dr, omega_s, latitude_in_radians, solar_declination) #DONEEE

    # Calculate clear sky solar radiation (Rso)
    Rso = calculate_clear_sky_solar_radiation(Ra, altitude) #DONEEE

    # Calculate net solar radiation (Rns)
    Rns = calculate_net_solar_radiation(albedo, Rs) #DONEEE

    # Calculate net outgoing long wave solar radiation (Rnl)
    Rnl = calculate_net_outgoing_long_wave_radiation(emissivity, Tmean)

    # Calculate net radiation (Rn)
    Rn = calculate_net_radiation(Rns, Rnl)

    # Implement the full Penman-Monteith equation
    ET0 = (0.408 * DT * (Rn - G) + gamma * (900 / (Tmax + 273)) * u2 * (es - ea)) / (DT + gamma * (1 + 0.34 * u2))
 

    return ET0

def calculate_irrigation_water_requirement(ETc, area, irrigation_efficiency):
    water_requirement = (ETc * area) / (irrigation_efficiency / 100)
    return water_requirement


def penman_monteith_udf_fun(Tmax, Tmin, Rs, u2, RH_max, RH_min, soil_moisture, P, cp, latent_heat_of_vaporization, latitude, altitude, albedo, emissivity, G, IrrigationDuration, Kc):
    return penman_monteith(Tmax, Tmin, Rs, u2, RH_max, RH_min, soil_moisture, P, cp, latent_heat_of_vaporization, latitude, altitude, albedo, emissivity, G, IrrigationDuration, Kc)

def calculate_irrigation_duration(ETc):

    return 

def calculate_irrigation_duration_udf(ETc):
    return calculate_irrigation_duration(ETc)

######### not used #########
def weather_based_irrigation_logic(sensor_data):
    ET0 = penman_monteith(sensor_data)
    Kc = get_crop_coefficient(sensor_data["Crop Type"])
    ETc = Kc * ET0 #
    irrigation_efficiency = sensor_data["irrigation_efficiency"]
    water_requirment = calculate_irrigation_water_requirement(ETc, sensor_data["Area"], sensor_data["irrigation_efficiency"] )
    if ETc > 10: #threshold
        sensor_data["Irrigation Duration"] = calculate_irrigation_duration(ETc)
        sensor_data["Status"] = "Irrigated"
        sensor_data["ETc"] = ETc
        sensor_data["ET0"] = ET0

    else:
        sensor_data["Irrigation Duration"] = 0
        sensor_data["Status"] = "Not Irrigated"
        sensor_data["ETc"] = ETc
        sensor_data["ET0"] = ET0

    return sensor_data

######### not used #########
def soil_moisture_based_irrigation_logic(sensor_data):
    soil_moisture = sensor_data["soil_moisture"]
    if soil_moisture < 60 : #threshold EL Mafrod a3la Qima water mmkn tkon fel ard 
        sensor_data["Irrigation Duration"] = calculate_irrigation_duration_soil_moisture(sensor_data)
        sensor_data["Status"] = "Irrigated"
        sensor_data["soil_moisture"] = soil_moisture
        
    else:
        sensor_data["Irrigation Duration"] = 0
        sensor_data["Status"] = "Not Irrigated"
        sensor_data["soil_moisture"] = soil_moisture

    return sensor_data

def calculate_irrigation_duration_soil_moisture(sensor_data):
    return 70

# Initialize Spark session

def create_spark_session(app_name):
    return SparkSession.builder.appName(app_name).getOrCreate()

def define_schema():
    return StructType([
    StructField("sensor_id", StringType(), True), #edited 
    StructField("times_tamp", StringType(), True),
    StructField("CropType", StringType(), True),
    StructField("Tmax", DoubleType(), True),
    StructField("Tmin", DoubleType(), True),
    StructField("Rs", DoubleType(), True),
    StructField("u2", DoubleType(), True),
    StructField("RH_max", DoubleType(), True),
    StructField("RH_min", DoubleType(), True),
    StructField("soil_moisture", DoubleType(), True),
    StructField("P", DoubleType(), True),
    StructField("cp", DoubleType(), True),
    StructField("latent_heat_of_vaporization", DoubleType(), True),
    StructField("latitude", DoubleType(), True),
    StructField("altitude", DoubleType(), True),
    StructField("albedo", DoubleType(), True),
    StructField("emissivity", DoubleType(), True),
    StructField("G", DoubleType(), True),
    StructField("IrrigationDuration", IntegerType(), True),
    StructField("Status", StringType(), True),
    StructField("ETc", DoubleType(), True),
    StructField("ETc_mm", DoubleType(), True),
    StructField("ET0", DoubleType(), True),
    StructField("Kc", DoubleType(), True),
    StructField("Cycle", IntegerType(), True),
    StructField("start_date", StringType(), True),
    StructField("end_date", StringType(), True),
    StructField("end_time", StringType(), True),
    StructField("cycle_status", StringType(), True),
    StructField("water_requirement", DoubleType(), True),
    StructField("Area", DoubleType(), True),
    StructField("irrigation_efficiency", DoubleType(), True),
    StructField("flow_rate", DoubleType(), True),
    StructField("start_irrigation", StringType(), True),
    StructField("end_irrigation", StringType(), True),


])


# Parse the value column from Kafka as JSON
def parse_data_as_json(kafka_dataframe, schema):
    value_json = kafka_dataframe.selectExpr("CAST(value AS STRING)").select(from_json(col("value"), schema).alias("data")).select("data.*")
    return value_json


# Read data from Kafka as a streaming DataFrame
def read_data_from_kafka(spark, kafka_params):
    schema = define_schema()
    kafka_df = spark \
        .readStream \
        .format("kafka") \
        .option("kafka.bootstrap.servers", kafka_params["kafka.bootstrap.servers"]) \
        .option("subscribe", kafka_params["subscribe"]) \
        .option("startingOffsets", kafka_params["startingOffsets"]) \
        .load()
    
    value_json = parse_data_as_json(kafka_df, schema)
    return value_json


def console_output_sink(processed_stream_df):
    return processed_stream_df \
        .writeStream \
        .outputMode("append") \
        .format("console") \
        .start()

    
get_crop_coefficient_udf = udf(get_crop_coefficient_udf_fun, DoubleType())
 
penman_monteith_udf = udf(penman_monteith_udf_fun, DoubleType())


def main():
    spark = create_spark_session("WeatherStreamProcessor")
    #schema = define_schema()
    # Kafka configuration
    kafka_params = {
        "kafka.bootstrap.servers": "localhost:9092",
        "subscribe": "KARIM55",
        "startingOffsets": "earliest",
    }


    jdbc_url = "jdbc:mysql://localhost:3306/gp"
    jdbc_table = "weather_data_five"
    jdbc_properties = {
    "user": "root",
    "password": "",  # Default password is empty in XAMPP
    "driver": "com.mysql.jdbc.Driver"
}


    raw_stream_df = read_data_from_kafka(spark, kafka_params)

    # Apply Weather Based Irrigation Logic
    processed_stream_df = raw_stream_df \
    .withColumn("Kc", get_crop_coefficient_udf(col("CropType"))) \
    .withColumn("ET0", penman_monteith_udf(col("Tmax"), col("Tmin"), col("Rs"), col("u2"), col("RH_max"), col("RH_min"), col("soil_moisture"), col("P"), col("cp"), col("latent_heat_of_vaporization"), col("latitude"), col("altitude"), col("albedo"), col("emissivity"), col("G"), col("IrrigationDuration"), col("Kc"))) \
    .withColumn("ETc_mm", col("Kc") * col("ET0")) \
    .withColumn("ETc", col("ETc_mm") / 1000000) \
    .withColumn("ET0", col("ET0") / 1000000) \
    .withColumn("Status", expr("CASE WHEN ETc >= ET0 THEN 'Irrigated!' ELSE '!Not Irrigated' END"))\
    .withColumn("Cycle", col("Cycle")) \
    .withColumn("start_date", col("start_date")) \
    .withColumn("end_date", col("end_date")) \
    .withColumn("cycle_status", col("cycle_status")) \
    .withColumn("water_requirement", (col("ETc_mm") * col("Area")) / (col("irrigation_efficiency")/ 100)) \
    .withColumn("IrrigationDuration", col("water_requirement") / col("flow_rate"))
    def foreach_batch_function(df, epoch_id):

    # Load data into DataFrames or create DataFrames from existing data sources
        #################################### (1) DIM TIME ####################################
        time_dimension_df = spark.read.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Time_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .load()
        
    # Filter out existing time records from the DataFrame
        new_time_dimension_df = df.select("times_tamp", "start_date", "end_date","end_time") \
            .distinct() \
            .join(time_dimension_df, ["times_tamp", "start_date", "end_date", "end_time"], "left_anti")


    # Write only new time records to Time_Dimension table
        new_time_dimension_df.write.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Time_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .mode("append") \
            .save()

        #################################### (2) DIM CROP ####################################

        crop_dimension_df = spark.read.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Crop_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .load()
    # Filter out existing CropType and Kc combinations from the DataFrame
        new_crop_dimension_df = df.select("CropType", "Kc") \
            .distinct() \
            .join(crop_dimension_df, ["CropType", "Kc"], "left_anti")
        
    # Write only new CropType and Kc combinations to Crop_Dimension table
        new_crop_dimension_df.write.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Crop_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .mode("append") \
            .save()
        

        #################################### (3) DIM LOCATION ####################################

        location_dimension_df = spark.read.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Location_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .load()
    # Filter out existing location records from the DataFrame
        new_location_dimension_df = df.select("latitude", "altitude") \
            .distinct() \
            .join(location_dimension_df, ["latitude", "altitude"], "left_anti")    
        
    # Write only new location records to Location_Dimension table
        new_location_dimension_df.write.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Location_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .mode("append") \
            .save()

        #################################### (4) DIM CYCLE ####################################

        cycle_dimension_df = spark.read.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Cycle_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .load()
    # Filter out existing cycle records from the DataFrame
        new_cycle_dimension_df = df.select("Cycle")\
            .distinct() \
            .join(cycle_dimension_df, ["Cycle"], "left_anti")
            
    # Write cycle dimension data
        new_cycle_dimension_df.write.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Cycle_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .mode("append") \
            .save()

        #################################### (5) DIM WEATHER ####################################

    # Read existing Weather_Dimension data
        weather_dimension_df = spark.read.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Weather_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .load()

    # Filter out existing weather records from the DataFrame
        new_weather_dimension_df = df.select("times_tamp", "Tmax", "Tmin", "Rs", "u2", "RH_max", "RH_min", "P", "G") \
            .distinct() \
            .join(weather_dimension_df, ["times_tamp", "Tmax", "Tmin", "Rs", "u2", "RH_max", "RH_min", "P", "G"], "left_anti")

    # Write only new weather records to Weather_Dimension table
        new_weather_dimension_df.write.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Weather_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .mode("append") \
            .save()


        #################################### (6) DIM IRRIGATION ####################################

    # Read existing Irrigation_Dimension data
        irrigation_dimension_df = spark.read.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Irrigation_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .load()

    # Filter out existing irrigation records from the DataFrame
        new_irrigation_dimension_df = df.select("times_tamp", "start_irrigation", "IrrigationDuration", "end_irrigation", "Status", "water_requirement", "Area", "irrigation_efficiency", "flow_rate") \
            .distinct() \
            .join(irrigation_dimension_df, ["times_tamp", "start_irrigation", "IrrigationDuration", "end_irrigation", "Status", "water_requirement", "Area", "irrigation_efficiency", "flow_rate"], "left_anti")

    # Write only new irrigation records to Irrigation_Dimension table
        new_irrigation_dimension_df.write.format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "Irrigation_Dimension") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .mode("append") \
            .save()


        #################################### (7) DIM SENSOR ####################################

        existing_sensor_ids = spark.read.format("jdbc") \
        .option("url", jdbc_url) \
        .option("dbtable", "Sensor_Dimension") \
        .option("user", jdbc_properties["user"]) \
        .option("password", jdbc_properties["password"]) \
        .option("driver", jdbc_properties["driver"]) \
        .load().select("sensor_id").distinct()
        
    # Filter out existing sensor IDs from the DataFrame
        new_sensor_ids_df = df.select("sensor_id").distinct() \
        .join(existing_sensor_ids, df["sensor_id"] == existing_sensor_ids["sensor_id"], "left_anti")

    # Write sensor dimension data
        new_sensor_ids_df.select("sensor_id") \
        .distinct() \
        .write.format("jdbc") \
        .option("url", jdbc_url) \
        .option("dbtable", "Sensor_Dimension") \
        .option("user", jdbc_properties["user"]) \
        .option("password", jdbc_properties["password"]) \
        .option("driver", jdbc_properties["driver"]) \
        .mode("append") \
        .save()



        #################################### (8) FACT TABLE ####################################

        # Write fact table data with proper IDs
        # # Joining with the dimension tables to get the IDs
        # fact_df = df.join(existing_sensor_ids, df["sensor_id"] == existing_sensor_ids["sensor_id"] , "inner")\
        #         .join(time_dimension_df, df["times_tamp"] == time_dimension_df["times_tamp"], "inner") \
        #         .join(crop_dimension_df, df["Kc"] == crop_dimension_df["Kc"], "inner") \
        #         .join(location_dimension_df, (df["latitude"] == location_dimension_df["latitude"]) & (df["altitude"] == location_dimension_df["altitude"]), "inner") \
        #         .join(cycle_dimension_df, df["Cycle"] == cycle_dimension_df["Cycle"], "inner") \
        #         .join(weather_dimension_df, df["times_tamp"] == weather_dimension_df["times_tamp"] , "inner") \
        #         .join(irrigation_dimension_df, df["times_tamp"] == irrigation_dimension_df["times_tamp"], "inner") \
        #         .select(existing_sensor_ids["sensor_id"], "time_id", "crop_id", "location_id", "cycle_id", "weather_id", "irrigation_id", "ETc", "ETc_mm", "ET0") \
        #         .distinct()
        
    # Join with existing sensor IDs
        fact_df = df.join(existing_sensor_ids, on=df["sensor_id"] == existing_sensor_ids["sensor_id"], how="inner")
    # Join with time dimension
        fact_df = fact_df.join(time_dimension_df, on="times_tamp", how="inner")

        # Join with crop dimension
        fact_df = fact_df.join(crop_dimension_df, on=["CropType", "Kc"], how="inner")

        # Join with location dimension
        fact_df = fact_df.join(location_dimension_df, on=["latitude", "altitude"], how="inner")

        # Join with cycle dimension
        fact_df = fact_df.join(cycle_dimension_df, on=["Cycle"], how="inner")

        # Join with weather dimension
        fact_df = fact_df.join(weather_dimension_df, on="times_tamp", how="inner")

        # Join with irrigation dimension
        fact_df = fact_df.join(irrigation_dimension_df, on="times_tamp", how="inner")

        # Select columns and remove duplicates
        fact_df = fact_df.select(existing_sensor_ids["sensor_id"], "time_id", "crop_id", "location_id", "cycle_id", "weather_id", "irrigation_id", "ETc", "ETc_mm", "ET0", "cycle_status").distinct()
        # Write fact table data      
        fact_df.write \
            .format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", "fact_table") \
            .option("user", jdbc_properties["user"]) \
            .option("password", jdbc_properties["password"]) \
            .option("driver", jdbc_properties["driver"]) \
            .mode("append") \
            .save()

    # Start the streaming query
    query = processed_stream_df \
        .writeStream \
        .foreachBatch(foreach_batch_function) \
        .start()

    query.awaitTermination()
if __name__ == "__main__":
    main()



