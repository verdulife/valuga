import type { lineType, pluginType, themeType } from '@lib/types';
import { writable } from 'svelte/store';
import { defaultTheme } from "@lib/themes/default";
import { searchPlugin } from "@lib/plugins/webSearch";

const defaultLine: lineType = {
	line: 0,
	value: '',
	isValid: true,
};

export const lineStore = writable([defaultLine]);
export const optionStore = writable(false);

export const pluginStore = writable(JSON.parse(localStorage.getItem("pluginStore")) || [searchPlugin]);
export const themeStore = writable(JSON.parse(localStorage.getItem("themeStore")) || [defaultTheme]);

pluginStore.subscribe((val) => localStorage.pluginStore = JSON.stringify(val));
themeStore.subscribe((val) => localStorage.themeStore = JSON.stringify(val));