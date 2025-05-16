/*
  # Create inquiries table with RLS policies

  1. New Tables
    - `inquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text, nullable)
      - `service` (text)
      - `budget` (text)
      - `timeline` (text)
      - `message` (text)
      - `status` (text, default: 'new')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `inquiries` table
    - Add policies for:
      - SELECT: Authenticated users can read all inquiries
      - INSERT: Anyone can submit inquiries
      - UPDATE: Authenticated users can update inquiries
      - DELETE: Authenticated users can delete inquiries
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  budget text NOT NULL,
  timeline text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can read inquiries"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can insert inquiries"
  ON inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete inquiries"
  ON inquiries
  FOR DELETE
  TO authenticated
  USING (true);