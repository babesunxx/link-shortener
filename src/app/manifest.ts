import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Link Shortener - ระบบย่อลิงก์ฟรี',
        short_name: 'Link Shortener',
        description: 'บริการย่อลิงก์ออนไลน์ฟรี เปลี่ยนลิงก์ยาวๆ ให้สั้นกระชับ',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f0f23',
        theme_color: '#a78bfa',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
