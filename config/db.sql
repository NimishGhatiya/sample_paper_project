-- 1️⃣ Classes table
CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    class_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2️⃣ Sets table
CREATE TABLE IF NOT EXISTS sets (
    id SERIAL PRIMARY KEY,
    set_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3️⃣ Years table
CREATE TABLE IF NOT EXISTS years (
    id SERIAL PRIMARY KEY,
    year_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4️⃣ Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    class_id INT REFERENCES classes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5️⃣ SamplePapers table
CREATE TABLE IF NOT EXISTS samplepapers (
    id SERIAL PRIMARY KEY,
    class_id INT REFERENCES classes(id) ON DELETE CASCADE,
    year_id INT REFERENCES years(id) ON DELETE CASCADE,
    set_id INT REFERENCES sets(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    original_name VARCHAR(255),
    file_name VARCHAR(255),
    mime_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
