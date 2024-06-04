// const moment = require('moment');
// const util = require('util');
// const conn = require('../db/dbconnection');
// const { sendToKafka } = require('../kafkaproducer'); // Import the sendToKafka function

// const query = util.promisify(conn.query).bind(conn);

// async function updateIrrigationStatus() {
//     try {
//         const currentDate = moment().format('YYYY-MM-DD');
//         const currentTime = moment().format('HH:mm:ss');
        
//         // Log the current date and time values
       

//         const sqlQuery = `
//             UPDATE irrigation_dimension 
//             SET Status = 
//                 CASE 
//                     WHEN times_tamp = ? OR CAST(end_irrigation AS TIME) >= ? THEN 'not irrigated'
//                     ELSE 'irrigated'
//                 END
//             WHERE Status <> 'irrigated';
//         `;

//         // Execute the SQL query to update irrigation status and get the number of affected rows
//         const result = await query(sqlQuery, [currentDate, currentTime]);

//         if (result.affectedRows > 0) {
//             console.log('Irrigation status updated successfully.');
            
//             // Check if the status was updated to 'irrigated'
//             if (result.changedRows > 0) {
//                 console.log('Irrigation status was updated to irrigated. Sending data to Kafka.');
//             }
//         } else {
//             console.log('No irrigation status was updated.');
//         }
//     } catch (error) {
//         console.error('Error updating irrigation status:', error);
//         throw error;
//     }
// }



// async function updateEndDates() {
//     try {
//         const sqlQuery = `
//             UPDATE time_dimension AS t
//             JOIN fact_table AS f ON t.time_id = f.time_id
//             JOIN cycle_dimension AS c ON f.cycle_id = c.cycle_id
//             SET t.end_date = 
//                 CASE 
//                     WHEN c.cycle = 1 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 20 DAY)
//                     WHEN c.cycle = 2 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 34 DAY)
//                     WHEN c.cycle = 3 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 6 DAY)
//                     WHEN c.cycle = 4 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 20 DAY)
//                     WHEN c.cycle = 5 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 20 DAY)
//                     WHEN c.cycle = 6 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 20 DAY)
//                     ELSE t.end_date
//                 END
//             WHERE t.end_date IS NULL;
//         `;

//         // Execute the SQL query to update end dates and get the number of affected rows
//         const result = await query(sqlQuery);

//         if (result.affectedRows > 0) {
//             console.log('End dates updated successfully.');

//         } else {
//             console.log('No end dates were updated.');
//         }

//         // After updating end dates, check for data updates and send them to Kafka
//     } catch (error) {
//         console.error('Error updating end dates:', error);
//         throw error;
//     }
// }



// async function updateCycleStatus() {
//     try {
//         const updateCycleStatusQuery = `
//         UPDATE fact_table AS f
//         JOIN cycle_dimension AS c ON c.cycle_id = f.cycle_id
//         JOIN irrigation_dimension AS i ON f.irrigation_id = i.irrigation_id
//         SET f.cycle_status = 'OFF'
//         WHERE i.Status = 'irrigated' AND f.cycle_status = 'ON';
//         `;

//         // Execute the update query and get the number of affected rows
//         const result = await query(updateCycleStatusQuery);
        
//         if (result.affectedRows > 0) {
//             console.log('Cycle status updated successfully.');
//             const kafkaData = await getKafkaData(); // Function to fetch necessary data for Kafka message
//             // Send data to Kafka
//             sendToKafka(kafkaData);

//         } else {
//             console.log('Cycle status not updated because it is already OFF.');
//         }

//         // After updating cycle status, check for data updates and send them to Kafka
//     } catch (error) {
//         console.error('Error updating cycle status:', error);
//         throw error;
//     }
// }





