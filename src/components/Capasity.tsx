import Tooltip from '@mui/material/Tooltip';
import PedalBikeIcon from '@mui/icons-material/PedalBike';

type Props = {
	capasity: number;
};

const Capasity = ({ capasity }: Props) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Tooltip title="Capasity">
				<PedalBikeIcon style={{ marginRight: '0.5rem' }} />
			</Tooltip>{' '}
			<strong>{capasity}</strong>
		</div>
	);
};

export default Capasity;
