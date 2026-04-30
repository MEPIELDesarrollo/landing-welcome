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

export default function CountInfo({ bgColor = '#001563', items = [] }) {
    return (
        <section
            className="w-full py-13 md:py-19"
            style={{ backgroundColor: bgColor }}
        >
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center">

                        {/* VALUE */}
                        <div
                            className={`flex font-poppins font-bold items-center gap-2 ${item.typeAlign === 'left' ? 'flex-row-reverse' : ''
                                }`}
                            style={{ color: item.valueColor || '#fff' }}
                        >
                            {item.valueType === 'prefix' && (
                                <span className="text-xl md:text-4xl font-weight">
                                    {item.symbol}
                                </span>
                            )}

                            <span className="text-3xl md:text-7xl font-weight">
                                <Counter value={item.value} />
                            </span>

                            {item.valueType === 'suffix' && (
                                <span className="text-lg md:text-3xl font-weight">
                                    {item.symbol}
                                </span>
                            )}
                        </div>

                        {/* TEXT */}
                        <div
                            className="mt-2 text-sm md:text-lg font-poppins"
                            style={{ color: item.textColor || '#4F97ED' }}
                        >
                            {item.text}
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}