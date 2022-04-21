import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

function Button({ value, ...rest }) {
	return (
		<ChakraButton
			type="button"
			{...rest}
			width="100%"
			color="white"
			marginTop={4}
			rounded="full"
			_hover={{ background: 'black' }}
			_active={{ background: 'black' }}
		>
			{value}
		</ChakraButton>
	);
}

export default Button;
