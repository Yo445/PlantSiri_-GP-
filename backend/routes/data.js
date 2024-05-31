const router = require('express').Router();
const conn = require('../db/dbconnection');
const util = require('util');

// Promisify the query function
const queryAsync = util.promisify(conn.query).bind(conn);

// drop down name sensor((true))
router.get('/sensors', async (req, res) => {
  try {
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
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // Sending an error response if there's an error
  }
});




// Route to get the last row of data for a specific sensor ID((true))
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
        i.water_requirement,
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



 



// بيرجع اخر 6 مراحل خلصو (TRUE)
// router.get('/dataa/:sensorId', async (req, res) => {
//   try {
//     const sensorId = req.params.sensorId;
//     const query = `
//     SELECT 
//       f.fact_id, 
//       s.sensor_id, 
//       cr.CropType, 
//       t.start_date, 
//       t.end_date, 
//       cy.Cycle, 
//       f.cycle_status, 
//       i.IrrigationDuration, 
//       i.end_irrigation, 
//       i.Status,
//       i.water_requirement, 
//       w.u2, 
//       w.RH_max, 
//       w.RH_min, 
//       w.Tmax, 
//       w.Tmin, 
//       f.ET0 
//     FROM 
//       fact_table f 
//     JOIN 
//       sensor_dimension s ON f.sensor_id = s.sensor_id 
//     JOIN 
//       crop_dimension cr ON f.crop_id = cr.crop_id 
//     JOIN 
//       time_dimension t ON f.time_id = t.time_id 
//     JOIN 
//       cycle_dimension cy ON f.cycle_id = cy.cycle_id 
//     JOIN 
//       irrigation_dimension i ON f.irrigation_id = i.irrigation_id 
//     JOIN 
//       weather_dimension w ON f.weather_id = w.weather_id 
//     WHERE 
//       f.cycle_status IN ('OFF', 'TRUNCATE')  -- Filter by cycle status
//       AND s.sensor_id = ?  -- Filter by sensor_id
//     ORDER BY 
//       t.start_date ASC  -- Order by start date
//     LIMIT 6;  -- Limit to the first 6 rows
//     `;
//     const results = await queryAsync(query, [sensorId]);

//     res.json(results);
//   } catch (err) {
//     console.error('Error fetching data:', err);
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });


// محتاج راوت يجيب اخر مرحله شغاله


// بيجيب كل قرايات السينسور
// router.get('/specificRoute/:sensorId', async (req, res) => {
//   try {
//     const sensorId = req.params.sensorId;

//     const query = `
//       SELECT 
//         f.fact_id, 
//         s.sensor_id, 
//         cr.CropType, 
//         t.start_date, 
//         t.end_date, 
//         cy.Cycle, 
//         f.cycle_status, 
//         i.IrrigationDuration, 
//         i.end_irrigation, 
//         i.Status, 
//         i.water_requirement,
//         w.u2, 
//         w.RH_max, 
//         w.RH_min, 
//         w.Tmax, 
//         w.Tmin, 
//         f.ET0 
//       FROM 
//         fact_table f 
//       JOIN 
//         sensor_dimension s ON f.sensor_id = s.sensor_id 
//       JOIN 
//         crop_dimension cr ON f.crop_id = cr.crop_id 
//       JOIN 
//         time_dimension t ON f.time_id = t.time_id 
//       JOIN 
//         cycle_dimension cy ON f.cycle_id = cy.cycle_id 
//       JOIN 
//         irrigation_dimension i ON f.irrigation_id = i.irrigation_id 
//       JOIN 
//         weather_dimension w ON f.weather_id = w.weather_id 
//       WHERE 
//         s.sensor_id = ?
//       ORDER BY 
//         t.start_date ASC;
//     `;

//     const results = await queryAsync(query, [sensorId]);

//     res.json(results);
//   } catch (err) {
//     console.error('Error fetching data:', err);
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });

