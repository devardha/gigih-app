export const getQuery = (string) => {
	const queries = string.substring(1).split("&");
	const finalObj = {};
	queries.forEach((query) => {
		const arr = query.split("=");
		if (arr.length > 1) finalObj[arr[0]] = arr[1];
	});
	return finalObj;
};
