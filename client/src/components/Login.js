import React from "react";
import "./Login.css";


class Login extends React.Component {
    render() {
        return (
            <div>
                <form action="/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" />
                    </div>
                    <div>
                        <input type="submit" value="Log In" />
                    </div>
                </form>
            </div>
        );
    }
}


export default Login;