package com.challenge.servlet.utils;

public class RegexUtil {
    public static String passwordRegex(int length){
        // password can include symbols, numbers and signs!
        // String regex = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=\\S+$).{" + length + "}$";
        String regex = "^\\d{"+length+"}$";
        return regex;
    }
}
