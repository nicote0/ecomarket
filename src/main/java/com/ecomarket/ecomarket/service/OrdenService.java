package com.ecomarket.ecomarket.service;

import com.ecomarket.ecomarket.model.*;
import com.ecomarket.ecomarket.repository.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrdenService {

    private final OrdenRepository ordenRepository;
    private final CarritoRepository carritoRepository;

    public OrdenService(OrdenRepository ordenRepository,
                        CarritoRepository carritoRepository) {
        this.ordenRepository = ordenRepository;
        this.carritoRepository = carritoRepository;
    }

    public Optional<Orden> confirmarOrden(Long carritoId, String mensaje) {
        return carritoRepository.findById(carritoId).map(carrito -> {

            // Copiamos los ítems en lugar de reutilizar la misma lista
            List<ItemCarrito> itemsCopia = new ArrayList<>();
            for (ItemCarrito original : carrito.getItems()) {
                ItemCarrito copia = new ItemCarrito();
                copia.setProducto(original.getProducto());
                copia.setCantidad(original.getCantidad());
                itemsCopia.add(copia);
            }

            Orden orden = new Orden();
            orden.setFechaHora(LocalDateTime.now());
            orden.setMensajeCliente(mensaje);
            orden.setTotal(carrito.calcularTotal());
            orden.setItems(itemsCopia);

            return ordenRepository.save(orden);
        });
    }

    public List<Orden> listarOrdenes() {
        return ordenRepository.findAll();
    }

    public Optional<Orden> buscarPorId(Long id) {
        return ordenRepository.findById(id);
    }
}