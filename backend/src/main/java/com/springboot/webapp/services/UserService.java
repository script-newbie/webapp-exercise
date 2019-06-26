package com.springboot.webapp.services;

import com.springboot.webapp.model.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<User> listAll();

    List<User> queryUsersByName(String name);

    User findById(UUID id);

    User save(User user);

    User update(UUID id, User user);

    void delete (UUID id);
}
