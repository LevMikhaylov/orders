package com.example.orders.Services;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.orders.Entities.Order;
import com.example.orders.Repositories.OrderRepository;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public List<Order> findByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Long orderId, Order updatedOrder) {
        if (orderRepository.existsById(orderId)) {
            updatedOrder.setId(orderId); 
            return orderRepository.save(updatedOrder);
        } else {
            throw new RuntimeException("Order not found"); 
        }
    }

    public void deleteOrder(Long orderId) {
        if (orderRepository.existsById(orderId)) {
            orderRepository.deleteById(orderId);
        } else {
            throw new RuntimeException("Order not Found");
        }
    }

    public List<Order> findByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    public List<Order> findByDate(LocalDate date) {
        return orderRepository.findByDate(date);
    }
    public List<Order> getAllOrders() {
        return findAll();
    }
}
