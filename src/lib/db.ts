import { sql } from '@vercel/postgres';

export interface LinkData {
  originalUrl: string;
  shortCode: string;
  createdAt: number;
}

// Initialize database table
export async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS links (
        short_code VARCHAR(10) PRIMARY KEY,
        original_url TEXT NOT NULL,
        created_at BIGINT NOT NULL
      )
    `;
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Save a new link
export async function saveLink(originalUrl: string): Promise<string> {
  let shortCode = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let isUnique = false;
  while (!isUnique) {
    shortCode = '';
    for (let i = 0; i < 6; i++) {
      shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const existing = await sql`
      SELECT short_code FROM links WHERE short_code = ${shortCode}
    `;
    isUnique = existing.rows.length === 0;
  }

  await sql`
    INSERT INTO links (short_code, original_url, created_at)
    VALUES (${shortCode}, ${originalUrl}, ${Date.now()})
  `;

  return shortCode;
}

// Get original URL by short code
export async function getLink(shortCode: string): Promise<string | null> {
  try {
    const result = await sql`
      SELECT original_url FROM links WHERE short_code = ${shortCode}
    `;

    if (result.rows.length > 0) {
      return result.rows[0].original_url;
    }
    return null;
  } catch (error) {
    console.error('Error getting link:', error);
    return null;
  }
}
