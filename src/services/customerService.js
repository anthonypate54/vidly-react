import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/customers";

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getCustomers() {
  return http.get(apiEndpoint);
}

export function deleteCustomer(customerId) {
  return http.delete(customerUrl(customerId));
}

export function getCustomer(customerId) {
  return http.get(customerUrl(customerId));
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(customerUrl(customer._id), body);
  } else {
    return http.post(apiEndpoint, customer);
  }
}
