/*
  # Create services table

  1. New Tables
    - `services`
      - `id` (text, primary key)
      - `title` (text, not null)
      - `description` (text, not null)
      - `icon` (text, not null)
      - `mockup_url` (text, not null)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
  2. Security
    - Enable RLS on `services` table
    - Add policy for authenticated users to read and write
    - Add policy for anonymous users to read only
*/

CREATE TABLE IF NOT EXISTS services (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  mockup_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read services"
  ON services
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete services"
  ON services
  FOR DELETE
  TO authenticated
  USING (true);