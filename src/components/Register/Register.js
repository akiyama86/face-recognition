import React from 'react';
import 'tachyons';


class Register extends React.Component{
	constructor(props, context){
		super(props);
		this.state={
			name : '',
			email : '',
			password:'',
			entries:0,
			joined: new Date()
		}
	}
	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onSubmit = (event) => {
		fetch('https://face-recognition-api-999.herokuapp.com/register', {
			method: 'POST',
			headers: {"Content-Type" : "application/json"},
			body : JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id){
				this.props.loadUser(user);
				console.log(user);
				this.props.onRouteChange('home');
			}
		})
		.catch(console.log);
	}

	render(){
		const {onRouteChange} = this.props;
		const onNameChange = this.onNameChange;
		const onEmailChange = this.onEmailChange;
		const onPasswordChange = this.onPasswordChange;
		const onSubmit = this.onSubmit;
		return(
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6"  htmlFor="name">Name</label>
				        <input
			        	onChange={onNameChange} 
				        className="name pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        type="text"
				        name="name"
				        id="name" />
				      </div>
				      <div className="email mt3">
				        <label
				        className="db fw6 lh-copy f6"
				        htmlFor="email-address"
				        >Email</label>
				        <input
				        onChange={onEmailChange}
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        type="email"
				        name="email-address"
				        id="email-address" />
				      </div>
				      <div className="password mv3">
				        <label className="db fw6 lh-copy f6"  htmlFor="password">Password</label>
				        <input
				        onChange={onPasswordChange}
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        type="password"
				        name="password" 
				        id="password" />
				      </div>
				    </fieldset>
				    <div className="Registerbutton">
				      <input
				      onClick={onSubmit} 
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				      type="submit"
				      value="Register" />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('signin')} href="#0" className="f6 link dim black db pointer">Sign In</p>
				    </div>
				  </div>
				</main>
			</article>
		)
	}
}

export default Register;