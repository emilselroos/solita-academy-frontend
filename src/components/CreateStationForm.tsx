import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AlertCard from './AlertCard';
import { API_ENDPOINT } from '../CONSTANTS';

interface FormValues {
	station_number?: number | '';
	name?: string | '';
	address?: string | '';
	city?: string | '';
	capasity?: number | '';
	x?: number | '';
	y?: number | '';
}

interface AlertProps {
	type?: 'success' | 'error';
	message?: string;
}

const ScreateStationSchema = yup.object().shape({
	station_number: yup
		.number()
		.typeError('Must be a number')
		.required('* Required'),
	name: yup.string().typeError('Must be a string').required('* Required'),
	address: yup.string().typeError('Must be a string').required('* Required'),
	city: yup.string().typeError('Must be a string').required('* Required'),
	capasity: yup.number().typeError('Must be a number').required('* Required'),
	x: yup.number().typeError('Must be a number').required('* Required'),
	y: yup.number().typeError('Must be a number').required('* Required'),
});

const CreateStationForm = () => {
	const [alert, setAlert] = useState<AlertProps | undefined>(undefined);
	const initialValues: FormValues = {
		station_number: '',
		name: '',
		address: '',
		city: '',
		capasity: '',
		x: '',
		y: '',
	};

	const formik = useFormik({
		validationSchema: ScreateStationSchema,
		initialValues: initialValues,
		onSubmit: async (values, actions) => {
			// console.log({ values, actions });
			const response = await fetch(`${API_ENDPOINT}/stations`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});
			const responseData = await response.json();
			if (responseData.error) {
				// console.log(responseData.error);
				setAlert({ type: 'error', ...responseData.error });
			}
			if (responseData.data) {
				// console.log(responseData.data);
				setAlert({ type: 'success', message: 'New station created!' });
				actions.resetForm();
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container spacing={2}>
				{alert && (
					<Grid item xs={12}>
						<AlertCard type={alert.type} message={alert.message} />
					</Grid>
				)}

				<Grid item xs={5} sm={3} md={2}>
					<TextField
						id="input-station-number"
						helperText={
							formik.touched.station_number
								? formik.errors.station_number
								: 'Station Number'
						}
						name="station_number"
						placeholder="94"
						type="text"
						fullWidth
						value={formik.values.station_number}
						onChange={formik.handleChange}
						error={
							formik.touched.station_number &&
							Boolean(formik.errors.station_number)
						}
					/>
				</Grid>
				<Grid item xs={7} sm={9} md={10}>
					<TextField
						id="input-name"
						helperText={
							formik.touched.name ? formik.errors.name : 'Name'
						}
						name="name"
						placeholder="Laajalahden aukio"
						type="text"
						fullWidth
						value={formik.values.name}
						onChange={formik.handleChange}
						error={
							formik.touched.name && Boolean(formik.errors.name)
						}
					/>
				</Grid>

				<Grid item xs={5} sm={3} md={2}>
					<TextField
						id="input-city"
						helperText={
							formik.touched.city ? formik.errors.city : 'City'
						}
						name="city"
						placeholder="Espoo"
						type="text"
						fullWidth
						value={formik.values.city}
						onChange={formik.handleChange}
						error={
							formik.touched.city && Boolean(formik.errors.city)
						}
					/>
				</Grid>
				<Grid item xs={7} sm={9} md={10}>
					<TextField
						id="input-address"
						helperText={
							formik.touched.address
								? formik.errors.address
								: 'Address'
						}
						name="address"
						placeholder="Munkkiniemen puistotie 21"
						type="text"
						fullWidth
						value={formik.values.address}
						onChange={formik.handleChange}
						error={
							formik.touched.address &&
							Boolean(formik.errors.address)
						}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						id="input-capasity"
						helperText={
							formik.touched.capasity
								? formik.errors.capasity
								: 'Capasity'
						}
						name="capasity"
						placeholder="21"
						type="text"
						style={{ maxWidth: '100px' }}
						value={formik.values.capasity}
						onChange={formik.handleChange}
						error={
							formik.touched.capasity &&
							Boolean(formik.errors.capasity)
						}
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6}>
					<TextField
						id="input-x"
						helperText={formik.touched.x ? formik.errors.x : 'x'}
						type="text"
						name="x"
						placeholder="24.8763012644261"
						style={{
							marginRight: '1rem',
							maxWidth: 'calc(50% - 0.5rem)',
						}}
						value={formik.values.x}
						onChange={formik.handleChange}
						error={formik.touched.x && Boolean(formik.errors.x)}
					/>
					<TextField
						id="input-y"
						helperText={formik.touched.y ? formik.errors.y : 'y'}
						type="text"
						name="y"
						placeholder="60.1978706012264"
						style={{ maxWidth: 'calc(50% - 0.5rem)' }}
						value={formik.values.y}
						onChange={formik.handleChange}
						error={formik.touched.y && Boolean(formik.errors.y)}
					/>
				</Grid>

				<Grid item xs={12}>
					<Button type="submit">Create</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default CreateStationForm;
