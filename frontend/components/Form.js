import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
	// name
	fullNameTooShort: 'full name must be at least 3 characters',
	fullNameTooLong: 'full name must be at most 20 characters',
	// size
	sizeIncorrect: 'size must be S or M or L',
};

// 👇 Here you will create your schema.
let formSchema = yup.object().shape({
	// name
	fullName: yup
		.string()
		.trim()
		.min(3, validationErrors.fullNameTooShort)
		.max(20, validationErrors.fullNameTooLong),
	// size
	size: yup
		.string()
		.required(validationErrors.sizeIncorrect)
		.trim()
		.oneOf(['s', 'm', 'l']),
});
// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
	{ topping_id: '1', text: 'Pepperoni' },
	{ topping_id: '2', text: 'Green Peppers' },
	{ topping_id: '3', text: 'Pineapple' },
	{ topping_id: '4', text: 'Mushrooms' },
	{ topping_id: '5', text: 'Ham' },
];

const initialFormValues = {
	fullName: '',
	size: '',
	toppings: [],
};

export default function Form() {
	const [values, setValues] = useState(initialFormValues);
	const [disabled, setDisabled] = useState(true);
	const [errors, setErrors] = useState('');
	const [success, setSuccess] = useState('');
	const [failure, setFailure] = useState('');
	const [allowSubmit, setAllowSubmit] = useState(false);

	useEffect(() => {
		formSchema.isValid(values).then(setAllowSubmit);
	}, [values]);

	const onChange = (evt) => {
		let { type, name, value, checked } = evt.target;
		value = type === 'checkbox' ? checked : value;
		setValues({
			...values,
			[name]: value,
		});
		yup
			.reach(formSchema, name)
			.validate(value)
			.then(() => setErrors((e) => ({ ...e, [name]: '' })))
			.catch((err) => setErrors((e) => ({ ...e, [name]: err.errors[0] })));
	};

	const onSubmit = async (evt) => {
		evt.preventDefault();
		setAllowSubmit(false);

		try {
			const res = await axios.post('http://localhost:9009/api/order', values);
			setSuccess('Thank you for your order!');
			setFailure('');
			setValues(initialFormValues);
		} catch (err) {
			setSuccess('');
			setFailure('Something went wrong');
			console.error('Error submitting order:', err);
		} finally {
			setAllowSubmit(true);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<h2>Order Your Pizza</h2>
			{success && <div className="success">{success}</div>}
			{failure && <div className="failure">{failure}</div>}

			<div className="input-group">
				<div>
					<label htmlFor="fullName">Full Name</label>
					<br />
					<input
						placeholder="Type full name"
						id="fullName"
						type="text"
						name="fullName"
						value={values.fullName}
						onChange={onChange}
					/>
				</div>
				{errors.fullName && <div className="error">{errors.fullName}</div>}
			</div>

			<div className="input-group">
				<div>
					<label htmlFor="size">Size</label>
					<br />
					<select
						id="size"
						onChange={onChange}
						name="size"
						value={values.size}
					>
						<option value="">----Choose Size----</option>
						<option value="s">S</option>
						<option value="m">M</option>
						<option value="l">L</option>
					</select>
				</div>
				{errors.size && <div className="error">{errors.size}</div>}
			</div>

			<div className="input-group">
				{toppings.map((topping) => (
					<label key={topping.topping_id}>
						<input
							name="toppings"
							type="checkbox"
							value={topping.topping_id}
							onChange={(evt) => {
								const currentToppings = Array.isArray(values.toppings)
									? values.toppings
									: [];
								if (evt.target.checked) {
									setValues({
										...values,
										toppings: [...currentToppings, topping.topping_id],
									});
								} else {
									setValues({
										...values,
										toppings: currentToppings.filter(
											(item) => item !== topping.topping_id
										),
									});
								}
							}}
							checked={
								Array.isArray(values.toppings) &&
								values.toppings.includes(topping.topping_id)
							}
						/>
						{topping.text}
						<br />
					</label>
				))}
			</div>
			{/* 👇 Make sure the submit stays disabled until the form validates! */}
			<input
				type="submit"
				disabled={!allowSubmit}
			/>
		</form>
	);
}
