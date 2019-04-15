import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getCustomer, saveCustomer } from "../services/customerService";

class CustomerForm extends Form {
  state = {
    data: { firstName: "", lastName: "", phone: "", isGold: false },
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    firstName: Joi.string()
      .required()
      .label("First Name"),
    phone: Joi.string()
      .required()
      .max(13)
      .label("Phone Number"),
    isGold: Joi.boolean()
      .label("Customer")
      .required()
  };

  async populateCustomer() {
    try {
      const customerId = this.props.match.params.id;
      if (customerId === "new") return;

      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateCustomer();
  }

  mapToViewModel(customer) {
    return {
      _id: customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      isGold: customer.isGold
    };
  }
  doSubmit = async () => {
    await saveCustomer(this.state.data);
    this.props.history.push("/customers");
  };
  render() {
    return (
      <div>
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("phone", "Phone Number")}
          {this.renderCheckbox(
            "isGold",
            "Customer Value",
            this.state.data.isGold
          )}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CustomerForm;
