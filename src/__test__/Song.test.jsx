import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import SongItem from '../components/Song';

const song = {
	album: {
		album_type: 'single',
		artists: [
			{
				external_urls: {
					spotify:
						'https://open.spotify.com/artist/1Cd373x8qzC7SNUg5IToqp',
				},
				href: 'https://api.spotify.com/v1/artists/1Cd373x8qzC7SNUg5IToqp',
				id: '1Cd373x8qzC7SNUg5IToqp',
				name: 'BoyWithUke',
				type: 'artist',
				uri: 'spotify:artist:1Cd373x8qzC7SNUg5IToqp',
			},
		],
		external_urls: {
			spotify: 'https://open.spotify.com/album/4cmu24lnj0NI8lHG6vra6h',
		},
		href: 'https://api.spotify.com/v1/albums/4cmu24lnj0NI8lHG6vra6h',
		id: '4cmu24lnj0NI8lHG6vra6h',
		images: [
			{
				height: 640,
				url: 'https://i.scdn.co/image/ab67616d0000b27382a18aa0d3374049c6b78f6a',
				width: 640,
			},
			{
				height: 300,
				url: 'https://i.scdn.co/image/ab67616d00001e0282a18aa0d3374049c6b78f6a',
				width: 300,
			},
			{
				height: 64,
				url: 'https://i.scdn.co/image/ab67616d0000485182a18aa0d3374049c6b78f6a',
				width: 64,
			},
		],
		name: 'Toxic',
		release_date: '2021-10-29',
		release_date_precision: 'day',
		total_tracks: 1,
		type: 'album',
		uri: 'spotify:album:4cmu24lnj0NI8lHG6vra6h',
	},
	artists: [
		{
			external_urls: {
				spotify:
					'https://open.spotify.com/artist/1Cd373x8qzC7SNUg5IToqp',
			},
			href: 'https://api.spotify.com/v1/artists/1Cd373x8qzC7SNUg5IToqp',
			id: '1Cd373x8qzC7SNUg5IToqp',
			name: 'BoyWithUke',
			type: 'artist',
			uri: 'spotify:artist:1Cd373x8qzC7SNUg5IToqp',
		},
	],
	disc_number: 1,
	duration_ms: 168020,
	explicit: false,
	external_ids: {
		isrc: 'TCAFS2101442',
	},
	external_urls: {
		spotify: 'https://open.spotify.com/track/2gQPv5jvVPqU2a9HhMNO1v',
	},
	href: 'https://api.spotify.com/v1/tracks/2gQPv5jvVPqU2a9HhMNO1v',
	id: '2gQPv5jvVPqU2a9HhMNO1v',
	is_local: false,
	name: 'Toxic',
	popularity: 88,
	preview_url: null,
	track_number: 1,
	type: 'track',
	uri: 'spotify:track:2gQPv5jvVPqU2a9HhMNO1v',
};

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
