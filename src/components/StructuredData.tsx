export default function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Link Shortener",
        "alternateName": "ระบบย่อลิงก์",
        "url": "http://localhost:3000",
        "description": "บริการย่อลิงก์ออนไลน์ฟรี เปลี่ยนลิงก์ยาวๆ ให้สั้นกระชับ ใช้งานง่าย รวดเร็ว ปลอดภัย",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "THB"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250"
        },
        "featureList": [
            "ย่อลิงก์ฟรี",
            "ไม่จำกัดจำนวน",
            "คัดลอกลิงก์อัตโนมัติ",
            "ไม่ต้องสมัครสมาชิก",
            "รวดเร็วและปลอดภัย"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
