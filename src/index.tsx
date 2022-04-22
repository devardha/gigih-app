import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';

const theme = extendTheme({
	components: {
		Button: {
			baseStyle: {
				_focus: { boxShadow: 'none', border: 'none', outline: 'none' },
			},
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
