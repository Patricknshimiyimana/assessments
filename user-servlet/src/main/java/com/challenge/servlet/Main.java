package com.challenge.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.servlet.utils.ResForm;
import com.challenge.servlet.utils.ResponseUtil;



@WebServlet("")
public class Main extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        ResForm.res(res, new ResponseUtil<>("Hello from patrick!", null), HttpServletResponse.SC_OK);
    }
    
}
