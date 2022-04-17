export interface State {
	search: {
		q: string;
	};
}

export interface Image {
	fixed_width: {
		url: string;
	};
}

export interface Gif {
	embed_url: string;
	id: string;
	images: Image;
	import_datetime: string;
	is_sticker: number;
	rating: string;
	slug: string;
	source: string;
	source_post_url: string;
	source_tld: string;
	title: string;
	trending_datetime: string;
	type: string;
	url: string;
	username: string;
}

export interface Data {
	gifs: Gif[];
}