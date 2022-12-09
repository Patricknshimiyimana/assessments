package com.challenge.servlet.user.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.servlet.user.enumDtos.UserRoles;
import com.challenge.servlet.user.models.Admin;
import com.challenge.servlet.user.models.Patient;
import com.challenge.servlet.user.models.Pharmacists;
import com.challenge.servlet.user.models.Physician;
import com.challenge.servlet.user.models.User;
import com.challenge.servlet.utils.JSONUtil;
import com.challenge.servlet.utils.ResForm;
import com.challenge.servlet.utils.ResponseUtil;

@WebServlet("/register")
public class SignupServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        User user = new JSONUtil().parseBodyJson(req, User.class);  
        
        try {
            ResponseUtil<User> results = null;
            if (user.getRole() ==  UserRoles.Admin) {
                Admin admin = new Admin();
                admin.create(user);
                results = admin.register();
           }  else if (user.getRole() == UserRoles.Patient) {
                Patient patient = new Patient();
                patient.create(user);
                results = patient.register();
            } else if (user.getRole() == UserRoles.Pharmacist) {
                Pharmacists pharmacists = new Pharmacists();
                pharmacists.create(user);
                results = pharmacists.register();
            } else if (user.getRole() == UserRoles.Physician) {
                Physician physician = new Physician();
                physician.create(user);
                results = physician.register();
            }
            
            ResForm.res(res, results, HttpServletResponse.SC_CREATED);


        } catch (Exception e) {
            e.printStackTrace();
            ResForm.res(res, new ResponseUtil<>(e.getMessage(), null), HttpServletResponse.SC_BAD_REQUEST);
        }
    }
    
}
