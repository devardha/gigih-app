import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Box } from '@chakra-ui/react';

const RenderLottie = ({ data, ...rest }) => {
	const element = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (element.current) {
			lottie.loadAnimation({
				animationData: data,
				container: element.current,
				loop: true,
			});
		}
	}, [element]);

	return <Box ref={element} {...rest} />;
};

export default RenderLottie;
