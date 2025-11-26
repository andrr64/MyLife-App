package com.andreas.mylife.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class SQLException extends Exception{
    public SQLException(String msg){
        super(msg);
    }
}
