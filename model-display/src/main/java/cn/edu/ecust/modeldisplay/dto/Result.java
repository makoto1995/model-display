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
    }

    public Result(boolean success, T data, String token) {
        this.success = success;
        this.data = data;
        this.token = token;
    }

    public Result(boolean success, String error) {
        this.success = success;
        this.error = error;
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
}
