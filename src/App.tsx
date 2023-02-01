import { Routes, Route } from 'react-router-dom';
// Layouts
import DefaultLayout from './layouts/default';
// Pages
import Home from './pages/Home';
import Stations from './pages/Stations';
import Station from './pages/Station';
import CreateStation from './pages/CreateStation';
import Journeys from './pages/Journeys';
import Journey from './pages/Journey';
import CreateJourney from './pages/CreateJourney';

const App = () => {
	return (
		<DefaultLayout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/stations" element={<Stations />} />
				<Route path="/stations/create" element={<CreateStation />} />
				<Route path="/stations/:station_number" element={<Station />} />
				<Route path="/journeys" element={<Journeys />} />
				<Route path="/journeys/create" element={<CreateJourney />} />
				<Route path="/journeys/:jid" element={<Journey />} />
			</Routes>
		</DefaultLayout>
	);
};

export default App;
