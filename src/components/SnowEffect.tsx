'use client';

import { useEffect, useState } from 'react';

interface Snowflake {
    id: number;
    left: number;
    animationDuration: number;
    opacity: number;
    size: number;
}

export default function SnowEffect() {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        // Create 50 snowflakes
        const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: Math.random() * 3 + 2, // 2-5 seconds
            opacity: Math.random() * 0.6 + 0.4, // 0.4-1
            size: Math.random() * 10 + 5, // 5-15px
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="snow-container">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: `${flake.left}%`,
                        animationDuration: `${flake.animationDuration}s`,
                        opacity: flake.opacity,
                        fontSize: `${flake.size}px`,
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
}