// // async function updateCycleStatus() {
// //     try {
// //         const updateCycleStatusQuery = `
// //             UPDATE fact_table AS f
// //             JOIN cycle_dimension AS c ON c.cycle_id = f.cycle_id
// //             JOIN irrigation_dimension AS i ON f.irrigation_id = i.irrigation_id
// //             SET f.cycle_status = 'OFF'
// //             WHERE i.Status = 'irrigated' AND f.cycle_status = 'ON';
// //         `;

// //         // Execute the update query and get the number of affected rows
// //         const result = await query(updateCycleStatusQuery);
        
// //         if (result.affectedRows > 0) {
// //             console.log('Cycle status updated successfully.');
            
// //             // Fetch the updated data for Kafka message
// //             const kafkaData = await getKafkaData();

// //             if (kafkaData) {
// //                 // Send data to Kafka
// //                 sendToKafka(kafkaData);
// //                 console.log('Data sent to Kafka:', kafkaData);
// //             } else {
// //                 console.log('No data found for Kafka message.');
// //             }
// //         } else {
// //             console.log('Cycle status not updated because it is already OFF.');
// //         }

// //     } catch (error) {
// //         console.error('Error updating cycle status:', error);
// //         throw error;
// //     }
// // }

// async function getKafkaData() {
//     try {
//         // Fetch necessary data (sensor_id, end_date, cycle) from the database
//         const sqlQuery = `
//         SELECT 
//         f.sensor_id, 
//         t.end_date, 
//         c.Cycle 
//     FROM 
//         fact_table f 
//     JOIN 
//         time_dimension t ON f.time_id = t.time_id 
//     JOIN 
//         irrigation_dimension i ON f.irrigation_id = i.irrigation_id 
//     JOIN 
//         cycle_dimension c ON f.cycle_id = c.cycle_id 
//     WHERE 
//         f.cycle_status = 'OFF'
//         AND i.Status = 'irrigated'
//         AND t.end_date = CURDATE()
//         `;

//         const result = await query(sqlQuery);

//         // Check if result is empty
//         if (result.length === 0) {
//             console.log('No data found for Kafka message.');
//             return null; // Or handle the absence of data in another appropriate way
//         }

//         // Assuming the query returns a single row with sensor_id, end_date, and cycle
//         const { sensor_id, end_date, Cycle } = result[0];
//         // Format the data for Kafka message
//         const kafkaData = { sensor_id, end_date, Cycle };
//         console.log("done");
//         return kafkaData;
//     } catch (error) {
//         console.error('Error fetching data for Kafka message:', error);
//         throw error;
//     }
// }



// async function updateEndDate() {
//     try {
//         await updateEndDates();
//         await updateCycleStatus();
//         await updateIrrigationStatus();
//         console.log('All operations completed successfully.');
//     } catch (error) {
//         console.error('Error updating end dates, cycle status, and sending data to Kafka:', error);
//         throw error;
//     }
// }

// async function updateEndIrrigation() {
//     try {
//         const sqlQuery = `
//         UPDATE irrigation_dimension 
//         SET end_irrigation = DATE_ADD(
//             STR_TO_DATE(start_irrigation, '%H:%i:%s'), 
//             INTERVAL IrrigationDuration SECOND
//         )
//         WHERE end_irrigation IS NULL OR end_irrigation=0;
        
//         `;
        
//         // Execute the SQL query to update end irrigation and get the number of affected rows
//         const result = await query(sqlQuery);

//         if (result.affectedRows > 0) {
//             console.log('End irrigation updated successfully.');


//         } else {
//             console.log('No end irrigation was updated.');
//         }

//         // After updating irrigation end, check for data updates and send them to Kafka
//     } catch (error) {
//         console.error('Error updating end irrigation:', error);
//         throw error;
//     }
// }


// module.exports = {
//     updateEndDate,
//     updateEndIrrigation
// };


// 

// Import necessary modules
const moment = require('moment');
const util = require('util');
const conn = require('../db/dbconnection');
const { sendToKafka } = require('../kafkaproducer'); // Import the sendToKafka function

