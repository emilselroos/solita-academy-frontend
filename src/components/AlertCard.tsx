import { styled } from '@mui/system';
import Card from '@mui/material/Card';

export interface AlertProps {
	type?: 'success' | 'error';
	message?: string;
}

const AlertCard = ({ type, message }: AlertProps) => {
	return (
		<StyledAlertCard type={type}>
			{type === 'error' && <strong>Error:</strong>} {message}
		</StyledAlertCard>
	);
};

const StyledAlertCard = styled(Card)(({ type }: AlertProps) => ({
	backgroundColor: type === 'error' ? '#F8A7A6' : '#A8F1C6',
	padding: '1rem',
}));

export default AlertCard;
