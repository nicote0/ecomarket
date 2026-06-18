package com.ecomarket.ecomarket.controller;

import com.ecomarket.ecomarket.model.Carrito;
import com.ecomarket.ecomarket.service.CarritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/carritos")
@CrossOrigin(origins = "*")
public class CarritoController {

    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    @PostMapping
    public Carrito crear() {
        return carritoService.crearCarrito();
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
            @RequestBody Map<String, Object> body) {
        Long productoId = Long.valueOf(body.get("productoId").toString());
        Integer cantidad = Integer.valueOf(body.get("cantidad").toString());
        return carritoService.agregarItem(id, productoId, cantidad)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/items/{itemId}")
    public ResponseEntity<Carrito> modificarItem(
            @PathVariable Long id,
            @PathVariable Long itemId,
            @RequestBody Map<String, Object> body) {
        Integer cantidad = Integer.valueOf(body.get("cantidad").toString());
        return carritoService.modificarItem(id, itemId, cantidad)
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