import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

	:root {
		--background: #F0F2F5;
		--green: #33CC95;
		--red: #E52E4D;

		--text-title: #363F5F;
		--text-body: #969CB3;

		--shape: #FFFFFF;
	}


	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html {
		@media (max-width: 1080px) {
			font-size: 93.75%; 
		}

		@media (max-width: 720px) {
			font-size: 87.5%; 
		}
	}

	body {		
		background-color: var(--background);

		-webket-font-smoothing: antialiased;
	}

	body, input, text-area, button, p {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
	}

	body, input, text-area, button {
		font-weight: 400;
	}

	h1, h2, h3, h4, h5, h6, strong {
		font-weight: 600;
	}
	

	button {
		cursor: pointer;
	}

	[disabled] {
		opacity: 0.6;
		cursor: not-allowed;
	}


	.react-modal-overlay {
		background-color: rgba(0,0,0, .5);
		
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.react-modal-content {
		max-width: 576px;
		width: 100%;

		background-color: var(--background);
		padding: 3rem;

		position: relative;
		border-radius: .5rem;
	}

	.react-modal-close {
		position: absolute;
		right: 1.5rem;
		top: 1.5rem;
		border: 0;
		background-color: transparent;
		border-radius: 50%;

		transition: filter .3s;
		
		&:hover {
			filter: brightness(.8);
		}	

	}
`;
