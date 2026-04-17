'use client';

import { useEffect, useState } from 'react';

function Counter({ value, duration = 2000 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value.toString().replace(/,/g, ''));
        if (isNaN(end)) return;

        const incrementTime = 16;
        const step = Math.ceil(end / (duration / incrementTime));

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    return count.toLocaleString();
}

export default function CountInfo({ bgColor = '#0b1f5b', items = [] }) {
    return (
        <section
            className="w-full py-10 md:py-16"
            style={{ backgroundColor: bgColor }}
        >
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center">

                        {/* VALUE */}
                        <div
                            className={`flex items-center gap-2 ${item.typeAlign === 'left' ? 'flex-row-reverse' : ''
                                }`}
                            style={{ color: item.valueColor || '#fff' }}
                        >
                            {item.valueType === 'prefix' && (
                                <span className="text-xl md:text-3xl font-bold">
                                    {item.symbol}
                                </span>
                            )}

                            <span className="text-3xl md:text-5xl font-extrabold">
                                <Counter value={item.value} />
                            </span>

                            {item.valueType === 'suffix' && (
                                <span className="text-lg md:text-2xl font-semibold">
                                    {item.symbol}
                                </span>
                            )}
                        </div>

                        {/* TEXT */}
                        <div
                            className="mt-2 text-sm md:text-lg"
                            style={{ color: item.textColor || '#60a5fa' }}
                        >
                            {item.text}
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}