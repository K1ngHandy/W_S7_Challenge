import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Sprint 7 Challenge Learner Tests', () => {
	/*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.

    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */
	describe('Math function test', () => {
		test('throw error for invalid numbers', () => {
			const message = 'pass valid numbers';
			expect(() => sum()).toThrowError(message);
			expect(() => sum(2, 'seven')).toThrowError(message);
		});
		test('correctly add 2 integers', () => {
			let result = sum(1, 3);
			expect(result).toBe(4);
		});
		test('correctly add number string and integer', () => {
			let result = sum('1', 2);
			expect(result).toBe(3);
		});
		test('correctly add 2 string numbers', () => {
			let result = sum('10', '3');
			expect(result).toBe(13);
		});
	});
	/*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
  */
	// test('you can comment out this test', () => {
	//   expect(true).toBe(false)
	// })
	describe('Hello World component test', () => {
		beforeEach(() => render(<HelloWorld />));
		test('home link renders', () => {
			const link = screen.queryByText('Home');
			expect(link).toBeInTheDocument();
		});
		test('about link renders', () => {
			const link = screen.queryByText('About');
			expect(link).toBeInTheDocument();
		});
		test('blog link renders', () => {
			const link = screen.queryByText('Blog');
			expect(link).toBeInTheDocument();
		});
		test('text renders as The Truth', () => {
			const text = screen.queryByText('The Truth');
			expect(text).toBeInTheDocument();
		});
		test('text renders as Javascript is pretty awesome', () => {
			const text = screen.queryByText('JavaScript is pretty awesome');
			expect(text).toBeInTheDocument();
		});
		test('text renders closely to javascript is pretty', () => {
			const text = screen.queryByText('javaScript is pretty', { exact: false });
			expect(text).toBeInTheDocument();
		});
	});
});

function sum(a, b) {
	a = Number(a);
	b = Number(b);
	if (isNaN(a) || isNaN(b)) {
		throw new Error('pass valid numbers');
	}
	return a + b;
}

function HelloWorld() {
	return (
		<div>
			<h1>Hello World Component</h1>
			<nav>
				<a href="#">Home</a>
				<a href="#">About</a>
				<a href="#">Blog</a>
			</nav>
			<main>
				<section>
					<h2>The Truth</h2>
					<p>JavaScript is pretty awesome</p>
				</section>
			</main>
		</div>
	);
}
