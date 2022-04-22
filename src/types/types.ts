export interface HashResult {
	access_token?: string;
}

interface User {
	country: string
	display_name: string
	external_urls: { spotify: string }
	followers: { href: number, total: number }
	href: string
	id:string
	product: string
	type: string
	uri: string
	images: any[]
}

export interface UserState {
	user: {
		user: User,
		accessToken: string
	};
	accessToken: string;
}

export interface SongState {
	song: {
		selectedSongs: Song[]
	}
}

export interface SearchState {
	search: {
		results: Song[]
	}
}

interface Artist {
	external_urls: { spotify: string };
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

interface Image {
	height: number;
	url: string;
	width: number;
}

interface Album {
	album_type: string;
	artists: Artist[];
	external_urls: { spotify: string };
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface Song {
	album: Album;
	artists: Artist[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: { isrc: string };
	external_urls: { spotify: string };
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: null;
	track_number: number;
	type: string;
	uri: string;
}
