import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { API_ENDPOINT } from '../CONSTANTS';

interface IJourney {
	JID: number;
	departure_station_id: number;
	return_station_id: number;
	distance: number;
	duration: number;
}

const columns: GridColDef[] = [
	{
		field: 'JID',
		headerName: '#',
		width: 100,
		renderCell: (params: GridRenderCellParams) => {
			const { row } = params;
			return (
				<Link
					to={`/journeys/${row.JID}`}
					style={{ fontWeight: 'bold' }}
				>
					#{row.JID}
				</Link>
			);
		},
	},
	{
		field: 'departure_station_id',
		headerName: 'From (station)',
		width: 250,
		renderCell: (params: GridRenderCellParams) => {
			const { row } = params;
			return (
				<Link
					to={`/stations/${row.departure_station?.station_number}`}
					style={{ fontWeight: 'bold' }}
				>
					{row.departure_station?.name}
				</Link>
			);
		},
	},
	{
		field: 'return_station_id',
		headerName: 'To (station)',
		width: 250,
		renderCell: (params: GridRenderCellParams) => {
			const { row } = params;
			return (
				<Link
					to={`/stations/${row.return_station?.station_number}`}
					style={{ fontWeight: 'bold' }}
				>
					{row.return_station?.name}
				</Link>
			);
		},
	},
	{
		field: 'distance',
		headerName: 'Distance (km)',
		width: 150,
		renderCell: (params: GridRenderCellParams) => {
			const { row } = params;
			return <span>{(row.distance / 1000).toFixed(2)}</span>;
		},
	},
	{
		field: 'duration',
		headerName: 'Duration (min)',
		width: 150,
		renderCell: (params: GridRenderCellParams) => {
			const { row } = params;
			return <span>{(row.duration / 60).toFixed(2)}</span>;
		},
	},
];

const Journeys = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [journeys, setJourneys] = useState<IJourney[] | []>([]);
	const [pageSize, setPageSize] = useState<number>(20);

	useEffect(() => {
		fetch(`${API_ENDPOINT}/journeys`)
			.then((response) => response.json())
			.then((jsonData) => {
				const journeys = jsonData.data;
				setJourneys(journeys);
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
					<Typography variant="h1">Journeys</Typography>
				</Grid>
				<Grid item>
					<Link to="/journeys/create">
						<Button>
							<AddIcon /> New Journey
						</Button>
					</Link>
				</Grid>
			</Grid>

			<Box
				sx={{ height: 800, width: '100%', backgroundColor: '#FFFFFF' }}
			>
				<DataGrid
					getRowId={(row) => row.JID}
					loading={loading}
					rows={journeys}
					columns={columns}
					pageSize={pageSize}
					onPageSizeChange={(pageSize: number) =>
						setPageSize(pageSize)
					}
					rowsPerPageOptions={[20, 50, 100]}
				/>
			</Box>
		</>
	);
};

export default Journeys;
