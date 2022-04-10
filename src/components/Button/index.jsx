import React from 'react';

function Button({ value, ...rest }) {
	return (
		<button type="button" {...rest}>
			{value}
		</button>
	);
}

export default Button;
