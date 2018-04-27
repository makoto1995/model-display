package cn.edu.ecust.modeldisplay.mapper;

import cn.edu.ecust.modeldisplay.model.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {
    User[] index();

    void register(@Param("user") User user);

    User getUserByEmail(@Param("email") String email);

    User getUserByUserID(@Param("userID") String id);

    User getUserByUserName(@Param("userName") String username);

    void deleteUser(@Param("id") String id);

    void changePassword(@Param("userID") String userID, @Param("newPassword") String newPassword);
}
