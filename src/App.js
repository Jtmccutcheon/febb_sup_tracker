import React, { useState } from 'react';
import data from './data';
import './index.css';

export default function App() {
	if (!localStorage.getItem('memory')) {
		localStorage.setItem('memory', JSON.stringify(data));
	}

	let arr = localStorage.getItem('memory');
	console.log(arr);
	let parsedArr = JSON.parse(arr);
	console.log(parsedArr);

	const [charArr, setCharArr] = useState(parsedArr);

	const click = (friend) => {
		console.log(friend);
		friend.friendship++;
		if (friend.friendship > 4) friend.friendship = 1;
		setCharArr([...charArr], friend);
		console.log(charArr);
		localStorage.setItem('memory', JSON.stringify(charArr));
	};

	const reset = () => {
		localStorage.clear();
		setCharArr(charArr);
	};

	return (
		<div className='App'>
			<div style={{ textAlign: 'center' }}>
				<h2>Fire Emblem</h2>
				<h4>Support Tracker for The Binding Blade</h4>
				<form onSubmit={reset}>
					<button
						style={{
							padding: '.5rem 1rem',
							borderRadius: '15px',
							borderStyle: 'none',
							backgroundColor: '#7289DA',
							color: '#F1F3FA',
							width: '8rem',
							cursor: 'pointer',
							outline: 'none',
						}}
					>
						Reset
					</button>
				</form>
			</div>
			{charArr.map((fe) => {
				return (
					<div key={Math.random()}>
						<div
							style={{
								padding: '.5rem',
								margin: '.5rem',
								display: 'flex',
								flexDirection: 'column-reverse',
								width: '5rem',
								alignItems: 'center',
							}}
						>
							<h4
								style={{
									margin: '0',
								}}
							>
								<br />
								{fe.name.toUpperCase()}
							</h4>
							<img
								src={fe.image_url}
								alt='char img'
								style={{ margin: '0' }}
							/>
							<br />
						</div>
						<div style={{ display: 'flex', margin: '0' }}>
							{fe.supports.map((friends, id) => {
								return (
									<div
										key={id}
										style={{
											textAlign: 'center',
											alignItems: 'center',
											margin: '0 .5rem',
										}}
									>
										<img
											src={friends.image_url}
											alt='lame friend'
											id={id}
											onClick={() => click(friends)}
											style={{
												backgroundColor:
													friends.friendship === 1
														? 'none'
														: friends.friendship ===
														  2
														? '#E92D2A'
														: friends.friendship ===
														  3
														? '#F7D633'
														: friends.friendship ===
														  4
														? '#8ED53B'
														: null,
												height: '40px',
												width: '40px',
												cursor: 'pointer',
												padding: '.5rem',
												borderRadius: '50%',
											}}
										/>
										<h6>{friends.name.toUpperCase()}</h6>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
