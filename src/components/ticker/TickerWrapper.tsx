"use client";
import Ticker from "framer-motion-ticker";
import { ReactNode } from "react";

type props = {
    array: ReactNode[];
    styling?: object;
    duration?: number;
    direction?: number;
    backgroundColor?: string;
};

const TickerWrapper = ({
    array,
    styling,
    duration,
    direction,
    backgroundColor,
}: props) => {
    const backgroundColors = [
        "#632bf3",
        "#f122c8",
        "#f16022",
        "#9ef344",
        "#44d3f3",
    ];
    return (
        <Ticker duration={duration} direction={direction}>
            {array.map((item, index) => (
                <div
                    key={index}
                    style={{
                        backgroundColor: backgroundColors[index],
                        ...styling,
                    }}
                >
                    {item}
                </div>
            ))}
        </Ticker>
    );
};

export default TickerWrapper;
