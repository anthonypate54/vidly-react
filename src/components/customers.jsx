import React, { Component } from "react";
import { Link } from "react-router-dom";

import CustomersTable from "./customersTable";
import Pagenation from "./common/pagination";
import { paginate } from "../utils/paginate";

import { getCustomers, deleteCustomer } from "../services/customerService";
import _ from "lodash";
import SearchBox from "./searchBox";

class Customers extends Component {
  state = {
    customers: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    goldChecked: null,
    sortColumn: { path: "lastName", order: "asc" }
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  handleGold = customer => {
    const customers = [...this.state.customers];
    const index = customers.indexOf(customer);
    customers[index] = { ...customers[index] };
    customers[index].isGold = !customers[index].isGold;
    this.setState({ customers });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handleCheckbox = checked => {
    this.setState({ goldChecked: checked, currentPage: 1 });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      customers: allCustomers
    } = this.state;

    let filtered = allCustomers;
    if (searchQuery)
      filtered = allCustomers.filter(c =>
        c.lastName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    const { totalCount, data: customers } = this.getPagedData();
    return (
      <div className="row">
        <div className="col">
          {user && (
            <Link to="/customers/new" className="btn btn-primary">
              New Customer
            </Link>
          )}
          <p>Showing {totalCount} customers in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CustomersTable
            customers={customers}
            sortColumn={sortColumn}
            onGold={this.handleGold}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagenation
            itemsCount={totalCount}
            onPageChange={this.handlePageChange}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Customers;
