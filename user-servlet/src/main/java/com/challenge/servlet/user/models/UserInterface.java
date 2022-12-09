package com.challenge.servlet.user.models;

import com.challenge.servlet.utils.ResponseUtil;

public interface UserInterface {
  public abstract ResponseUtil<User> register() throws Exception;

  public void create(User user);
}