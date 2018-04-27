package cn.edu.ecust.modeldisplay.exception.model;

public class NoRecordException extends RuntimeException {

    public NoRecordException(String message) {
        super(message);
    }

    public NoRecordException(String message, Throwable cause) {
        super(message, cause);
    }

}
