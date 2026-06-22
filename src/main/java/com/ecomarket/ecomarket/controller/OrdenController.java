package com.ecomarket.ecomarket.controller;

import com.ecomarket.ecomarket.dto.ConfirmarOrdenRequest;
import com.ecomarket.ecomarket.model.Orden;
import com.ecomarket.ecomarket.service.OrdenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
            @RequestBody(required = false) ConfirmarOrdenRequest body) {
        String mensaje = (body != null && body.getMensaje() != null) ? body.getMensaje() : "";
        return ordenService.confirmarOrden(carritoId, mensaje)
                .map(orden -> ResponseEntity.status(HttpStatus.CREATED).body(orden))
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