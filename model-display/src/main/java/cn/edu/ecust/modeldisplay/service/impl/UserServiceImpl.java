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
    public User[] index() {
        try {
                return userMapper.index();
        } catch (UserControlException e1) {
            throw e1;
        } catch (Exception e) {
            throw new UserControlException("发生内部错误！" + e.getMessage());
        }

    }

    @Override
    public void register(User user) {
        try {
            if (userMapper.getUserByUserName(user.getUserName()) != null) {
                throw new RegisterException("用户名重复！");
            } else if (userMapper.getUserByEmail(user.getUserEmail()) != null) {
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
    public User getUserByUserId(String userID) {
        try {
            if (userMapper.getUserByUserId(userID) == null) {
                throw new UserControlException("数据库无相关记录，请刷新页面！");
            } else {
                return userMapper.getUserByUserId(userID);
            }
        } catch (UserControlException e1) {
            throw e1;
        } catch (Exception e) {
            throw new UserControlException("发生内部错误！" + e.getMessage());
        }
    }

    @Override
    public void deleteUser(String id) {
        try {
            if (userMapper.getUserByUserId(id) == null) {
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
            if (userMapper.getUserByUserId(userID) == null) {
                throw new UserControlException("数据库无相关记录，非法操作！");
            } else if (!userMapper.getUserByUserId(userID).getUserPassword().equals(oldPassword)) {
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
