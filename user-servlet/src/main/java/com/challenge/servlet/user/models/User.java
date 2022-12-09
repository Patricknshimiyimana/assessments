package com.challenge.servlet.user.models;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import javax.naming.AuthenticationException;
import io.jsonwebtoken.*;

import com.challenge.servlet.dao.UserDao;
import com.challenge.servlet.user.enumDtos.Gender;
import com.challenge.servlet.user.enumDtos.UserRoles;
import com.challenge.servlet.utils.ResponseUtil;
import com.google.gson.annotations.Expose;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class User {
    public String id;
    @NonNull
    public String email;
    @NonNull
    public String firstName;
    @NonNull
    private String lastName;
    @Expose(serialize = false)
    private String password;
    private Gender gender;
    private Integer age;
    private UserRoles role;

    public User() {
        id = UUID.randomUUID().toString();
    }

    public ResponseUtil<String> login(String email, String Password) throws Exception {
        User existingUser = UserDao.findUser(email);

        if (existingUser == null)
            throw new AuthenticationException("Incorrect email or password!");

        if (!Password.equals(existingUser.getPassword()))
            throw new AuthenticationException("Incorrect email or password!");

        Claims claims = Jwts.claims().setSubject(existingUser.email);
        claims.put("role", existingUser.role.name());
        claims.put("email", existingUser.email);

        Instant now = Instant.now();

        String jwtToken = Jwts.builder()
                .claim("role", existingUser.role.name())
                .claim("email", existingUser.email)
                .setSubject(existingUser.email)
                .setId(existingUser.id)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(5l, ChronoUnit.HOURS)))
                .compact();

        return new ResponseUtil<String>("User logged in Successfully", jwtToken);
    }

}