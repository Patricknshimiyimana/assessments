package com.challenge.servlet.user.models;

import java.util.regex.Pattern;

import com.challenge.servlet.dao.UserDao;
import com.challenge.servlet.utils.RegexUtil;
import com.challenge.servlet.utils.ResponseUtil;

public class Physician extends User implements UserInterface {
    @Override
    public ResponseUtil<User> register() throws Exception {
        if (!Pattern.matches(RegexUtil.passwordRegex(8), getPassword())) {
            throw new Exception("Password must be exactly 8 characters");
        }


        
        UserDao.createUser(this);

        return new ResponseUtil<User>("Physician registered successfully!", UserDao.findUser(getEmail()));
    }
    

    @Override
    public void create(User user) {
        setFirstName(user.getFirstName());
        setLastName(user.getLastName());
        setAge(user.getAge());
        setRole(user.getRole());
        setEmail(user.getEmail());
        setPassword(user.getPassword());
        setGender(user.getGender());
    }
}
