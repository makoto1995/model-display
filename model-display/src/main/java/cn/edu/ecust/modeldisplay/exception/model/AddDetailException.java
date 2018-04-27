package cn.edu.ecust.modeldisplay.exception.model;

public class AddDetailException extends RuntimeException {
    public AddDetailException(String message) {
        super(message);
    }

    public AddDetailException(String message, Throwable cause) {
        super(message, cause);
    }
}
