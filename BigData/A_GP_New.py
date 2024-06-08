import json
import random
import string
import time
from datetime import datetime
from confluent_kafka import Consumer, Producer

kafka_config = {
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'NewSensor',
    'auto.offset.reset': 'earliest'

}

input_topic = 'Trigger'
output_topic = 'SensorToNifi'

def generate_weather_data(sensor_id, cycle, start_date, latitude, altitude):
    current_timestamp = int(time.time())
    # Generate or collect meteorological parameters for Penman-Monteith
    data = {
        'sensor_id': sensor_id,
        'times_tamp': datetime.fromtimestamp(current_timestamp).strftime('%Y-%m-%d %H:%M:%S'),
        'CropType': random.choice(["wheat"]),
        'Tmax': random.uniform(25, 35),  # °C
        'Tmin': random.uniform(15, 25),  # °C
        'Rs': random.uniform(15, 30),  # MJ/m²/day # Solar Radiation (MJ/m²/day)
        'u2': random.uniform(2, 6),  # m/s # Wind Speed (m/s).
        'RH_max': random.uniform(30, 70),  # % # Max Humidity percentage
        'RH_min': random.uniform(10, 30),  # % # Min Humidity percentage
        'soil_moisture': random.uniform(40, 100),  # soil_moisture
        'P': 101.3,  # kPa (standard atmospheric pressure at sea level)
        'cp': 1.013,  # kJ/kg°C (specific heat of air at constant pressure)
        'latent_heat_of_vaporization': 2.45,  # MJ/kg (latent heat of vaporization for water)
        'latitude': latitude,  # Egypt's latitude varies across the country but is generally between 22° and 31° North.
        'altitude': altitude,  # Replace with the actual altitude of your location in meters
        'albedo': 0.2,  # Replace with the actual albedo of your surface
        'emissivity': 0.9,  # Replace with the actual emissivity of your surface
        'G': 0.1,  # Replace 0.1 with the actual soil heat flux density value in MJ m-2
        'start_irrigation': datetime.now().strftime("%H:%M:%S"),
        'end_irrigation': 0,
        'IrrigationDuration': 0,
        'Status': 'not irrigated',
        'ETc': 0,
        'ET0': 0,
        'Kc': 0,
        'Cycle': cycle + 1,
        'start_date': start_date,
        'end_date': "NULL",
        'end_time': "NULL",
        'cycle_status': "ON",
        'water_requirement': 0,  # The Actual Water that the Wheat need!
        'Area': random.uniform(500, 4200),  # The irrigated area (m²)
        'irrigation_efficiency': random.uniform(80, 100),  # The efficiency of the irrigation system (%)
        'flow_rate': 200,  # The flow rate of the irrigation system (L/s) @@ This value depends on the specific irrigation system design and pumping capacity.
    }
    return data

def delivery_report(err, msg):
    if err is not None:
        print('Message delivery failed: {}'.format(err))
    else:
        print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))

def send_data_to_kafka(producer, topic, data):
    producer.produce(topic, key=data['sensor_id'], value=json.dumps(data), callback=delivery_report)
    producer.poll(0)  # Trigger the delivery report callback
    producer.flush()

def main():
    consumer = Consumer(kafka_config)
    producer = Producer(kafka_config)
    consumer.subscribe([input_topic])

    try:
        while True:
            msg = consumer.poll(1.0)
            if msg is None:
                continue
            if msg.error():
                print("Consumer error: {}".format(msg.error()))
                continue
            # Process the message
            try:
                data = json.loads(msg.value())
                sensor_id = data.get('id_sensor')
                cycle = data.get('cycle')
                start_date = data.get('end_date')
                latitude = data.get('latitude')
                altitude = data.get('altitude')


                if True:
                    weather_data = generate_weather_data(sensor_id, cycle, start_date, latitude, altitude)
                    send_data_to_kafka(producer, output_topic, weather_data)
            except json.JSONDecodeError:
                print("Invalid JSON format in message")

    except KeyboardInterrupt:
        pass
    finally:
        consumer.close()
        producer.flush()

if __name__ == '__main__':
    main()
