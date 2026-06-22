package com.ecomarket.ecomarket.dto;

public class ConfirmarOrdenRequest {

    // El mensaje del cliente es opcional segun el enunciado
    private String mensaje;

    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}
