package com.springboot.webapp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import com.springboot.webapp.model.User;
import com.springboot.webapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@CrossOrigin()
@RestController
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> listUsers(@RequestParam(required = false) String name) {
        if (StringUtils.hasText(name)) {
            return userService.queryUsersByName(name);
        } else {
            return userService.listAll();
        }
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable UUID id) {
        return userService.findById(id);
    }

    @PostMapping(value = "/users", consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User user){
        return userService.save(user);
    }

    @PutMapping(value = "/users/{id}", consumes = "application/json", produces = "application/json")
    public User update(@PathVariable("id") UUID id, @RequestBody User user) {
        return userService.update(id, user);
    }

    @DeleteMapping(value = "/users/{id}")
    public User delete(@PathVariable("id") UUID id) {
        User user = userService.findById(id);
        userService.delete(id);
        return user;
    }

} 
