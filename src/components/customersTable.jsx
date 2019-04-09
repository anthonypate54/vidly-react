import React, { Component } from "react";
import Table from "./common/table";
import Gold from "./common/gold";
import { Link } from "react-router-dom";

class CustomersTable extends Component {
  columns = [
    {
      path: "lastName",
      label: "Last Name",
      content: customer => (
        <Link className="nav-link" to={`/customers/${customer._id}`}>
          {customer.lastName}
        </Link>
      )
    },
    {
      path: "firstName",
      label: "First Name"
    },

    { path: "phone", label: "Phone" },
    {
      path: "isGold",
      label: "Customer Rating",
      content: customer => (
        <p>
          <Gold
            gold={customer.isGold}
            onClick={() => this.props.onGold(customer)}
          />
        </p>
      )
    }
  ];

  render() {
    const { customers, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomersTable;
