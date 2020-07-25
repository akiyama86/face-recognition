import React from 'react';
import Tilt from "react-tilt"

const logoUrl = 'https://img.icons8.com/pastel-glyph/64/000000/brain.png'

const Logo = () =>{
	return(
        <div className='ma4 mt0'>
        	<div>
				<Tilt className="Tilt br1 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
		          <div className="Tilt-inner pa3"> 
					<img src={logoUrl} alt="logo" />
		          </div>
		        </Tilt>
		    </div>
		</div>
	);
};

export default Logo;
