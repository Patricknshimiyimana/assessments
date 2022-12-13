package com.challenge.servlet.user.servlets;

import java.io.IOException;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.servlet.user.models.User;
import com.challenge.servlet.utils.JSONUtil;
import com.challenge.servlet.utils.ResForm;
import com.challenge.servlet.utils.ResponseUtil;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        User user = new JSONUtil().parseBodyJson(req, User.class);
        try {
            ResponseUtil<String> result = user.login(user.getEmail(), user.getPassword());
            ResForm.res(res, result, HttpServletResponse.SC_OK);
        } catch (AuthenticationException e) {
            e.printStackTrace();
            ResForm.res(res, new ResponseUtil<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
