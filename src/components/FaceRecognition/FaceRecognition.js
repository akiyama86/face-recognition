import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({src, boxes}) => {
	let imageOnBox = '';
	let peopleNumber = 0;
	if (boxes){
		console.log(boxes);
		imageOnBox = boxes.map((box, i) => {
			return (<div className='bounding-box' key ={i+1} style={box}>{i+1}</div>)
		});
		peopleNumber = boxes.length;
	}else{
		imageOnBox = '';
	}
	return(
		<div className='fl1'>
			<p> {`People is ${peopleNumber}`} </p>
			<div className='center w-80  ma2 br2 shadow-5'>
				<div className="image">
					<img alt='pics' className="" src={src}/>
					{imageOnBox}
				</div>
			</div>
		</div>
	);
};

export default FaceRecognition;