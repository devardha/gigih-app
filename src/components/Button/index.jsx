import React from "react";

const Button = ({ value, ...rest }) => {
	return <button {...rest}>{value}</button>;
};

export default Button;
