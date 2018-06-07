package cn.edu.ecust.modeldisplay.dto;

import com.alibaba.fastjson.annotation.JSONField;

public class ProductLineMessage {
    @JSONField(name = "productLineNum")
    private int productLineNum;
    @JSONField(name = "productLineArms")
    private int productLineArms;

    public ProductLineMessage() {
    }

    public ProductLineMessage(int productLineNum, int productLineArms) {
        this.productLineArms = productLineArms;
        this.productLineNum = productLineNum;
    }

    public int getProductLineArms() {
        return productLineArms;
    }

    public void setProductLineArms(int productLineArms) {
        this.productLineArms = productLineArms;
    }

    public int getProductLineNum() {
        return productLineNum;
    }

    public void setProductLineNum(int productLineNum) {
        this.productLineNum = productLineNum;
    }
}
