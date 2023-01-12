import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/default';
import Home from './pages/Home';
import Stations from './pages/Stations';
import Station from './pages/Station';
import Journeys from './pages/Journeys';
import Journey from './pages/Journey';

const App = () => {
	return (
		<DefaultLayout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/stations" element={<Stations />} />
				<Route path="/station/:sid" element={<Station />} />
				<Route path="/journeys" element={<Journeys />} />
				<Route path="/journey/:jid" element={<Journey />} />
			</Routes>
		</DefaultLayout>
	);
};

export default App;
