
-- Add nombre column to newsletter_subscribers table
ALTER TABLE newsletter_subscribers
ADD COLUMN nombre TEXT NOT NULL DEFAULT '' AFTER email;

-- Update the default constraint after adding the column
ALTER TABLE newsletter_subscribers
ALTER COLUMN nombre DROP DEFAULT;

