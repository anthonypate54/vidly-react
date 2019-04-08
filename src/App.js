import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import CustomerForm from "./components/customerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import NotFound from "./components/notfound";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <main className="container">
        <React.Fragment>
          <ToastContainer />

          <NavBar user={user} />
          <div className="content">
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={RegisterForm} />
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              <ProtectedRoute path="/customers/:id" component={CustomerForm} />
              <Route
                path="/movies"
                render={props => <Movies {...props} user={this.state.user} />}
              />
              <Route
                path="/customers"
                render={props => (
                  <Customers {...props} user={this.state.user} />
                )}
              />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </React.Fragment>
      </main>
    );
  }
}

export default App;
