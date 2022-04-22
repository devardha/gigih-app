import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import SongItem from '../components/Song';
import song from './results/track.json';

test('Render track component', () => {
	render(
		<Provider store={store}>
			<SongItem data={song} />
		</Provider>
	);

	waitFor(() => expect(screen.getByText(song.name)).toBeInTheDocument());
	waitFor(() =>
		expect(screen.getByText(song.album.name)).toBeInTheDocument()
	);
	waitFor(() => expect(screen.getByText(song.name)).toBeInTheDocument());
	expect(screen.getByText('Select')).toBeInTheDocument();
});