//  بيرجع السنه لكل السينسور 
router.get('/distinct_years', async (req, res) => {
  try {
    const query = `SELECT DISTINCT YEAR(start_date) AS year FROM time_dimension  ORDER BY year ASC;;`;
    const rows = await queryAsync(query);
    
    // Extract the years from the rows
    const distinctYears = rows.map(row => row.year);

    // Filter out undefined values
    const filteredYears = distinctYears.filter(year => year !== undefined);

    // Send the distinct years as JSON response
    res.json(filteredYears);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//  بيرجع السنه 
router.get('/distinct_years/:sensor_id', async (req, res) => {
  const { sensor_id } = req.params;

  try {
    const query = `
      SELECT DISTINCT YEAR(td.start_date) AS year 
      FROM fact_table ft
      JOIN time_dimension td ON ft.time_id = td.time_id
      WHERE ft.sensor_id = ?
      ORDER BY year ASC;
    `;
    const rows = await queryAsync(query, [sensor_id]);
    
    // Extract the years from the rows
    const distinctYears = rows.map(row => row.year);

    // Filter out undefined values
    const filteredYears = distinctYears.filter(year => year !== undefined);

    // Send the distinct years as JSON response
    res.json(filteredYears);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// بيرجع المتوسط والمجموع وامتى السينسور بدء وامتى خلص
router.get('/sensor_data/:sensorId', async (req, res) => {
  try {
    const sensorId = req.params.sensorId;

    const query = `
      SELECT 
          main.sensor_id,
          AVG_Tmax,
          AVG_Tmin,
          AVG_RH_max,
          total_water_requirement,
          first_start_date,
          latest_end_date
      FROM (
          SELECT 
              f.sensor_id,
              AVG(w.Tmax) AS AVG_Tmax,
              AVG(w.Tmin) AS AVG_Tmin,
              AVG(w.RH_max) AS AVG_RH_max,
              SUM(i.water_requirement) AS total_water_requirement
          FROM 
              fact_table f 
          JOIN 
              sensor_dimension s ON f.sensor_id = s.sensor_id 
          JOIN 
              irrigation_dimension i ON f.irrigation_id = i.irrigation_id 
          JOIN 
              weather_dimension w ON f.weather_id = w.weather_id 
          WHERE 
              s.sensor_id = ?
          GROUP BY 
              f.sensor_id
      ) AS main
      JOIN (
          SELECT 
              f.sensor_id,
              MIN(t.start_date) AS first_start_date,
              MAX(t.end_date) AS latest_end_date
          FROM 
              fact_table f 
          JOIN 
              time_dimension t ON f.time_id = t.time_id 
          JOIN 
              sensor_dimension s ON f.sensor_id = s.sensor_id 
          WHERE 
              s.sensor_id = ?
          GROUP BY 
              f.sensor_id
      ) AS dates ON main.sensor_id = dates.sensor_id;
    `;

    const results = await queryAsync(query, [sensorId, sensorId]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching sensor data:', err);
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
});


//  بيجيب كل قرايات السينسور بالسسنه او من غير السنه

router.get('/specificRoute/:sensorId/:year?', async (req, res) => {
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
        i.end_irrigation, 
        i.Status, 
        i.water_requirement,
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
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.get('/allDataSpecificYear/:year?', async (req, res) => {
  try {
    let sqlQuery = `SELECT f.fact_id, s.sensor_id,
                        cr.CropType, t.start_date,
                        t.end_date, cy.Cycle, f.cycle_status,
                        i.IrrigationDuration, i.end_irrigation, 
                        i.Status, i.water_requirement, w.u2, 
                        w.RH_max, w.RH_min, 
                        w.Tmax, w.Tmin, f.ET0 
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
    console.error('Error executing query: ' + error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





//  بيرجع المتوسط والمجموع وامتى السينسور بدء وامتى خلص بالسنه

router.get('/sensor_data/:sensorId/:year', async (req, res) => {
  try {
    const sensorId = req.params.sensorId;
    const year = req.params.year;

    const query = `
      SELECT 
          main.sensor_id,
          AVG_Tmax,
          AVG_Tmin,
          AVG_RH_max,
          total_water_requirement,
          first_start_date,
          latest_end_date
      FROM (
          SELECT 
              f.sensor_id,
              AVG(w.Tmax) AS AVG_Tmax,
              AVG(w.Tmin) AS AVG_Tmin,
              AVG(w.RH_max) AS AVG_RH_max,
              SUM(i.water_requirement) AS total_water_requirement
          FROM 
              fact_table f 
          JOIN 
              sensor_dimension s ON f.sensor_id = s.sensor_id 
          JOIN 
              irrigation_dimension i ON f.irrigation_id = i.irrigation_id 
          JOIN 
              weather_dimension w ON f.weather_id = w.weather_id 
          JOIN 
              time_dimension t ON f.time_id = t.time_id 
          WHERE 
              s.sensor_id = ? AND YEAR(t.start_date) = ?
          GROUP BY 
              f.sensor_id
      ) AS main
      JOIN (
          SELECT 
              f.sensor_id,
              MIN(t.start_date) AS first_start_date,
              MAX(t.end_date) AS latest_end_date
          FROM 
              fact_table f 
          JOIN 
              time_dimension t ON f.time_id = t.time_id 
          JOIN 
              sensor_dimension s ON f.sensor_id = s.sensor_id 
          WHERE 
              s.sensor_id = ? AND YEAR(t.start_date) = ?
          GROUP BY 
              f.sensor_id
      ) AS dates ON main.sensor_id = dates.sensor_id;
    `;

    const results = await queryAsync(query, [sensorId, year, sensorId, year]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching sensor data:', err);
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
});







module.exports = router;
