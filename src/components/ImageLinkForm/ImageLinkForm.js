import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {

	return(
		<div >
			<p className="f3">
				{'This Magic Brain will detectfaces in your pictures.'}
			</p>
			<div className="center">
				<div className="center w-60 pv3 br3 shadow-5 form">
					<input
						className="f4 pa2 w-60"
						type="url"
						placeholder="url"
						onChange={onInputChange}
					/>
					<button
						className="w-20 grow f4 link ph3 pv2 div white bg-light-purple"
						onClick={onButtonSubmit}>
						 {'entry'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;