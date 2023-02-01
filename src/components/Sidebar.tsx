import { Link } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled, Theme, CSSObject } from '@mui/material/styles';

interface Props {
	open: boolean;
	setOpen: Function;
}

const Sidebar = ({ open, setOpen }: Props) => {
	return (
		<Drawer variant="permanent" anchor="left" open={open}>
			<DrawerHeader open={open}>
				{!open && (
					<IconButton onClick={() => setOpen(true)}>
						<MenuIcon />
					</IconButton>
				)}
				{open && (
					<IconButton onClick={() => setOpen(false)}>
						<ChevronLeftIcon />
					</IconButton>
				)}
			</DrawerHeader>

			<Divider />

			<Link to={`/`}>
				<img
					style={{ maxWidth: '100%' }}
					src="/placeholder-logo.png"
					alt="Epic Placeholder Logo"
				/>
			</Link>
			<List>
				{[
					{ label: 'Dashboard', target: '' },
					{ label: 'Stations', target: 'stations' },
					{ label: 'Journeys', target: 'journeys' },
				].map((entry, index) => (
					<Link
						key={index}
						to={`/${entry.target.toLocaleLowerCase()}`}
					>
						<ListItemButton>
							{entry.label === 'Dashboard' && (
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
							)}
							{entry.label === 'Stations' && (
								<ListItemIcon>
									<PlaceIcon />
								</ListItemIcon>
							)}
							{entry.label === 'Journeys' && (
								<ListItemIcon>
									<ModeOfTravelIcon />
								</ListItemIcon>
							)}
							<ListItemText sx={{ textTransform: 'capitalize' }}>
								<strong>{entry.label}</strong>
							</ListItemText>
						</ListItemButton>
					</Link>
				))}
			</List>
		</Drawer>
	);
};

const openedMixin = (theme: Theme): CSSObject => ({
	width: 240,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')<{ open: boolean }>(({ open }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: open ? 'flex-end' : 'center',
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: 240,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export default Sidebar;
