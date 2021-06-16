import React, { useState } from 'react';
import styled from 'styled-components';
import data from './data';
import './index.css';

export default function App() {
	if (!localStorage.getItem('save 1')) {
		localStorage.setItem('save 1', JSON.stringify(data));
	}
	if (!localStorage.getItem('save 2')) {
		localStorage.setItem('save 2', JSON.stringify(data));
	}
	if (!localStorage.getItem('save 3')) {
		localStorage.setItem('save 3', JSON.stringify(data));
	}

	// let arr = localStorage.getItem('save 1');
	// let parsedArr = JSON.parse(arr);

	// const [charArr, setCharArr] = useState(parsedArr);
	const [searchArr, setSearchArr] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentSaveSlot, setCurrentSaveSlot] = useState('save 1');

	const [charArr, setCharArr] = useState(
		JSON.parse(localStorage.getItem(currentSaveSlot)),
	);
	const safeSearch = (text, arr) => {
		if (text.length === 0 || text.length === 1) return [];
		return arr.filter((i) => i.name.includes(text));
	};
	const search = (e) => {
		setSearchTerm(e.target.value);
		setSearchArr(safeSearch(searchTerm, charArr));
	};

	const clear = () => {
		setSearchArr([]);
		setSearchTerm('');
	};

	const getSave = (state) => {
		return localStorage.getItem(state);
	};

	const changeSave = (e) => {
		setCharArr([]);
		setCurrentSaveSlot(e.target.value);
		let saveState = getSave(e.target.value);
		// console.log(saveState);
		// let saveState = localStorage.getItem(currentSaveSlot);
		// let parsed = JSON.parse(saveState);
		// console.log(parsed);
		// setCharArr(parsed);
		setCharArr(JSON.parse(saveState));
	};

	console.log(currentSaveSlot);
	console.log(JSON.stringify(charArr));

	const click = (fe, friend) => {
		for (let i = 0; i < charArr.length; i++) {
			let element = charArr[i];
			if (element.name === friend.name) {
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
		localStorage.setItem(currentSaveSlot, JSON.stringify(charArr));
	};

	const reset = () => {
		localStorage.removeItem(currentSaveSlot);
		let temp = [...charArr];
		setCharArr(temp);
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
								onClick={reset}
							>
								Reset
							</button>
						</form>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							margin: '1rem',
							width: '100%',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
						>
							<h4>Search</h4>
							<input
								onChange={(e) => search(e)}
								value={searchTerm}
								style={{ marginLeft: '0.25rem' }}
							></input>
							<div
								onClick={clear}
								style={{
									height: '20px',
									width: '20px',
									backgroundColor: '#e92d2a',
									borderRadius: '50%',
									display: 'inline-block',
									marginLeft: '0.25rem',
									padding: '0',
									lineHeight: '17px',
									cursor: 'pointer',
								}}
							>
								x
							</div>
						</div>
						<select
							style={{
								marginRight: '2rem',
							}}
							onChange={(e) => changeSave(e)}
						>
							<option value='save 1'>save 1</option>
							<option value='save 2'>save 2</option>
							<option value='save 3'>save 3</option>
						</select>
					</div>
					{currentSaveSlot}
					<div
						className='searchbox'
						style={{
							position: 'absolute',
							backgroundColor: '#40444B',
							borderRadius: '8px',
							marginLeft: 'auto',
							marginRight: 'auto',
							left: 0,
							right: 0,
							top: '215px',
							textAlign: 'center',
							width: '33%',
							overflow: 'auto',
							height: searchArr.length ? '400px' : 0,
						}}
					>
						{searchArr.length ? (
							<h4 style={{ marginLeft: '.25rem' }}>
								search results...
							</h4>
						) : null}
						{searchArr &&
							searchArr.map((fe, id) => {
								return (
									<div
										key={id}
										style={{
											borderBottom: '1px solid #72767d',
											margin: '0 4rem 0 4rem',
											backgroundColor: '#40444B',
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
												flexWrap: 'wrap',
											}}
										>
											{fe.supports.map((friends, id) => {
												return (
													<BackgoundColor
														friends={friends}
														key={id}
														style={{
															textAlign: 'center',
															alignItems:
																'center',
															margin: '0 .5rem',
														}}
													>
														<img
															src={
																friends.image_url
															}
															alt='lame friend'
															id={id}
															onClick={() =>
																click(
																	fe,
																	friends,
																)
															}
															style={{
																height: '40px',
																width: '40px',
																cursor: 'pointer',
																padding:
																	'.5rem',
																borderRadius:
																	'50%',
															}}
														/>
														<h6
															style={{
																marginTop: '0',
															}}
														>
															{friends.name.toUpperCase()}
														</h6>
													</BackgoundColor>
												);
											})}
										</div>
									</div>
								);
							})}
					</div>
					<div className='top-border-container'>
						<div className='border'></div>
					</div>
				</div>
			</div>
			<div
				className='scrollingContainer'
				style={{
					maxHeight: '70vh',
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
										<BackgoundColor
											friends={friends}
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
												onClick={() =>
													click(fe, friends)
												}
												style={{
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
										</BackgoundColor>
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

const BackgoundColor = styled.div`
	img {
		background-color: ${({ friends }) =>
			friends.friendship === 1
				? 'none'
				: friends.friendship === 2
				? '#E92D2A'
				: friends.friendship === 3
				? '#F7D633'
				: friends.friendship === 4
				? '#8ED53B'
				: null};
	}
`;
