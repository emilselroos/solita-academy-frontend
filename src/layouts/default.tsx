import { styled } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';

type Props = {
	children?: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
	return (
		<LayoutWrapper>
			<Sidebar />
			<Content>{children}</Content>
		</LayoutWrapper>
	);
}

const LayoutWrapper = styled('div')({});

const Content = styled('main')({
	maxWidth: '980px',
	margin: '1rem 1rem 1rem 250px',
});
