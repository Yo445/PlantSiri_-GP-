const router = require("express").Router();
const conn = require("../db/dbconnection");
const util = require("util");
const { updateEndDate } = require("./update");
// Promisify the query function
const queryAsync = util.promisify(conn.query).bind(conn);

// drop down name sensor((true))
// ************************************************************
router.get("/sensors", async (req, res) => {
  try {
    updateEndDate();
    const query = `
          SELECT
              s.sensor_id,
              i.Status,
              i.fact_id
          FROM
              sensor_dimension s
          JOIN
              (
                  SELECT
                      f.sensor_id,
                      i.Status,
                      f.fact_id,
                      ROW_NUMBER() OVER (PARTITION BY f.sensor_id ORDER BY f.fact_id DESC) as row_num
                  FROM
                      fact_table f
                  JOIN
                      irrigation_dimension i ON f.irrigation_id = i.irrigation_id
              ) AS i ON s.sensor_id = i.sensor_id
          WHERE
              i.row_num = 1;
      `;

    const result = await queryAsync(query);

    res.json(result); // Sending the query result as a JSON response
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Sending an error response if there's an error
  }
});

// *************************************
// Route to get the last row of data for a specific sensor ID((true))
router.get("/data/:sensorId", async (req, res) => {
  try {
    updateEndDate();
    // updateEndDate()

    const sensorId = req.params.sensorId;
    const query = `
      SELECT 
        f.fact_id,
        s.sensor_id,
        cr.CropType,
        t.start_date,
        t.end_date,
        cy.Cycle,
        i.times_tamp,
        f.cycle_status,
        i.IrrigationDuration,
        i.soil_moisture,
        i.end_irrigation,
        i.Status,
        i.water_requirement,
        w.u2,
        w.RH_max,
        w.RH_min,
        w.Tmax,
        w.Tmin,
        f.ET0_mm
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
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
// ****************************
router.get("/specificRoute/:sensorId/:year?", async (req, res) => {
  try {
    const sensorId = req.params.sensorId;
    let year = req.params.year;

    let query = `
      SELECT 
        f.fact_id, 
        s.sensor_id, 
        cr.CropType, 
        t.start_date, 
        t.end_date, 
        cy.Cycle, 
        f.cycle_status, 
        i.IrrigationDuration, 
        i.soil_moisture,
        i.end_irrigation, 
        i.Status, 
        i.water_requirement,
        w.u2, 
        w.RH_max, 
        w.RH_min, 
        w.Tmax, 
        w.Tmin, 
        f.ET0_mm
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
        s.sensor_id = ?`;

    const queryParams = [sensorId];

    if (year) {
      query += ` AND YEAR(t.start_date) = ?`;
      queryParams.push(year);
    }

    query += ` ORDER BY t.start_date ASC;`;

    const results = await queryAsync(query, queryParams);

    res.json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// *******************

router.get("/allDataSpecificYear/:year?", async (req, res) => {
  try {
    let sqlQuery = `SELECT f.fact_id, s.sensor_id,
                        cr.CropType, t.start_date,
                        t.end_date, cy.Cycle, f.cycle_status,
                        i.IrrigationDuration, i.end_irrigation, i.soil_moisture, 
                        i.Status, i.water_requirement, w.u2, 
                        w.RH_max, w.RH_min, 
                        w.Tmax, w.Tmin, f.ET0_mm
                    FROM fact_table f 
                    JOIN sensor_dimension s ON f.sensor_id = s.sensor_id 
                    JOIN crop_dimension cr ON f.crop_id = cr.crop_id 
                    JOIN time_dimension t ON f.time_id = t.time_id 
                    JOIN cycle_dimension cy ON f.cycle_id = cy.cycle_id 
                    JOIN irrigation_dimension i ON f.irrigation_id = i.irrigation_id 
                    JOIN weather_dimension w ON f.weather_id = w.weather_id`;

    const year = req.params.year;
    if (year) {
      // If year is provided, add WHERE clause to filter by year
      sqlQuery += ` WHERE YEAR(t.start_date) = ?`;
    }
    sqlQuery += ` ORDER BY f.fact_id ASC`;

    // Execute the query asynchronously
    const results = await queryAsync(sqlQuery, year ? [year] : []);

    res.json(results); // Send the results as JSON response
  } catch (error) {
    console.error("Error executing query: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// *************
router.get("/sensorss_data", async (req, res) => {
  try {
    updateEndDate();

    const query = `
      SELECT 
          AVG(w.Tmax) AS AVG_Tmax,
          AVG(w.Tmin) AS AVG_Tmin,
          AVG(w.RH_max) AS AVG_RH_max,
          AVG(w.RH_min) AS AVG_RH_min,
          AVG(w.Rs) AS AVG_Rs,
          AVG(w.u2) AS AVG_u2,
          SUM(i.water_requirement) AS total_water_requirement,
          AVG(i.Area) AS AVG_Area,
          AVG(i.soil_moisture) AS AVG_soil_moisture,

          MIN(t.start_date) AS first_start_date,
          MAX(t.end_date) AS latest_end_date,
          COUNT(CASE WHEN f.cycle_status = 'TRUNCATE' THEN 1 END) AS Cycle
      FROM 
          fact_table f 
      JOIN 
          sensor_dimension s ON f.sensor_id = s.sensor_id 
      JOIN 
          irrigation_dimension i ON f.irrigation_id = i.irrigation_id 
      JOIN 
          weather_dimension w ON f.weather_id = w.weather_id 
      JOIN 
          time_dimension t ON f.time_id = t.time_id;
    `;

    const results = await queryAsync(query);
    res.json(results);
  } catch (err) {
    console.error("Error fetching sensor data:", err);
    res.status(500).json({ error: "Failed to fetch sensor data" });
  }
});

module.exports = router;
