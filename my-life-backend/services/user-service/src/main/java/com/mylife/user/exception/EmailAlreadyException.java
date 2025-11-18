package com.mylife.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class EmailAlreadyException extends RuntimeException {
    public EmailAlreadyException() {
        super("Email already use.");
    }
}
