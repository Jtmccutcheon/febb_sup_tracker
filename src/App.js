import React, { useState, useEffect } from 'react'; // https://css-tricks.com/working-with-refs-in-react/
import data from './data';
import './index.css';

export default function App() {
	if (!localStorage.getItem('memory')) {
		localStorage.setItem('memory', JSON.stringify(data));
	}

	let arr = localStorage.getItem('memory');
	let parsedArr = JSON.parse(arr);

	const [charArr, setCharArr] = useState(parsedArr);

	const [text, setText] = useState(''); // this is a nightmare


	



	console.log(searched);
	const click = (fe, friend) => {
		for (let i = 0; i < charArr.length; i++) {
			let element = charArr[i];
			if (element.name === friend.name) {
				// console.log(element);
				element.supports.map((rel) => {
					if (rel.name === fe.name) {
						if (rel.friendship > 4) rel.friendship = 1;
						rel.friendship++;
					}
				});
			}
		}
		if (friend.friendship > 4) friend.friendship = 1;
		friend.friendship++;
		setCharArr([...charArr], friend);
		localStorage.setItem('memory', JSON.stringify(charArr));
	};

	const reset = () => {
		localStorage.clear();
		setCharArr(parsedArr)
		// let temp = [...charArr];
		// setCharArr(temp);
	};

	return (
		<div className='App'>
			<div
				style={{
					textAlign: 'center',
					display: 'flex',
				}}
			>
				<div className='key'>
					<p>C level support = </p>
					<span className='dot'></span>
					<p>B level support = </p>
					<span className='dot'></span>
					<p>A level support = </p>
					<span className='dot'></span>
				</div>
				<div
					style={{
						width: '100%',
					}}
				>
					<div>
						<h2>Fire Emblem</h2>
						<h4>Support Tracker for The Binding Blade</h4>
// 						<form onSubmit={reset}>
							<button
								onClick={reset}
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
// 						</form>
					</div>
					<input
						value={text.text}
						onChange={userInput}
						name='text'
					></input>
					<div className='top-border-container'>
						<div className='border'></div>
					</div>
				</div>
			</div>
			<div
				className='scrollingContainer'
				style={{
					maxHeight: '78vh',
					overflow: 'scroll',
					overflowX: 'hidden',
				}}
			>
				{charArr.map((fe, id) => {
					return (
						<div
							key={id}
							style={{
								borderBottom: '1px solid #72767d',
								margin: '0 4rem 1rem 4rem',
							}}
						>
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
									style={{
										margin: '0',
									}}
								/>
								<br />
							</div>
							<div
								style={{
									display: 'flex',
									margin: '0',
								}}
							>
								{fe.supports.map((friends, id) => {
									return (
										<div
											key={id}
											style={{
												textAlign: 'center',
												alignItems: 'center',
												margin: '0 .5rem',

												// borderBottom: '1px solid blue',
											}}
										>
											<img
												src={friends.image_url}
												alt='lame friend'
												id={id}
												onClick={() =>
													click(fe, friends)
												}
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
											<h6 style={{ marginTop: '0' }}>
												{friends.name.toUpperCase()}
											</h6>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
