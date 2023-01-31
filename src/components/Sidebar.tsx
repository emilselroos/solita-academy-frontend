import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

const Sidebar = () => {
	return (
		<Drawer variant="permanent" anchor="left">
			<Link to={`/`}>
				<img
					style={{ maxWidth: '225px' }}
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

export default Sidebar;
