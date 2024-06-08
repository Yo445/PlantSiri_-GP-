const kafka = require("kafka-node");
const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

const payloads = [{ topic: "Trigger", messages: "", partition: 0 }];

// Set to store unique message identifierss
const sentMessageIds = new Set();
producer.on("ready", function () {
  console.log("Kafka Producer is ready");
});

producer.on("error", function (err) {
  console.error("Error:", err);
});

const sendToKafka = (data) => {
  if (!data) {
    console.error("Error: No data provided for Kafka message");
    return;
  }

  const message = JSON.stringify(data);
  const messageId = data.id_sensor; // Assuming each message has a unique identifier field 'id'

  // Check if the message identifier has already been sent
  if (!sentMessageIds.has(messageId)) {
    payloads[0].messages = message;
    producer.send(payloads, function (err, data) {
      if (err) {
        console.error("Error:", err);
      } else {
        console.log("Data sent to Kafka:", data);
        // Add the message identifier to the set of sent message identifiers
        sentMessageIds.add(messageId);
      }
    });
  } else {
    console.log("Message already sent to Kafka:", messageId);
  }
};

module.exports = { sendToKafka };
