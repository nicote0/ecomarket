package com.ecomarket.ecomarket.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Centraliza el manejo de errores para que la API responda siempre con JSON
 * y el codigo de estado HTTP correcto en lugar de un 500 generico.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Errores de validacion (@Valid): devuelve 400 con el detalle por campo
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> manejarValidacion(MethodArgumentNotValidException ex) {
        Map<String, String> errores = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errores.put(error.getField(), error.getDefaultMessage());
        }

        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("timestamp", LocalDateTime.now());
        respuesta.put("status", HttpStatus.BAD_REQUEST.value());
        respuesta.put("error", "Datos invalidos");
        respuesta.put("detalles", errores);
        return ResponseEntity.badRequest().body(respuesta);
    }

    // Reglas de negocio (ej: carrito vacío): devuelve el estado y mensaje sin stack trace
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> manejarReglaNegocio(ResponseStatusException ex) {
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("timestamp", LocalDateTime.now());
        respuesta.put("status", ex.getStatusCode().value());
        respuesta.put("error", ex.getReason());
        return ResponseEntity.status(ex.getStatusCode()).body(respuesta);
    }

    // JSON mal formado o tipos incompatibles en el body: devuelve 400
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> manejarJsonInvalido(HttpMessageNotReadableException ex) {
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("timestamp", LocalDateTime.now());
        respuesta.put("status", HttpStatus.BAD_REQUEST.value());
        respuesta.put("error", "El cuerpo de la peticion no es un JSON valido");
        return ResponseEntity.badRequest().body(respuesta);
    }
}
