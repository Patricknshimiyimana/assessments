package com.challenge.servlet.user.servlets;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.servlet.dao.UserDao;
import com.challenge.servlet.user.models.User;
import com.challenge.servlet.utils.ResForm;
import com.challenge.servlet.utils.ResponseUtil;

@WebServlet("/getAllUsers")
public class UserList extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    try {
      List<User> result = UserDao.findAllUsers();
      ResForm.res(res, new ResponseUtil<List<User>>("All users fetched successfully!", result),
          HttpServletResponse.SC_OK);
    } catch (Exception e) {
      e.printStackTrace();
      ResForm.res(res, new ResponseUtil<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
    }
  }
}
