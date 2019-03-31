import React from "react";
import { Mutation } from "react-apollo";
import { SIGNIN } from "../../queries";
import Error from "../Error";

const initialState = {
  username: "",
  password: "",
};

class Signin extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(data => {
      console.log(data);
      this.clearState();
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="App">
        <h2>Signin</h2>
        <Mutation
          mutation={SIGNIN}
          variables={{ data: { username, password } }}
        >
          {(signin, { data, loading, error }) => {
            return (
              <div className="container">
                <form onSubmit={event => this.handleSubmit(event, signin)}>
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

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || this.validateForm()}
                  >
                    Submit
                  </button>
                  {error && <Error error={error.message} />}
                </form>
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Signin;
