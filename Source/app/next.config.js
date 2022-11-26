/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	sassOptions: {
		includePaths: [
			"./styles",
			"./styles/pages"
		],
	}
}

module.exports = nextConfig
