package cn.edu.ecust.modeldisplay.controller;

import cn.edu.ecust.modeldisplay.dto.Result;
import cn.edu.ecust.modeldisplay.exception.account.LoginException;
import cn.edu.ecust.modeldisplay.exception.account.RegisterException;
import cn.edu.ecust.modeldisplay.exception.account.UserControlException;
import cn.edu.ecust.modeldisplay.model.User;
import cn.edu.ecust.modeldisplay.service.UserService;
import com.alibaba.fastjson.JSON;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import java.security.Key;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/users")
public class UserController {
    private Key key = MacProvider.generateKey();
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private UserService userService;
    private final class _id{
        public String id;
        public String role;
        public _id(String id, String role){
            this.id = id;
            this.role = role;
        }
    }
    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping(value = "/login", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> login(@RequestParam("email")String email, @RequestParam("password")String password ){
        try{
            if(userService.getUserByEmail(email).getPassword().equals(password)){
                return new Result<>(true, userService.getUserByEmail(email),Jwts.builder()
                        .setPayload(JSON.toJSONString(new _id(userService.getUserByEmail(email).getUserID(),String.valueOf(userService.getUserByEmail(email).getRole()))))
                        .signWith(SignatureAlgorithm.HS512, key)
                        .compact());
            }
            throw new LoginException("密码错误，请重新输入！");
        }catch (LoginException e1){
            return new Result<>(false,e1.getMessage());
        }
    }

    @PostMapping(value = "/", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> createUser(@RequestBody User user, HttpSession httpSession){
        try{
            userService.register(user);
        }catch (RegisterException e1){
            logger.error(e1.getMessage(),e1);
            return new Result<>(false,e1.getMessage());
        }
        httpSession.setAttribute("user",userService.getUserByEmail(user.getEmail()));
        return new Result<>(true,userService.getUserByEmail(user.getEmail()),Jwts.builder()
                .setPayload(JSON.toJSONString(new _id(user.getUserID(),String.valueOf(user.getRole()))))
                .signWith(SignatureAlgorithm.HS512, key)
                .compact());
    }
    @GetMapping(value = "/me", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> getCurrentUser(@RequestBody User currentUser){
        try{
            return new Result<>(true,userService.getUserByUserID(currentUser.getUserID()));
        }catch (UserControlException e1){
            logger.error("操作非法！",e1);
            return new Result<>(false,"操作非法！");
        }
    }
    @GetMapping(value = "/", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<List<User>> listUsers(@SessionAttribute User user){
        try{
            return new Result<>(true,userService.index(user));
        }catch (UserControlException e1){
            logger.error(e1.getMessage(),e1);
            return new Result<>(false,e1.getMessage());
        }

    }
    @DeleteMapping(value = "/{id}",produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> deleteUser(@PathVariable("id")String id,@SessionAttribute User user){
        try{
            userService.deleteUser(user,id);
            return new Result<>(true,user);
        }catch (UserControlException e1){
            logger.error(e1.getMessage(),e1);
            return new Result<>(false,e1.getMessage());
        }
    }
    @GetMapping(value = "/{id}",produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> getUser(@PathVariable("id")String id){
        try {
            return new Result<>(true,userService.getUserByUserID(id));
        }catch (UserControlException e1){
            logger.error(e1.getMessage(),e1);
            return new Result<>(false,e1.getMessage());
        }
    }
    @PutMapping(value = "/{id}/password",produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<User> changePassword(@PathVariable("id")String id, @RequestParam("oldPassword")String oldPassword,@RequestParam("newPassword")String newPassword, HttpSession httpSession){
        try{
            userService.changePassword(id,oldPassword,newPassword);
            httpSession.setAttribute("user",userService.getUserByUserID(id));
            return new Result<>(true,userService.getUserByUserID(id));
        }catch (UserControlException e1){
            logger.error(e1.getMessage(),e1);
            return new Result<>(false,e1.getMessage());
        }
    }
}
