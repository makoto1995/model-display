package cn.edu.ecust.modeldisplay.controller;

import cn.edu.ecust.modeldisplay.dto.Result;
import cn.edu.ecust.modeldisplay.exception.account.LoginException;
import cn.edu.ecust.modeldisplay.exception.account.RegisterException;
import cn.edu.ecust.modeldisplay.exception.account.UserControlException;
import cn.edu.ecust.modeldisplay.model.User;
import cn.edu.ecust.modeldisplay.service.UserService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.annotation.JSONField;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.security.Key;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {
    private Key key = MacProvider.generateKey();
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/login", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> login(@RequestBody _loginInfo loginInfo,
                              HttpSession httpSession) {
        try {
            if (userService.getUserByEmail(loginInfo.email).getUserPassword().equals(loginInfo.password)) {
                httpSession.setAttribute("currentUser", userService.getUserByEmail(loginInfo.email));
                String token = Jwts.builder()
                        .setPayload(
                                JSON.toJSONString(new _id(userService.getUserByEmail(loginInfo.email).getUserId(),
                                        String.valueOf(userService.getUserByEmail(loginInfo.email).getUserRole()))))
                        .signWith(SignatureAlgorithm.HS512, key)
                        .compact();
                return new Result<>(true,
                        userService.getUserByEmail(loginInfo.email)
                        , token
                );
            }
            throw new LoginException("密码错误，请重新输入！");
        } catch (LoginException e1) {
            return new Result<>(false, e1.getMessage());
        }
    }

    @PostMapping(value = "/", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> createUser(@RequestBody User user, HttpSession httpSession) {
        try {
            userService.register(user);
        } catch (RegisterException e1) {
            logger.error(e1.getMessage(), e1);
            return new Result<>(false, e1.getMessage());
        }
        httpSession.setAttribute("currentUser", userService.getUserByEmail(user.getUserEmail()));
        return new Result<>(true,
                userService.getUserByEmail(user.getUserEmail()),
                Jwts.builder()
                        .setPayload(JSON.toJSONString(new _id(user.getUserId(),
                                String.valueOf(user.getUserRole()))))
                        .signWith(SignatureAlgorithm.HS512, key)
                        .compact());
    }

    @GetMapping(value = "/me", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> getCurrentUser(@RequestBody User currentUser) {
        try {
            return new Result<>(true, userService.getUserByUserId(currentUser.getUserId()));
        } catch (UserControlException e1) {
            logger.error("操作非法！", e1);
            return new Result<>(false, "操作非法！");
        }
    }

    @GetMapping(value = "/", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User[]> listUsers() {
        try {
            return new Result<>(true, userService.index());
        } catch (UserControlException e1) {
            logger.error(e1.getMessage(), e1);
            return new Result<>(false, e1.getMessage());
        }

    }

    @DeleteMapping(value = "/{id}", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> deleteUser(@PathVariable("id") String id) {
        try {
            userService.deleteUser(id);
            return new Result<>(true, new User());
        } catch (UserControlException e1) {
            logger.error(e1.getMessage(), e1);
            return new Result<>(false, e1.getMessage());
        }
    }

    @GetMapping(value = "/{id}", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> getUser(@PathVariable("id") String id) {
        try {
            return new Result<>(true, userService.getUserByUserId(id));
        } catch (UserControlException e1) {
            logger.error(e1.getMessage(), e1);
            return new Result<>(false, e1.getMessage());
        }
    }

    @PutMapping(value = "/{id}/role", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> changeRole(@PathVariable("id") String id, @RequestBody _roles roles) {
        try {
            userService.changeRole(id, roles.oldRole, roles.newRole);
            return new Result<>(true, userService.getUserByUserId(id));
        } catch (UserControlException e1) {
            logger.error(e1.getMessage(), e1);
            return new Result<>(false, e1.getMessage());
        }
    }

    @PutMapping(value = "/{id}/password", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> changePassword(@PathVariable("id") String id, @RequestBody _passwords passwords, HttpSession httpSession) {
        try {
            userService.changePassword(id, passwords.oldPassword, passwords.newPassword);
            httpSession.setAttribute("user", userService.getUserByUserId(id));
            return new Result<>(true, userService.getUserByUserId(id));
        } catch (UserControlException e1) {
            logger.error(e1.getMessage(), e1);
            return new Result<>(false, e1.getMessage());
        }
    }

    public final static class _passwords{
        @JSONField(name = "oldPassword")
        public String oldPassword;
        @JSONField(name = "newPassword")
        public String newPassword;
    }

    public final static class _roles{
        @JSONField(name = "oldRole")
        public String oldRole;
        @JSONField(name = "newRole")
        public String newRole;
    }

    public final static class _loginInfo{
        @JSONField(name = "userEmail")
        public String email;
        @JSONField(name = "userPassword")
        public String password;
    }

    private final static class _id {
        public String id;
        public String role;
        public _id(String id, String role) {
            this.id = id;
            this.role = role;
        }
    }
}
