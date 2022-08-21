package com.napicu.server.exception;

import org.springframework.http.HttpStatus;

public class RequestException extends RuntimeException {
    public HttpStatus status;
    public NapicuExceptions code;

    public RequestException(HttpStatus status, NapicuExceptions code) {
        this.status = status;
        this.code = code;
    }


}
