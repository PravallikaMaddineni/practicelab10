package com.example.demo.service;

import java.util.List;
import com.example.demo.model.Customer;

public interface CustomerService {

    Customer addCustomer(Customer customer);

    List<Customer> getAllCustomers();

    Customer getCustomerById(Long id);

    Customer updateCustomer(Customer customer);

    void deleteCustomerById(Long id);

}
