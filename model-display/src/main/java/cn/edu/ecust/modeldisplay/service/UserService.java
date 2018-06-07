package cn.edu.ecust.modeldisplay.service;

import cn.edu.ecust.modeldisplay.model.User;

public interface UserService {
    User[] index();

    void register(User user);

    User getUserByEmail(String email);

    User getUserByUserId(String id);

    void deleteUser(String id);

    void changePassword(String userID, String oldPassword, String newPassword);

    void changeRole(String userID, String oldRole, String newRole);
}
