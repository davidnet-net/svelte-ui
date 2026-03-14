import momoTrustDisplayUrl from "$lib/assets/fonts/Momo_Trust_Display/MomoTrustDisplay-Regular.woff2";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ url }) => {
	const absoluteFontUrl = new URL(momoTrustDisplayUrl, url.origin).href;

	const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style type="text/css">
                @font-face {
                    font-family: 'Momo Trust Display';
                    src: url("${absoluteFontUrl}") format("woff2");
                    font-weight: 400;
                    font-style: normal;
                }
                
                .title { 
                    fill: white; 
                    font-family: 'Momo Trust Display', sans-serif; 
                    font-size: 80px; 
                }

                .subtitle {
                    fill: #94a3b8;
                    font-family: sans-serif;
                    font-size: 24px;
                    letter-spacing: 2px;
                }

                .grid-line {
                    stroke: #1e293b;
                    stroke-width: 1;
                }
            </style>
        </defs>

        <rect width="1200" height="630" fill="#0f172a"/>
        
        <g class="grid-line">
            <path d="M0 100H1200M0 200H1200M0 300H1200M0 400H1200M0 500H1200" />
            <path d="M100 0V630M200 0V630M300 0V630M400 0V630M500 0V630M600 0V630M700 0V630M800 0V630M900 0V630M1000 0V630M1100 0V630" />
        </g>
        
        <circle cx="1100" cy="100" r="300" fill="#3b82f6" fill-opacity="0.15" filter="blur(80px)"/>
        
        <text x="600" y="315" class="title" text-anchor="middle" dominant-baseline="middle">
            Davidnet Design System
        </text>
        
        <text x="600" y="385" class="subtitle" text-anchor="middle">
            FOUNDATIONS • COMPONENTS • PATTERNS
        </text>
    </svg>
    `.trim();

	return new Response(svg, {
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=86400"
		}
	});
};
