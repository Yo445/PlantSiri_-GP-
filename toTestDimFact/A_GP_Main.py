import random
import string
import time
from datetime import datetime
from confluent_kafka import Producer

kafka_config = {
    'bootstrap.servers': 'localhost:9092',
}


kafka_topic = 'KARIM55'

def generate_weather_data():
    current_timestamp = int(time.time())
    # Generate or collect  meteorological parameters for Penman-Monteith
    data = {
            # 'sensor_id': ''.join(random.choices(string.ascii_letters + string.digits, k=8)),
             'sensor_id': 'karim',
            'times_tamp': datetime.fromtimestamp(current_timestamp).strftime('%Y-%m-%d %H:%M:%S'),
            'CropType': random.choice(["maize", "wheat", "tomato", "rice", "soybean"]),
            'Tmax': random.uniform(25, 35),      # °C
            'Tmin': random.uniform(15, 25),      # °C
            'Rs': random.uniform(15, 30),        # MJ/m²/day # Solar Radiation (MJ/m²/day)
            'u2': random.uniform(2, 6),          # m/s # Wind Speed (m/s).
            'RH_max': random.uniform(30, 70),    # % # Max Humidity percentage
            'RH_min': random.uniform(10, 30),    # % # Min Humidity percentage
            'soil_moisture': random.uniform(0, 100),  # soil_moisture
            'P': 101.3,                          # kPa (standard atmospheric pressure at sea level)
            'cp': 1.013,                         # kJ/kg°C (specific heat of air at constant pressure)
            'latent_heat_of_vaporization': 2.45, # MJ/kg (latent heat of vaporization for water)
            'latitude': random.uniform(22, 31),  #  Egypt's latitude varies across the country but is generally between 22° and 31° North.
            'altitude': random.uniform(7, 108),  # Replace with the actual altitude of your location in meters
            'albedo': 0.2,  # Replace with the actual albedo of your surface
            'emissivity': 0.9,  # Replace with the actual emissivity of your surface
            'G': 0.1,  # Replace 0.1 with the actual soil heat flux density value in MJ m-2
            'start_irrigation' : datetime.now().strftime("%H:%M:%S"),
            'end_irrigation' :0,
            'IrrigationDuration': 0,
            'Status': 'not irrigated',
            'ETc': 0,
            'ET0': 0,
            'Kc': 0,
            'Cycle': 1,
            'start_date': datetime.now().date().strftime('%Y-%m-%d'),
            'end_date': "NULL",
            'end_time': "NULL",
            'cycle_status': "ON",
            'water_requirement': 0, # The Actual Water that the Wheat need!
            'Area': random.uniform(500, 40000), # The irrigated area (m²)
            'irrigation_efficiency': random.uniform(80, 100), # The efficiency of the irrigation system (%)
            'flow_rate': 200 , #The flow rate of the irrigation system (L/s) @@ This value depends on the specific irrigation system design and pumping capacity.

    }
    return data

def delivery_report(err, msg):
    if err is not None:
        print('Message delivery failed: {}'.format(err))
    else:
        print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))

def send_data_to_kafka(producer, topic, data):
    producer.produce(topic, key=data['sensor_id'], value=str(data), callback=delivery_report)
    producer.poll(0)  # Trigger the delivery report callback
    producer.flush()

def main():
    producer = Producer(kafka_config)
    number = 1
    try:
        while number != 0:
            weather_data = generate_weather_data()
            send_data_to_kafka(producer, kafka_topic, weather_data)
            # Sleep for some time before generating the next set of data
            # Adjust the sleep duration based on your requirements
            number -=1
            time.sleep(2)
    except KeyboardInterrupt:
        pass
    finally:
        producer.flush()

if __name__ == '__main__':
    main()


