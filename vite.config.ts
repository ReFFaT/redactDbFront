import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svg from '@poppanator/sveltekit-svg'

export default defineConfig({
	plugins: [
		sveltekit(),
		svg({
			includePaths: ['./src/lib/icons/'],
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: 'preset-default',
					// by default svgo removes the viewBox which prevents svg icons from scaling
					// not a good idea! https://github.com/svg/svgo/pull/1461
						params: { overrides: { removeViewBox: false } },
					},
					{ name: 'removeAttrs', params: { attrs: '(fill|stroke)' } },
				],
			},
		}),
	],
	css:{
		preprocessorOptions:{
			scss:{
				additionalData: `@import "src/styles/variables.scss";`
			}
		}
	}
});
