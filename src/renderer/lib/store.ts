import type { lineType } from '@lib/types';
import { writable } from 'svelte/store';

const defaultLine: lineType = {
	line: 0,
	value: '',
	isValid: true,
};

export const lineStore = writable([defaultLine]);