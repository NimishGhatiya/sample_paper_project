const pool = require("../../config/db");
const { uploadToBucket } = require("../../upload");
const fs=require('fs')
exports.addPapers = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const { class_id, subject_id, year_id, set_id } = req.body;

    const savedFiles = [];

    for (const file of req.files) {
            const publicUrl = await uploadToBucket(file.buffer, file.originalname);
      const result = await pool.query(
        `INSERT INTO samplePapers 
         (class_Id,subject_Id,set_Id,year_Id,original_name, file_name,mime_type,file_url)
         VALUES ($1, $2,$3,$4,$5,$6,$7,$8)
         RETURNING *`,
        [
          class_id,
          subject_id,
          set_id,
          year_id,
          file.originalname,
          file.filename,
          file.mimetype,
          publicUrl
        ]
      );

      savedFiles.push(result.rows[0]);
    }

    res.status(200).json({
      message: "Files uploaded successfully",
      files: savedFiles,
    });
  } catch (error) {
   return res.status(500).json({ error: error.message });
  }
};
exports.fetchPapers = async (req, res) => {
  try {
    const { class_id, year_id, set_id, subject_id } = req.body;
    // Validate required filters
    if (!class_id || !year_id || !set_id || !subject_id) {
      return res.status(400).json({
        message: "class_id, year_id, set_id and subject_id are required",
      });
    }

    const result = await pool.query(
      `
      SELECT 
        sp.id,
        sp.original_name,
        sp.file_name,
        sp.mime_type,
        sp.file_url,
        sp.created_at,

        c.class_name,
        y.year_name,
        st.set_name,
        sb.subject_name

      FROM samplepapers sp
      JOIN classes c ON sp.class_id = c.id
      JOIN years y ON sp.year_id = y.id
      JOIN sets st ON sp.set_id = st.id
      JOIN subjects sb ON sp.subject_id = sb.id

      WHERE
        sp.class_id = $1
        AND sp.year_id = $2
        AND sp.set_id = $3
        AND sp.subject_id = $4

      ORDER BY sp.created_at DESC
      `,
      [class_id, year_id, set_id, subject_id]
    );

    res.status(200).json({
      message: "Sample papers fetched successfully",
      files: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
