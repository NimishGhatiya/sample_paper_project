const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Initialize Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const uploadToBucket = async (fileBuffer, originalName) => {
  const bucketName = 'sample_pdf';
  const fileName = `${Date.now()}_${originalName}`;

  // Upload the file
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileBuffer, {
      cacheControl: '3600',
      upsert: true,
            contentType: 'application/pdf', // crucial
    });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  // Make sure the bucket is public in Supabase dashboard
  // Return public URL
  const { data: publicData, error: publicError } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  if (publicError) {
    throw new Error(`Failed to get public URL: ${publicError.message}`);
  }

  // Supabase returns publicData.publicUrl
  return publicData.publicUrl;
};

module.exports = { uploadToBucket };
