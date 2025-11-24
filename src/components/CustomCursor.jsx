import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = ({ theme }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
        }
    };

    const isDark = theme === 'dark';
    const color = isDark ? '#8352FD' : '#4F46E5';

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
            variants={variants}
            animate="default"
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }}
            style={{
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${color})`,
                boxShadow: `
                    inset -5px -5px 10px rgba(0,0,0,0.3),
                    0 0 20px ${color}80
                `
            }}
        />
    );
};

export default CustomCursor;
