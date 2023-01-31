import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#282c34',
			// light: '',
			// dark: '',
		},
		secondary: {
			main: '#145DA0',
			// light: '',
			// dark: '',
		},
		background: {
			default: '#F8F8F8',
		},
		text: {
			primary: '#202020',
		},
	},

	typography: {
		h1: {
			fontSize: '2em',
			color: '#202020',
			margin: '1rem 0',
			fontWeight: 'bold',
			lineHeight: '1.5',
		},
		h2: {
			fontSize: '1.4em',
			color: '#202020',
			margin: '0 0 0.5rem 0',
			fontWeight: 'bold',
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

	components: {
		MuiCssBaseline: {
			styleOverrides: {
				a: {
					textDecoration: 'none',
					color: '#202020',
				},
			},
		},

		MuiButton: {
			defaultProps: {
				disableRipple: true,
				variant: 'outlined',
			},
			styleOverrides: {
				root: {
					backgroundColor: '#FFFFFF',
					color: '#202020',
					fontWeight: '700',
					letterSpacing: '0.06rem',
					borderColor: '#000000',
					borderWidth: '2px',
					borderRadius: '30px',
					toUpperCase: true,
					'&:hover,&:focus': {
						borderWidth: '2px',
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: '#202020',
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				root: {
					fontWeight: '700',
				},
			},
		},
		MuiListItemButton: {
			defaultProps: {
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					color: '#202020',
				},
			},
		},
	},
});

export default theme;
