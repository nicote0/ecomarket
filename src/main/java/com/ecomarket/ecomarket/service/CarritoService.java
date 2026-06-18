package com.ecomarket.ecomarket.service;

import com.ecomarket.ecomarket.model.*;
import com.ecomarket.ecomarket.repository.*;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CarritoService {

    private final CarritoRepository carritoRepository;
    private final ProductoRepository productoRepository;
    private final ItemCarritoRepository itemCarritoRepository;

    public CarritoService(CarritoRepository carritoRepository,
                          ProductoRepository productoRepository,
                          ItemCarritoRepository itemCarritoRepository) {
        this.carritoRepository = carritoRepository;
        this.productoRepository = productoRepository;
        this.itemCarritoRepository = itemCarritoRepository;
    }

    public Carrito crearCarrito() {
        return carritoRepository.save(new Carrito());
    }

    public Optional<Carrito> obtenerCarrito(Long id) {
        return carritoRepository.findById(id);
    }

    public Optional<Carrito> agregarItem(Long carritoId, Long productoId, Integer cantidad) {
        Optional<Carrito> carritoOpt = carritoRepository.findById(carritoId);
        Optional<Producto> productoOpt = productoRepository.findById(productoId);

        if (carritoOpt.isEmpty() || productoOpt.isEmpty()) return Optional.empty();

        Carrito carrito = carritoOpt.get();
        Producto producto = productoOpt.get();

        // Si el producto ya está en el carrito, suma la cantidad
        Optional<ItemCarrito> existente = carrito.getItems().stream()
                .filter(i -> i.getProducto().getId().equals(productoId))
                .findFirst();

        if (existente.isPresent()) {
            existente.get().setCantidad(existente.get().getCantidad() + cantidad);
        } else {
            ItemCarrito item = new ItemCarrito();
            item.setCarrito(carrito);
            item.setProducto(producto);
            item.setCantidad(cantidad);
            carrito.getItems().add(item);
        }

        return Optional.of(carritoRepository.save(carrito));
    }

    public Optional<Carrito> modificarItem(Long carritoId, Long itemId, Integer cantidad) {
        return carritoRepository.findById(carritoId).map(carrito -> {
            carrito.getItems().stream()
                    .filter(i -> i.getId().equals(itemId))
                    .findFirst()
                    .ifPresent(i -> i.setCantidad(cantidad));
            return carritoRepository.save(carrito);
        });
    }

    public Optional<Carrito> eliminarItem(Long carritoId, Long itemId) {
        return carritoRepository.findById(carritoId).map(carrito -> {
            carrito.getItems().removeIf(i -> i.getId().equals(itemId));
            return carritoRepository.save(carrito);
        });
    }
}