from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, struct , lit
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, IntegerType, FloatType
from pyspark.sql.functions import udf, expr, when 
# Configuration
KAFKA_BOOTSTRAP_SERVERS = "localhost:9092"
KAFKA_TOPIC = "Nifi2Spark"
# JDBC_URL = "jdbc:mysql://localhost:3306/dy_irr"
# JDBC_TABLE = "weather_data_five"
# JDBC_USER = "root"
# JDBC_PASSWORD = ""
# JDBC_DRIVER = "com.mysql.jdbc.Driver"

def get_crop_coefficient(crop_type):
    crop_coefficients = {
        "wheat": 0.9,
    }
    if crop_type in crop_coefficients:
        return crop_coefficients[crop_type]
    else:
        return 0
    
def get_crop_coefficient_udf_fun(crop_type):
    return get_crop_coefficient(crop_type)

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
        .option("kafka.bootstrap.servers", KAFKA_BOOTSTRAP_SERVERS) \
        .option("subscribe", KAFKA_TOPIC) \
        .option("startingOffsets", "earliest") \
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
 
#penman_monteith_udf = udf(penman_monteith_udf_fun, DoubleType())


def main():
    spark = create_spark_session("WeatherStreamProcessor")
    #schema = define_schema()
    # Kafka configuration
    kafka_params = {
        "kafka.bootstrap.servers": "localhost:9092",
        "subscribe": "Nifi2Spark",
        "startingOffsets": "earliest",
    }


    jdbc_url = "jdbc:mysql://localhost:3306/dy_irr"
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
    .withColumn("ETc_mm", col("Kc") * col("ET0")) \
    .withColumn("ET0_mm", col("ET0")) \
    .withColumn("ETc", col("ETc_mm") / 1000000) \
    .withColumn("ET0", col("ET0_mm") / 1000000) \
    .withColumn("Status", expr("CASE WHEN ETc_mm >= soil_moisture THEN 'irrigated' ELSE 'not irrigated' END"))\
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
        new_irrigation_dimension_df = df.select("times_tamp", "start_irrigation", "IrrigationDuration", "end_irrigation", "Status", "water_requirement", "Area", "soil_moisture", "irrigation_efficiency", "flow_rate") \
            .distinct() \
            .join(irrigation_dimension_df, ["times_tamp", "start_irrigation", "IrrigationDuration", "end_irrigation", "Status", "water_requirement", "Area", "soil_moisture", "irrigation_efficiency", "flow_rate"], "left_anti")

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
        fact_df = fact_df.select(existing_sensor_ids["sensor_id"], "time_id", "crop_id", "location_id", "cycle_id", "weather_id", "irrigation_id", "ETc_mm", "ET0_mm", "cycle_status").distinct()
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



