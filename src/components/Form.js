import React from "react";

const Form = props => (
	<form onSubmit={props.fetchWeather}>
		<input type="text" name="city" placeholder="City..."/>
		<input type="text" name="country" placeholder="Country..."/>
		<button type="submit">Get Weather</button>
	</form>
);

export default Form;