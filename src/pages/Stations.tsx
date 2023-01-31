import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { API_ENDPOINT } from '../CONSTANTS';

interface IStation {
	name: string;
	city: string;
	address: string;
	capasity: number;
	x: number;
	y: number;
}

const columns: GridColDef[] = [
	{
		field: 'station_number',
		headerName: '#',
		width: 70,
	},
	{
		field: 'name',
		headerName: 'Name',
		width: 300,
		renderCell: (params: GridRenderCellParams) => {
			const { row } = params;
			return (
				<Link
					to={`/stations/${row.station_number}`}
					style={{ fontWeight: 'bold' }}
				>
					{row.name}
				</Link>
			);
		},
	},
	{
		field: 'city',
		headerName: 'City',
		width: 120,
	},
	{
		field: 'address',
		headerName: 'Address',
		width: 300,
	},
	{
		field: 'capasity',
		headerName: 'Capasity',
		width: 100,
		filterable: false,
		align: 'center',
	},
];

const Stations = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [stations, setStations] = useState<IStation[] | []>([]);
	const [pageSize, setPageSize] = useState<number>(20);

	useEffect(() => {
		fetch(`${API_ENDPOINT}/stations`)
			.then((response) => response.json())
			.then((jsonData) => {
				const stations = jsonData.data;
				setStations(stations);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	return (
		<>
			<Grid container alignItems="center" justifyContent="space-between">
				<Grid item>
					<Typography variant="h1">Stations</Typography>
				</Grid>
				<Grid item>
					<Link to="/stations/create">
						<Button>
							<AddIcon /> New Station
						</Button>
					</Link>
				</Grid>
			</Grid>

			<Box
				sx={{ height: 800, width: '100%', backgroundColor: '#FFFFFF' }}
			>
				<DataGrid
					getRowId={(row) => row.station_number}
					loading={loading}
					rows={stations}
					columns={columns}
					pageSize={pageSize}
					onPageSizeChange={(pageSize: number) =>
						setPageSize(pageSize)
					}
					rowsPerPageOptions={[20, 50, 100]}
					initialState={{
						sorting: {
							sortModel: [{ field: 'name', sort: 'asc' }],
						},
					}}
				/>
			</Box>
		</>
	);
};

export default Stations;
