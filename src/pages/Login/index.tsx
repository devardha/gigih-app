import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import handleAuth from '../../utils/auth';

function Login() {
	return (
		<Box>
			<Flex justifyContent="center" alignItems="center" height="100vh">
				<Button
					type="button"
					onClick={() => handleAuth()}
					background="green.300"
					color="white"
				>
					Login with Spotify
				</Button>
			</Flex>
		</Box>
	);
}

export default Login;
