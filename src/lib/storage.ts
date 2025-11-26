import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'links.json');

export interface LinkData {
    originalUrl: string;
    shortCode: string;
    createdAt: number;
}

// Helper to read DB
function readDb(): Record<string, LinkData> {
    if (!fs.existsSync(DB_PATH)) {
        return {};
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    try {
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

// Helper to write DB
function writeDb(data: Record<string, LinkData>) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function saveLink(originalUrl: string): string {
    const db = readDb();

    // Generate random 6-char code (ไม่ตรวจสอบ URL ซ้ำ - สร้างใหม่ทุกครั้ง)
    let shortCode = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    do {
        shortCode = '';
        for (let i = 0; i < 6; i++) {
            shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    } while (db[shortCode]); // Ensure uniqueness

    db[shortCode] = {
        originalUrl,
        shortCode,
        createdAt: Date.now(),
    };

    writeDb(db);
    return shortCode;
}

export function getLink(shortCode: string): string | null {
    const db = readDb();
    const link = db[shortCode];
    return link ? link.originalUrl : null;
}
