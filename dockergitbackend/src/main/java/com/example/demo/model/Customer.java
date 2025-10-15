package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer_table")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long id;

    @Column(name = "customer_name", nullable = false, length = 50)
    private String name;

    @Column(name = "customer_email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "customer_phone", nullable = false, unique = true, length = 20)
    private String phone;

    @Column(name = "customer_notes", length = 200)
    private String notes;

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    @Override
    public String toString() {
        return "Customer [id=" + id + ", name=" + name + ", email=" + email + 
               ", phone=" + phone + ", notes=" + notes + "]";
    }
}
