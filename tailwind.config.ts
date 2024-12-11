import type { Config } from 'tailwindcss'
import themer from "@tailus/themer";

export default {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        "./node_modules/@tailus/themer-**/dist/**/*.{js,ts}"
    ],
    plugins: [
        themer({
            palette: {
                extend: "oz",
            },
            radius: "smoothest",
            background: "light",
            border: "light",
            padding: "large"
        })
    ],
} satisfies Config;