// Promisify the database query function
const query = util.promisify(conn.query).bind(conn);

// Function to fetch data from the database and send to Kafka
async function getKafkaData() {
    try {
        // Fetch necessary data (id_sensor, cycle, end_date, latitude) from the database
        const sqlQuery = `
        SELECT 
        f.sensor_id AS id_sensor, 
        CASE 
            WHEN c.Cycle = 6 THEN 
                DATE_FORMAT(ADDDATE(STR_TO_DATE(t.end_date, '%Y-%m-%d '), INTERVAL 1 DAY), '%Y-%m-%d')
            ELSE t.end_date 
        END AS end_date,
        CASE 
            WHEN c.Cycle = 6 THEN 0 
            ELSE c.Cycle 
        END AS cycle, -- Adjust cycle value
        l.latitude AS latitude,
        l.altitude AS altitude,
        CASE 
            WHEN c.Cycle = 6 THEN 'PENDING' 
            ELSE f.cycle_status 
        END AS cycle_status -- Update cycle_status to 'PENDING' if Cycle is 6
    FROM 
        fact_table f 
    JOIN 
        time_dimension t ON f.time_id = t.time_id 
    JOIN 
        irrigation_dimension i ON f.irrigation_id = i.irrigation_id 
    JOIN 
        cycle_dimension c ON f.cycle_id = c.cycle_id 
    JOIN 
        location_dimension l ON f.location_id = l.location_id 
    WHERE 
        (f.cycle_status = 'OFF')
        AND i.Status = 'irrigated'
        AND t.end_date = CURDATE()
        AND (
            t.end_time = CURRENT_TIME()
            OR t.end_time = ADDTIME(CURRENT_TIME(), '00:02:00')
        );
    
        `;

        const result = await query(sqlQuery);

        // Check if result is empty
        if (result.length === 0) {
            console.log('No data found for Kafka message.');
            return null; // Or handle the absence of data in another appropriate way
        }

        // Prepare and send data to Kafka individually
        for (const row of result) {
            const kafkaData = {
                id_sensor: row.id_sensor,
                cycle: row.cycle,
                end_date: row.end_date,
                cycle_status:row.cycle_status,
                latitude: row.latitude

            };
            sendToKafka(kafkaData);
            console.log('Data sent to Kafka:', kafkaData);
        }

    } catch (error) {
        console.error('Error fetching data for Kafka message:', error);
        throw error;
    }
}


// Function to update end dates, cycle status, and send data to Kafka
async function updateEndDate() {
    try {
        // Update end dates
        await updateEndDates();
        // Update end irrigation
        await updateEndIrrigation();
         // Update irrigation status
         await updateIrrigationStatus();
        // Update cycle status and send data to Kafka
        await updateCycleStatus();
       
        
        console.log('All operations completed successfully.');
    } catch (error) {
        console.error('Error updating end dates, cycle status, and sending data to Kafka:', error);
        throw error;
    }
}

// Function to update end dates based on cycle type
async function updateEndDates() {
    try {
        const sqlQuery = `
            UPDATE time_dimension AS t
            JOIN fact_table AS f ON t.time_id = f.time_id
            JOIN cycle_dimension AS c ON f.cycle_id = c.cycle_id
            SET t.end_date = 
                CASE 
                    WHEN c.cycle = 1 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 20 DAY)
                    WHEN c.cycle = 2 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 34 DAY)
                    WHEN c.cycle = 3 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 6 DAY)
                    WHEN c.cycle = 4 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 20 DAY)
                    WHEN c.cycle = 5 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 20 DAY)
                    WHEN c.cycle = 6 THEN DATE_ADD(STR_TO_DATE(t.start_date, '%Y-%m-%d'), INTERVAL 20 DAY)
                    ELSE t.end_date
                END
            WHERE t.end_date = 'NULL' AND t.start_date = CURDATE();
        `;

        // Execute the SQL query to update end dates and get the number of affected rows
        const result = await query(sqlQuery);

        if (result.affectedRows > 0) {
            console.log('End dates updated successfully.');
        } else {
            console.log('No end dates were updated.');
        }

    } catch (error) {
        console.error('Error updating end dates:', error);
        throw error;
    }
}

