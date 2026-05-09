import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [375, 390, 430, 768, 1024, 1280, 1440, 1920],
  },
};

export default withNextIntl(nextConfig);
