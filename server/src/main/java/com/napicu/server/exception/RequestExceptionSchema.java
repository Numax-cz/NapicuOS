package com.napicu.server.exception;

import javax.validation.constraints.NotNull;

public class RequestExceptionSchema {
    @NotNull
    public int status;
    @NotNull
    public int code;


    public RequestExceptionSchema(int status, int code) {
        this.status = status;
        this.code = code;
    }
}
