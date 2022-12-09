package com.challenge.servlet.dao;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.challenge.servlet.user.models.User;

import lombok.Getter;

@Getter
public class UserDao {
    private static Map<String, User> users = new LinkedHashMap<>();

    public static void createUser(User user) {
        if (users.get(user.getEmail()) != null) {
            throw new RuntimeException("user already Exists");
        }
        users.put(user.getEmail(), user);
    }

    public static User findUser(String email) {
        return users.get(email);
    }

    public static List<User> findAllUsers() {
        return new ArrayList<>(users.values());
    }

}
