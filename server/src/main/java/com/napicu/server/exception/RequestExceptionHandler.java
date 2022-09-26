package com.napicu.server.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RequestExceptionHandler {

    @ExceptionHandler(RequestException.class)
    public ResponseEntity<Object> handleApiException(RequestException e ){
        RequestExceptionSchema d = new RequestExceptionSchema(e.status.value(), e.code.value());
        return new ResponseEntity<Object>(d, e.status);
    }
}
