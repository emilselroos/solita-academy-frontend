import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';

type Props = {
	children?: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
	const [open, setOpen] = useState<boolean>(true);
	return (
		<LayoutWrapper>
			<Sidebar open={open} setOpen={setOpen} />
			<Content open={open}>{children}</Content>
		</LayoutWrapper>
	);
}

const LayoutWrapper = styled('div')({});

const Content = styled('main', {
	shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
	maxWidth: '980px',
	marginLeft: open ? 'calc(240px + 1rem)' : 'calc(64px + 1rem)',
	marginRight: '1rem',
	marginTop: '1rem',
	marginBottom: '1rem',
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
}));
