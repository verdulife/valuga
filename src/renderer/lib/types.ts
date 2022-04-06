export type lineType = {
	line: number,
	value: string,
	isValid: boolean,
};

export type themeType = {
	active: boolean,
	name: string,
	description: string,
	styles: {
		main: string,
		wrapper: string
	}
};

export type pluginType = {
	active: boolean,
	name: string,
	description: string,
	function: Function,
};
