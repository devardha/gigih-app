import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../redux/store';
import result from './results.json';

const server = setupServer(
	rest.get('https://api.spotify.com/v1/search', (req, res, ctx) =>
		res(ctx.json(result))
	)
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('try to access guest page with token and search', async () => {
	window.history.pushState(
		{},
		'Home Page',
		'#access_token=BQCtgRe2fk_EAYc55JZE8foMnkqMStkDps7fg_wgrvcnR-OFrNU1dsycmSUSQdsX18CnqkOiCweP703_cttZL0AZb5yEbNwJr-FA57f8g-RexiCAP-mCakZOETMBUGzub9sn88SE0lzH7LJXrTF3m3gAqHOuD-yCy__VqLP-YyMA_c5eq4kUnhA3Wtnb05Xs8g8v1YUIVA&token_type=Bearer&expires_in=3600'
	);
	render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	expect(window.location.pathname).toStrictEqual('/create-playlist');

	const searchInput = await screen.getByRole('search');
	const button = screen.getByText('Search');

	userEvent.type(searchInput, 'BoyWithUke');
	userEvent.click(button);

	await waitFor(() => {
		screen
			.getAllByText('Select')
			.forEach((el) => expect(el).toBeInTheDocument());
	});
});

export {};
