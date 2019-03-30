import React from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(data => {
      console.log(data);
    });
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className="App">
        <h2>Signup</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ data: { username, email, password } }}
        >
          {(signupUser, { data, loading, error }) => {
            return (
              <div className="container">
                <form onSubmit={event => this.handleSubmit(event, signupUser)}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange}
                      value={username}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      onChange={this.handleChange}
                      value={email}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                      value={password}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmpassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="passwordConfirmation"
                      onChange={this.handleChange}
                      value={passwordConfirmation}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  {error && <p>{error.message}</p>}
                </form>
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Signup;
