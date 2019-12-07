import React from "react";
import "./Login.css";


class Login extends React.Component {

    constructor(props) {
        super(props)
    
        this.initialState = {
          username: '',
          password: '',
        }
    
        this.state = this.initialState
      }

      handleChange = event => {
        const { name, value } = event.target
      
        this.setState({
          [name]: value,
        })
      }

    render() {
        const { username, password } = this.state;
        return (
                <form action="/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input 
                            type="text" 
                            name="username"
                            value={username} 
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            name="password"
                            value={password}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div>
                        <input type="submit" value="Log In" />
                    </div>
                </form>
        );
    }
}


export default Login;
