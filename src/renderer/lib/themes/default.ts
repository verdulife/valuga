import type { themeType } from '@lib/types';

export const defaultTheme: themeType = {
  active: true,
  name: 'default',
  description: 'Default theme',
  styles: {
    main: `
			background: rgba(#fff, 0.3);
			box-shadow: inset 0 0 2px 1px rgba(#fff, 0.3);
			border-radius: 8px;
		`,
    wrapper: `
			background: #313131;
			border-radius: 6px;
			box-shadow: 0 5px 10px -5px rgba(#000, 0.7);
		`,
  },
};