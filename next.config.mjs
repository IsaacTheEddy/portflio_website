
import createMDX from "@next/mdx"

const withMdx = createMDX({
    extension: /\.mdx?$/,
})

const nextConfig = {
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
    pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js']
};

export default withMdx(nextConfig);
