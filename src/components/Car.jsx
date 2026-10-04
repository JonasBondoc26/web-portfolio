'use client';

import { useId } from 'react';

/* The race car. One SVG used twice: big in the hero, small in the lap bar.
   Its colours come from the --livery-* variables in globals.css, so it
   repaints when the theme changes. */

function Wheel({ cx }) {
    return (
        <g transform={`translate(${cx} 84)`}>
            <g className="car-wheel">
                <circle r="24" fill="#0c0d10" stroke="#3b3f4a" strokeWidth="1.5" />
                <circle r="18.5" fill="none" strokeWidth="2.5" strokeDasharray="20 9.05" style={{ stroke: 'var(--livery-1)' }} />
                <circle r="11" fill="#252932" />
                <path d="M0-11V11M-9.5-5.5 9.5 5.5M-9.5 5.5 9.5-5.5" stroke="#5a6070" strokeWidth="2" />
                <circle r="3.5" fill="#9aa1b1" />
            </g>
        </g>
    );
}

export default function Car() {
    const gradientId = 'livery' + useId().replace(/[^a-zA-Z0-9]/g, '');

    return (
        <svg className="car" viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" style={{ stopColor: 'var(--livery-3)' }} />
                    <stop offset=".45" style={{ stopColor: 'var(--livery-2)' }} />
                    <stop offset="1" style={{ stopColor: 'var(--livery-1)' }} />
                </linearGradient>
            </defs>
            <ellipse cx="208" cy="110" rx="184" ry="5" fill="#000" opacity=".28" />
            {/* rear wing */}
            <path d="M30 26H66L73 72H46Z" fill="#14161b" />
            <path d="M28 24H67L68.5 34H29.5Z" style={{ fill: 'var(--livery-1)' }} />
            <path d="M60 70 84 78V86L58 76Z" fill="#14161b" />
            {/* driver */}
            <circle cx="224" cy="47" r="9.5" style={{ fill: 'var(--livery-1)' }} />
            <path d="M225 42h8.5v6H225z" fill="#14161b" />
            {/* body */}
            <path d="M62 80 70 62 150 45Q164 33 174 30H194Q200 32 204 49L252 54Q282 58 302 66L392 88V94L300 93 262 97H120L62 91Z" fill={`url(#${gradientId})`} />
            {/* sidepod */}
            <path d="M146 66 236 62Q254 66 262 82L258 97H124L132 74Z" style={{ fill: 'var(--livery-3)' }} />
            <path d="M238 63Q252 67 259 80L247 79Z" fill="#14161b" />
            <text className="car-num" x="150" y="90" fontSize="22" fontWeight="800" fontStyle="italic" fill="#fff" letterSpacing="1">JB</text>
            {/* halo, floor, suspension, front wing */}
            <path d="M203 49Q230 35 257 55" fill="none" stroke="#14161b" strokeWidth="4" strokeLinecap="round" />
            <path d="M64 96H304V101H64Z" fill="#14161b" />
            <path d="M282 70 318 84M290 90 318 84" stroke="#14161b" strokeWidth="3" strokeLinecap="round" />
            <path d="M346 96H410V101H342Z" fill="#14161b" />
            <path d="M398 82 410 84V101H401Z" style={{ fill: 'var(--livery-1)' }} />
            <path d="M356 91 399 88" stroke="#14161b" strokeWidth="3" strokeLinecap="round" />
            <Wheel cx={92} />
            <Wheel cx={318} />
        </svg>
    );
}
