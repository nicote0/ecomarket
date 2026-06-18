package com.ecomarket.ecomarket.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ordenes")
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fechaHora;
    private String mensajeCliente;
    private Double total;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "orden_id")
    private List<ItemCarrito> items;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }
    public String getMensajeCliente() { return mensajeCliente; }
    public void setMensajeCliente(String mensajeCliente) { this.mensajeCliente = mensajeCliente; }
    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }
    public List<ItemCarrito> getItems() { return items; }
    public void setItems(List<ItemCarrito> items) { this.items = items; }
}