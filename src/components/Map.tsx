type Props = {
	x: number;
	y: number;
};

const Map = ({ x, y }: Props) => {
	return (
		<iframe
			title="Embedded Map"
			height="240"
			style={{ border: 'none', width: '100%' }}
			src={`https://www.openstreetmap.org/export/embed.html?bbox=${x}%2C${y}&amp;layer=mapnik`}
		></iframe>
	);
};

export default Map;
