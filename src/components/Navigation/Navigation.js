import React from 'react';


const Navigation = ({onRouteChange, isSignedIn}) =>{

	if(isSignedIn===true){
		return(
			<nav
			className="f3 link  dim black  underline pa3 flex " 
			style={ { display: 'flex', justifyContent: 'flex-end' }}
			>
			 <p onClick={()=>onRouteChange('signout')}>Sign Out</p>
			</nav>
		);
	}else{
		return(
			<div>
				<nav
				className="f3 link  dim black  underline pa3 flex justify-end tracked" 
				>
				 <p className='ma3 pointer' onClick={()=>onRouteChange('signin')}>Sign In</p>
				 <p className='ma3 pointer' onClick={()=>onRouteChange('register')}>Register</p>
				</nav>
			</div>
		);
	}
}

export default Navigation;