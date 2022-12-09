package com.challenge.servlet.utils;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ResponseUtil<T> {
    String message;
    T payload;
}