// Function to update cycle status to 'OFF' and send relevant data to Kafka
async function updateCycleStatus() {
    try {
        const updateCycleStatusQuery = `
        UPDATE fact_table AS f
        JOIN cycle_dimension AS c ON c.cycle_id = f.cycle_id
        JOIN irrigation_dimension AS i ON f.irrigation_id = i.irrigation_id
        JOIN time_dimension AS t ON f.time_id = t.time_id
        JOIN location_dimension AS l ON f.location_id = l.location_id
        SET 
            f.cycle_status = CASE 
                                WHEN c.Cycle = 6 THEN 'TRUNCATE'
                                ELSE 'OFF'
                            END,
            t.end_time = CURRENT_TIME()
        WHERE 
            i.Status = 'irrigated' AND 
            f.cycle_status = 'ON' AND 
            t.end_date = CURDATE();
        
        `;

        // Execute the update query and get the number of affected rows
        const result = await query(updateCycleStatusQuery);
        
        if (result.affectedRows > 0) {
            console.log('Cycle status updated successfully.');
            // Fetch the updated data for Kafka message
            const kafkaData = await getKafkaData();
            // Send data to Kafka if availabl
            
            if (kafkaData) {
                sendToKafka(kafkaData);
                console.log('Data sent to Kafka:', kafkaData);
            } else {
                console.log('No data found for Kafka message.');
            }
        } else {
            console.log('Cycle status not updated because it is already OFF or no relevant records found.');
        }

    } catch (error) {
        console.error('Error updating cycle status:', error);
        throw error;
    }
}

// Function to update irrigation status based on current date and time
async function updateIrrigationStatus() {
    try {
        const currentDate = moment().format('YYYY-MM-DD');
        const currentTime = moment().format('HH:mm:ss');
        
        const sqlQuery = `
            UPDATE irrigation_dimension 
            SET Status = 
                CASE 
                    WHEN times_tamp = ? OR CAST(end_irrigation AS TIME) >= ? THEN 'not irrigated'
                    ELSE 'irrigated'
                END
            WHERE Status = 'not irrigated';
        `;

        // Execute the SQL query to update irrigation status and get the number of affected rows
        const result = await query(sqlQuery, [currentDate, currentTime]);

        if (result.affectedRows > 0) {
            console.log('Irrigation status updated successfully.');
            
            // Check if the status was updated to 'irrigated'
            if (result.changedRows > 0) {
                console.log('Irrigation status was updated to irrigated. Sending data to Kafka.');
            }
        } else {
            console.log('No irrigation status was updated.');
        }

    } catch (error) {
        console.error('Error updating irrigation status:', error);
        throw error;
    }
}

// Function to update end irrigation
async function updateEndIrrigation() {
    try {
        const sqlQuery = `
        UPDATE irrigation_dimension 
        SET end_irrigation = DATE_ADD(
            STR_TO_DATE(start_irrigation, '%H:%i:%s'), 
            INTERVAL IrrigationDuration SECOND
        )
        WHERE end_irrigation IS NULL OR end_irrigation=0;
        
        `;
        
        // Execute the SQL query to update end irrigation and get the number of affected rows
        const result = await query(sqlQuery);

        if (result.affectedRows > 0) {
            console.log('End irrigation updated successfully.');
        } else {
            console.log('No end irrigation was updated.');
        }

    } catch (error) {
        console.error('Error updating end irrigation:', error);
        throw error;
    }
}



// Export the functions for external use
module.exports = {
    updateEndDate
};

