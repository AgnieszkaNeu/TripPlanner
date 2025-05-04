package com.yourjourney.app.exception;

public class ElementNotFoundException extends RuntimeException {
    public ElementNotFoundException(Long id) {super("Element with id: " + id + " not found.");}
    public ElementNotFoundException(String name) {super("Element with name: " + name + " not found.");}
}
