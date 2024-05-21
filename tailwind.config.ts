import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        social: {
          facebook: "var(--social-facebook)",
          twitter: "var(--social-twitter)",
          linkedin: "var(--social-linkedin)",
          instagram: "var(--social-instagram)",
          youtube: "var(--social-youtube)",
          tiktok: "var(--social-tiktok)",
          pinterest: "var(--social-pinterest)",
          snapchat: "var(--social-snapchat)",
          reddit: "var(--social-reddit)",
          tumblr: "var(--social-tumblr)",
          twitch: "var(--social-twitch)",
          discord: "var(--social-discord)",
        },
      },
      zIndex: {
        "60": 60,
        "70": 70,
        "80": 80,
        "90": 90,
        "100": 100,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        blink: {
          "0%": { opacity: 0.2 },
          "20%": { opacity: 1 },
          "100% ": { opacity: 0.2 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        serif: ["var(--font-unisans)", ...fontFamily.serif],
        mono: ["var(--font-space)", ...fontFamily.mono],
        blacklisted: ["var(--font-blacklisted)"],
        lighters: ["var(--font-lighters)"],
        barlow: ["var(--font-barlow)"],
        kanit: ["var(--font-kanit)"],
      },
      backgroundImage: {
        "dark-fade": "linear-gradient(to right, #434343 0%, black 100%)",
        "cool-grey": "linear-gradient(60deg, #29323c 0%, #485563 100%)",
        "blue-night": "linear-gradient(to right, #243949 0%, #517fa4 100%)",
        "slate-gray": "linear-gradient(-20deg, #616161 0%, #9bc5c3 100%)",
        "metallic-fade": "linear-gradient(to right, #d7d2cc 0%, #304352 100%)",
        "sunset-purple":
          "linear-gradient(-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)",
        morpheus: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
        "dark-seas":
          "linear-gradient(to left top, #04070b, #05090d, #060c0f, #080e11, #091012, #11181a, #171f22, #1c272a, #28383c, #34494f, #405c62, #4d6f76)",
        lawrencium: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        royal: "linear-gradient(to right, #141e30, #243b55)",
        murdered: "linear-gradient(360deg,#030303 10%,#1f1f1f 360%)",
        "subtle-grey": "linear-gradient(360deg, #dee1e1 10%, #f4f4f4 360%)",
        haze: "linear-gradient(360deg,#949494 10%,#efefef 360%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
