/*
  # Dream Architect Database Schema

  1. New Tables
    - `generated_images`
      - `id` (uuid, primary key) - Unique identifier for each image
      - `user_id` (uuid, foreign key to auth.users) - User who generated the image
      - `prompt` (text) - The text prompt used to generate the image
      - `style` (text) - The style selected (Realistic, 3D, Digital Art, etc.)
      - `image_url` (text) - URL or path to the generated image
      - `is_favorite` (boolean) - Whether the user marked this as favorite
      - `created_at` (timestamptz) - Timestamp of generation

  2. Security
    - Enable RLS on `generated_images` table
    - Add policy for authenticated users to view their own images
    - Add policy for authenticated users to insert their own images
    - Add policy for authenticated users to update their own images
    - Add policy for authenticated users to delete their own images

  3. Notes
    - Users can only access their own generated images
    - All images are tied to authenticated users for proper access control
    - Favorites are stored as a boolean flag for quick filtering
*/

CREATE TABLE IF NOT EXISTS generated_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prompt text NOT NULL,
  style text DEFAULT 'Realistic' NOT NULL,
  image_url text NOT NULL,
  is_favorite boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own images"
  ON generated_images FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own images"
  ON generated_images FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own images"
  ON generated_images FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own images"
  ON generated_images FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_generated_images_user_id ON generated_images(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_images_created_at ON generated_images(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generated_images_favorites ON generated_images(user_id, is_favorite) WHERE is_favorite = true;