package com.challenge.servlet.utils;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

public class ResForm {

    public static void res(HttpServletResponse res, ResponseUtil payload, int status) {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        try {
            res.setStatus(status);
            if (payload != null) {
                OutputStream outputStream = res.getOutputStream();
                outputStream.write(new JSONUtil().toJson(payload).getBytes());
                outputStream.flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }    
}
