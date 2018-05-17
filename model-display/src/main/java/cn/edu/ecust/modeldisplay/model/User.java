package cn.edu.ecust.modeldisplay.model;

import com.alibaba.fastjson.annotation.JSONField;

public class User {
    @JSONField(name = "userEmail")
    private String userEmail;
    @JSONField(name = "userName")
    private String userName;
    @JSONField(name = "userPassword")
    private String userPassword;
    @JSONField(name = "userId")
    private String userId;
    @JSONField(name = "userRole")
    private String userRole;

    public User() {

    }

    public User(String userName, String userPassword, String userEmail) {
        this.userEmail = userEmail;
        this.userName = userName;
        this.userPassword = userPassword;
    }


    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUsername() {
        return userName;
    }

    public void setUsername(String userName) {
        this.userName = userName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
