const pool = require("../../config/db");

exports.fetchClasses = async (req, res) => {
  try {
    const fetchClass=await pool.query('select * from classes')
   
   return res.status(200).json({
      message: "Classes fetched successfully",
      totalRecords:fetchClass.rowCount,
      responseData: fetchClass.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.fetchSubjects = async (req, res) => {
  try {
    const { class_id } = req.body;

    if (!class_id) {
      return res.status(400).json({
        message: "class_id is required",
      });
    }

    const result = await pool.query(
      `
      SELECT
        s.id AS subject_id,
        s.subject_name,
        s.class_id,
        c.class_name
        FROM subjects s
      JOIN classes c ON s.class_id = c.id
      WHERE s.class_id = $1
      ORDER BY s.subject_name ASC
      `,
      [class_id]
    );

    return res.status(200).json({
      message: "Subjects fetched successfully",
      totalRecords: result.rowCount,
      responseData: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchYear = async (req, res) => {
  try {
    const fetchYear=await pool.query('select * from years')
   
   return res.status(200).json({
      message: "Years fetched successfully",
      totalRecords:fetchYear.rowCount,
      responseData: fetchYear.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.fetchSets = async (req, res) => {
  try {
    const fetchSet=await pool.query('select * from sets')
   
   return res.status(200).json({
      message: "Sets fetched successfully",
      totalRecords:fetchSet.rowCount,
      responseData: fetchSet.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
