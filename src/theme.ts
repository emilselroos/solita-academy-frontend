import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#282c34',
			// light: '',
			// dark: '',
		},
		secondary: {
			main: '#282c34',
			// light: '',
			// dark: '',
		},
		background: {
			default: '#282c34',
		},
		text: {
			primary: '#FFFFFF',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
	components: {},
});

export default theme;
