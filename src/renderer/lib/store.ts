import type { lineType } from '@lib/types';
import { writable } from 'svelte/store';

const defaultLine: lineType = {
	line: 0,
	value: '(1 + 1) / 3',
	isValid: true,
};

export const lineStore = writable([defaultLine]);