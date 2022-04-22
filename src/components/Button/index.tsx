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
			_hover={{ background: 'green.500' }}
			_active={{ background: 'green.600' }}
		>
			{value}
		</ChakraButton>
	);
}

export default Button;
