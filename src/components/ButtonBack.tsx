import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
	children?: React.ReactNode;
};

const ButtonBack = ({ children }: Props) => {
	const navigate = useNavigate();
	return (
		<Button onClick={() => navigate(-1)} sx={{ marginRight: '1rem' }}>
			<ArrowBackIcon />
		</Button>
	);
};

export default ButtonBack;
