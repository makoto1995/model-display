package cn.edu.ecust.modeldisplay.dto;

import com.alibaba.fastjson.annotation.JSONField;

import java.io.Serializable;

public class PositionMessage implements Serializable {

    private static final long serialVersionUID = -341658452058700240L;
    @JSONField(name = "position")
    private float[] position = new float[5];

    public PositionMessage() {
    }

    public PositionMessage(float[] position) {
        this.position = position;
    }

    public float[] getPosition() {
        return position;
    }

    public void setPosition(float[] position) {
        this.position = position;
    }
}
