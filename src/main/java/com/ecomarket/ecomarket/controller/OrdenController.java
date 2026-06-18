package com.ecomarket.ecomarket.controller;

import com.ecomarket.ecomarket.model.Orden;
import com.ecomarket.ecomarket.service.OrdenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ordenes")
@CrossOrigin(origins = "*")
public class OrdenController {

    private final OrdenService ordenService;

    public OrdenController(OrdenService ordenService) {
        this.ordenService = ordenService;
    }

    @PostMapping("/confirmar/{carritoId}")
    public ResponseEntity<Orden> confirmar(
            @PathVariable Long carritoId,
            @RequestBody Map<String, String> body) {
        String mensaje = body.getOrDefault("mensaje", "");
        return ordenService.confirmarOrden(carritoId, mensaje)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Orden> listar() {
        return ordenService.listarOrdenes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orden> obtener(@PathVariable Long id) {
        return ordenService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}