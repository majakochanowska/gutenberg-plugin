/**
 * Webpack Configuration
 *
 * @since 1.0.0
 */

const paths = require( './paths' );
const externals = require( './externals' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

// Export configuration.
module.exports = {
	entry: {
		'./dist/blocks.build': paths.pluginBlocksJs,
		'./dist/frontend.build': paths.pluginFrontendJs,
		css: paths.pluginCss,
	},
	optimization: {
		splitChunks: {
            cacheGroups: {
                style: {
                    name: 'style',
                    test: /style\.s?css$/,
                    chunks: 'all',
                    enforce: true,
                },
                editor: {
                    name: 'editor',
                    test: /editor\.s?css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					format: {
						comments: false,
					},
				},
			}),
		],
	},
	output: {
		pathinfo: true,
		// The dist folder.
		path: paths.pluginDist,
		filename: '[name].js', // [name] = './dist/blocks.build' as defined above.
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						
						// This is a feature of `babel-loader` for webpack (not Babel itself).
						// It enables caching results in ./node_modules/.cache/babel-loader/
						// directory for faster rebuilds.
						cacheDirectory: true,
					},
				},
			},
			{
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
		],
	},
	// Add plugins.
	plugins: [
		new MiniCssExtractPlugin({
            filename: 'dist/blocks.[name].build.css'
        }),
	],
	// Add externals.
	externals: externals,
};
