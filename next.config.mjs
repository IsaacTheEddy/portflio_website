
import createMDX from "@next/mdx"
import FaroSourceMapUploaderPlugin from "@grafana/faro-webpack-plugin"

const withMdx = createMDX({
    extension: /\.mdx?$/,
})

const nextConfig = {
    productionBrowserSourceMaps: true,
    webpack: (config, { isServer, dev }) => {
        config.resolve.alias.canvas = false;

        if (!isServer && !dev && process.env.FARO_API_KEY) {
            config.plugins.push(
                new FaroSourceMapUploaderPlugin({
                    appName: "portfolio-website",
                    endpoint: "https://faro-api-prod-us-east-3.grafana.net/faro/api/v1",
                    appId: "1312",
                    stackId: "1908544",
                    verbose: true,
                    apiKey: process.env.FARO_API_KEY,
                    gzipContents: true,
                })
            );
        }

        return config;
    },
    pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js']
};

export default withMdx(nextConfig);
