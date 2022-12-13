package com.challenge.servlet.utils;

public class RegexUtil {
    public static String passwordRegex(int length){
        String regex = "^\\d{"+length+"}$";
        return regex;
    }
}
