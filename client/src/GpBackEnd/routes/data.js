const router = require('express').Router();
const conn = require('../db/dbconnection');
const util = require('util');

// Promisify the query function
const queryAsync = util.promisify(conn.query).bind(conn);

// drop down name sensor
router.get('/sensors', async (req, res) => {
  try {
    const query = 'SELECT sensor_id FROM sensor_dimension';
    const results = await queryAsync(query);
    const sensorIds = results.map(result => result.sensor_id);
    res.json(sensorIds);
  } catch (err) {
    console.error('Error fetching sensor IDs:', err);
    res.status(500).json({ error: 'Failed to fetch sensor IDs' });
  }
});

// Route to get the last row of data for a specific sensor ID
router.get('/data/:sensorId', async (req, res) => {
  try {
    const sensorId = req.params.sensorId;
    const query = `
      SELECT 
        f.fact_id,
        s.sensor_id,
        cr.CropType,
        t.start_date,
        t.end_date,
        cy.Cycle,
        f.cycle_status,
        i.IrrigationDuration,
        i.end_irrigation,
        i.Status,
        w.u2,
        w.RH_max,
        w.RH_min,
        w.Tmax,
        w.Tmin,
        f.ET0
      FROM 
        fact_table f
      JOIN 
        sensor_dimension s ON f.sensor_id = s.sensor_id
      JOIN 
        crop_dimension cr ON f.crop_id = cr.crop_id
      JOIN 
        time_dimension t ON f.time_id = t.time_id
      JOIN 
        cycle_dimension cy ON f.cycle_id = cy.cycle_id
      JOIN 
        irrigation_dimension i ON f.irrigation_id = i.irrigation_id
      JOIN 
        weather_dimension w ON f.weather_id = w.weather_id
      WHERE
        s.sensor_id = ?
        AND cy.Cycle BETWEEN 1 AND 6
      ORDER BY
        t.start_date DESC
      LIMIT 1;
    `;
    const results = await queryAsync(query, [sensorId]);

   

    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});



router.get('/dataa/:sensorId', async (req, res) => {
  try {
    const sensorId = req.params.sensorId;
    const query = `
    SELECT 
    f.fact_id,
    s.sensor_id,
    cr.CropType,
    t.start_date,
    t.end_date,
    cy.Cycle,
    f.cycle_status,
    i.IrrigationDuration,
    i.end_irrigation,
    i.Status,
    w.u2,
    w.RH_max,
    w.RH_min,
    w.Tmax,
    w.Tmin,
    f.ET0
FROM 
    fact_table f
JOIN 
    sensor_dimension s ON f.sensor_id = s.sensor_id
JOIN 
    crop_dimension cr ON f.crop_id = cr.crop_id
JOIN 
    time_dimension t ON f.time_id = t.time_id
JOIN 
    cycle_dimension cy ON f.cycle_id = cy.cycle_id
JOIN 
    irrigation_dimension i ON f.irrigation_id = i.irrigation_id
JOIN 
    weather_dimension w ON f.weather_id = w.weather_id
WHERE
    s.sensor_id = ?
    AND cy.Cycle BETWEEN 1 AND 6
ORDER BY
    t.start_date ASC
LIMIT 6;

    `;
    const results = await queryAsync(query, [sensorId, sensorId]);

   ;

    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});




router.get('/allcycles/:sensorId', async (req, res) => {
  try {
    const sensorId = req.params.sensorId;

    // Query to get all cycles
    const queryAllCycles = `
      SELECT 
        f.ET0,
        w.Tmax,
        w.RH_max,
        i.water_requirement,
        cy.Cycle
      FROM 
        fact_table f
      JOIN 
        weather_dimension w ON f.weather_id = w.weather_id
      JOIN 
        irrigation_dimension i ON f.irrigation_id = i.irrigation_id
      JOIN 
        cycle_dimension cy ON f.cycle_id = cy.cycle_id
      WHERE
        f.sensor_id = ?
      ORDER BY
        cy.Cycle DESC;
    `;

    // Query to get averages
    const queryAverages = `
      SELECT 
        AVG(w.Tmax) AS average_Tmax,
        AVG(w.Tmin) AS average_Tmin,
        SUM(i.water_requirement) AS total_water_requirement
      FROM 
        fact_table f
      JOIN 
        weather_dimension w ON f.weather_id = w.weather_id
      JOIN 
        irrigation_dimension i ON f.irrigation_id = i.irrigation_id
      JOIN 
        cycle_dimension cy ON f.cycle_id = cy.cycle_id
      WHERE
        f.sensor_id = ?
        AND cy.Cycle BETWEEN 1 AND 6;
    `;

    // Execute both queries concurrently
    const [cycles, averages] = await Promise.all([
      queryAsync(queryAllCycles, [sensorId]),
      queryAsync(queryAverages, [sensorId])
    ]);

    // Combine the cycles and averages into a single object
    const combinedData = {
      ...cycles[0], // Take the first cycle object
      ...averages[0] // Merge the average data
    };

    // Send the combined object as the response
    res.json([combinedData]);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.get('/lastcycle/:sensorId', async (req, res) => {
  try {
    const sensorId = req.params.sensorId;

    // Query to get all cycles
    const queryAllCycles = `
    SELECT 
      f.ET0,
      w.Tmax,
      w.RH_max,
      i.water_requirement,
      cy.Cycle
    FROM 
      fact_table f
    JOIN 
      weather_dimension w ON f.weather_id = w.weather_id
    JOIN 
      irrigation_dimension i ON f.irrigation_id = i.irrigation_id
    JOIN 
      cycle_dimension cy ON f.cycle_id = cy.cycle_id
    WHERE
      f.sensor_id = ?
    AND
      cy.Cycle BETWEEN 1 AND 6
    ORDER BY
      cy.Cycle DESC
    LIMIT 1;
    `;

    // Query to get averages
    const queryAverages = `
      SELECT 
        AVG(w.Tmax) AS average_Tmax,
        AVG(w.Tmin) AS average_Tmin,
        SUM(i.water_requirement) AS total_water_requirement
      FROM 
        fact_table f
      JOIN 
        weather_dimension w ON f.weather_id = w.weather_id
      JOIN 
        irrigation_dimension i ON f.irrigation_id = i.irrigation_id
      JOIN 
        cycle_dimension cy ON f.cycle_id = cy.cycle_id
      WHERE
        f.sensor_id = ?
        AND cy.Cycle BETWEEN 1 AND 6;
        ;
    `;

    // Execute both queries concurrently
    const [cycles, averages] = await Promise.all([
      queryAsync(queryAllCycles, [sensorId]),
      queryAsync(queryAverages, [sensorId])
    ]);

    // Combine the cycles and averages into a single object
    const combinedData = {
      ...cycles[0], // Take the first cycle object
      ...averages[0] // Merge the average data
    };

    // Send the combined object as the response
    res.json([combinedData]);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.get('/:sensor_id/:year', async (req, res) => {
  try {
    const year = req.params.year;
    const sensor_id= req.params.sensor_id
    const sqlQuery = `
      SELECT 
        f.sensor_id,
        f.ET0,
        cy.Cycle,
        w.Tmax,
        w.RH_max,
        w.u2,
        w.RH_max,
        w.RH_min,
        w.RH_min,
        MIN(t.start_date) AS first_start_date,
        MAX(t.end_date) AS last_end_date,
        AVG(f.ETc) AS avg_ETc,
        AVG(f.ETc_mm) AS avg_ETc_mm,
        AVG(f.ET0) AS avg_ET0,
        AVG(w.RH_max) AS avg_RH_max,
        SUM(i.water_requirement) AS total_water_requirement
      FROM 
        fact_table AS f
      JOIN 
        time_dimension AS t ON f.time_id = t.time_id
      JOIN 
        weather_dimension AS w ON f.weather_id = w.weather_id
      JOIN 
        irrigation_dimension AS i ON f.irrigation_id = i.irrigation_id
        JOIN 
        cycle_dimension cy ON f.cycle_id = cy.cycle_id
      WHERE 
        YEAR(t.start_date) = ? AND
        f.sensor_id = ?
      GROUP BY 
        f.sensor_id;
    `;

    // Execute the query
    const rows = await queryAsync(sqlQuery, [year, sensor_id]);
    // Check if any rows were returned
    if (rows && rows.length > 0) {
      // Extracting the necessary data from the first row
      const result = rows[0];

      // Extract the necessary data
      const responseData = {
        sensor_id: result.sensor_id,
        ET0: result.ET0,
        Cycle: result.Cycle,
        Tmax: result.Tmax,
        RH_max: result.RH_max,
        RH_min:result.RH_min,
        u2: result.u2,
        first_start_date: result.first_start_date,
        last_end_date: result.last_end_date,
        avg_ETc: result.avg_ETc,
        avg_ETc_mm: result.avg_ETc_mm,
        avg_ET0: result.avg_ET0,
        avg_RH_max: result.avg_RH_max,
        total_water_requirement: result.total_water_requirement
      };

      // Send the extracted data as the response
      res.json(responseData);
    } else {
      // Handle case where no data is found
      res.status(404).json({ error: 'No data found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
