package com.example.orders.Services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.orders.Entities.Customer;
import com.example.orders.Repositories.CustomerRepository;
@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public Customer findById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(String name, Long id, Customer updatedCustomer) {
        if (customerRepository.existsById(id)) {
            updatedCustomer.setName(name);
            return customerRepository.save(updatedCustomer);
        } else {
            throw new RuntimeException("Customer not found!"); 
        }
    }

    public void deleteCustomer(Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
        } else {
            throw new RuntimeException("Customer not found with id: " + id);
        }
    }
}
