package cn.edu.ecust.modeldisplay.service.impl;

import cn.edu.ecust.modeldisplay.exception.account.RegisterException;
import cn.edu.ecust.modeldisplay.exception.account.UserControlException;
import cn.edu.ecust.modeldisplay.mapper.UserMapper;
import cn.edu.ecust.modeldisplay.model.User;
import cn.edu.ecust.modeldisplay.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public User[] index(User currentUser) {
        try {
            if (currentUser.getRole() != 5) {
                throw new UserControlException("权限不足，操作非法，请刷新页面！");
            } else {
                return userMapper.index();
            }
        } catch (UserControlException e1) {
            throw e1;
        } catch (Exception e) {
            throw new UserControlException("发生内部错误！" + e.getMessage());
        }

    }

    @Override
    public void register(User user) {
        try {
            if (userMapper.getUserByUserName(user.getUsername()) != null) {
                throw new RegisterException("用户名重复！");
            } else if (userMapper.getUserByEmail(user.getEmail()) != null) {
                throw new RegisterException("Email重复！");
            } else {
                userMapper.register(user);
            }
        } catch (RegisterException e) {
            throw e;
        } catch (Exception e) {
            throw new RegisterException("SQL内部错误！" + e.getMessage());
        }
    }

    @Override
    public User getUserByEmail(String email) {
        try {
            if (userMapper.getUserByEmail(email) == null) {
                throw new UserControlException("数据库无相关记录，请刷新页面！");
            } else {
                return userMapper.getUserByEmail(email);
            }
        } catch (UserControlException e1) {
            throw e1;
        } catch (Exception e) {
            throw new UserControlException("发生内部错误！" + e.getMessage());
        }
    }

    @Override
    public User getUserByUserID(String userID) {
        try {
            if (userMapper.getUserByUserID(userID) == null) {
                throw new UserControlException("数据库无相关记录，请刷新页面！");
            } else {
                return userMapper.getUserByUserID(userID);
            }
        } catch (UserControlException e1) {
            throw e1;
        } catch (Exception e) {
            throw new UserControlException("发生内部错误！" + e.getMessage());
        }
    }

    @Override
    public void deleteUser(User currentUser, String id) {
        try {
            if (currentUser.getRole() != 5) {
                throw new UserControlException("权限不足，操作非法，请刷新页面！");
            } else if (userMapper.getUserByUserID(id) == null) {
                throw new UserControlException("数据库无相关记录，请刷新页面！");
            } else {
                userMapper.deleteUser(id);
            }
        } catch (UserControlException e1) {
            throw e1;
        } catch (Exception e) {
            throw new UserControlException("发生内部错误！" + e.getMessage());
        }
    }

    @Override
    public void changePassword(String userID, String oldPassword, String newPassword) {
        try {
            if (userMapper.getUserByUserID(userID) == null) {
                throw new UserControlException("数据库无相关记录，非法操作！");
            } else if (!userMapper.getUserByUserID(userID).getPassword().equals(oldPassword)) {
                throw new UserControlException("密码错误，请重新输入！");
            } else {
                userMapper.changePassword(userID, newPassword);
            }
        } catch (UserControlException e1) {
            throw e1;
        } catch (Exception e) {
            throw new UserControlException("发生内部错误！" + e.getMessage());
        }
    }

}
