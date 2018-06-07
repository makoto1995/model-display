package cn.edu.ecust.modeldisplay.dto;

import com.alibaba.fastjson.annotation.JSONField;

public class AlertMessage {
    @JSONField(name = "messageType")
    private int messageType;
    @JSONField(name = "alertArm")
    private String alertArm;
    @JSONField(name = "alertPart")
    private String alertPart;

    public AlertMessage() {
    }

    public AlertMessage(int messageType, String alertArm, String alertPart) {
        this.messageType = messageType;
        this.alertArm = alertArm;
        this.alertPart = alertPart;
    }

    public int getMessageType() {
        return messageType;
    }

    public void setMessageType(int messageType) {
        this.messageType = messageType;
    }

    public String getAlertArm() {
        return alertArm;
    }

    public void setAlertArm(String alertArm) {
        this.alertArm = alertArm;
    }

    public String getAlertPart() {
        return alertPart;
    }

    public void setAlertPart(String alertPart) {
        this.alertPart = alertPart;
    }
}
