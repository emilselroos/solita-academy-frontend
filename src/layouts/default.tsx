import { styled } from '@mui/material/styles';

type Props = {
	children?: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
	return (
		<LayoutWrapper>
			<Content>{children}</Content>
		</LayoutWrapper>
	);
}

const LayoutWrapper = styled('div')({});

const Content = styled('main')({
	marginLeft: '1rem',
	marginRight: '1rem',
	marginTop: '1rem',
	marginBottom: '1rem',
});
