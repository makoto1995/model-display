package cn.edu.ecust.modeldisplay.dto;

import com.alibaba.fastjson.annotation.JSONField;

public class Result<T> {
    @JSONField(name = "success")
    private boolean success;
    @JSONField(name = "data")
    private T data;
    @JSONField(name = "token")
    private String token;
    @JSONField(name = "error")
    private String error;

    public Result() {

    }

    public Result(boolean success, T data) {
        this.success = success;
        this.data = data;
        this.token = "";
        this.error = "";
    }

    public Result(boolean success, T data, String token) {
        this.success = success;
        this.data = data;
        this.token = token;
        this.error = "";
    }

    public Result(boolean success, String error) {
        this.success = success;
        this.data = null;
        this.error = error;
        this.token = null;
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

    public boolean isSuccess() {
        return success;
    }

    public boolean getSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public void setToken(String token){
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
