import React from 'react';
import { Box, Button, Flex, Text, Heading } from '@chakra-ui/react';
import handleAuth from '../utils/auth';

function Login() {
	return (
		<Box>
			<Flex
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				height="100vh"
			>
				<Box marginBottom={10} maxW="lg">
					<Heading
						as="h1"
						fontSize={52}
						color="white"
						textAlign="center"
						marginBottom={5}
					>
						Create your perfect playlist easily
					</Heading>
					<Text
						textAlign="center"
						color="whiteAlpha.500"
						fontSize={18}
					>
						Please login to access the app
					</Text>
				</Box>
				<Button
					type="button"
					onClick={() => handleAuth()}
					background="green.500"
					color="white"
				>
					Login with Spotify
				</Button>
			</Flex>
		</Box>
	);
}

export default Login;
