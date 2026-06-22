package com.ecomarket.ecomarket.controller;

import com.ecomarket.ecomarket.dto.AgregarItemRequest;
import com.ecomarket.ecomarket.dto.ModificarItemRequest;
import com.ecomarket.ecomarket.model.Carrito;
import com.ecomarket.ecomarket.service.CarritoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carritos")
@CrossOrigin(origins = "*")
public class CarritoController {

    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    @PostMapping
    public ResponseEntity<Carrito> crear() {
        Carrito carrito = carritoService.crearCarrito();
        return ResponseEntity.status(HttpStatus.CREATED).body(carrito);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carrito> obtener(@PathVariable Long id) {
        return carritoService.obtenerCarrito(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/items")
    public ResponseEntity<Carrito> agregarItem(
            @PathVariable Long id,
            @Valid @RequestBody AgregarItemRequest body) {
        return carritoService.agregarItem(id, body.getProductoId(), body.getCantidad())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/items/{itemId}")
    public ResponseEntity<Carrito> modificarItem(
            @PathVariable Long id,
            @PathVariable Long itemId,
            @Valid @RequestBody ModificarItemRequest body) {
        return carritoService.modificarItem(id, itemId, body.getCantidad())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/items/{itemId}")
    public ResponseEntity<Carrito> eliminarItem(
            @PathVariable Long id,
            @PathVariable Long itemId) {
        return carritoService.eliminarItem(id, itemId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}