package cn.edu.ecust.modeldisplay.model;


import com.alibaba.fastjson.annotation.JSONField;

public class ModelDetail {
    @JSONField(name = "modelName")
    private String modelName;
    @JSONField(name = "modelType")
    private String modelType;
    @JSONField(name = "modelWeight")
    private String modelWeight;
    @JSONField(name = "modelHeight")
    private String modelHeight;
    @JSONField(name = "modelWidth")
    private String modelWidth;
    @JSONField(name = "modelDepth")
    private String modelDepth;
    @JSONField(name = "modelCost")
    private String modelCost;

    public ModelDetail() {

    }

    public ModelDetail(String modelName, String modelType, String modelWeight, String modelHeight, String modelWidth, String modelDepth, String modelCost) {
        this.modelName = modelName;
        this.modelType = modelType;
        this.modelWeight = modelWeight;
        this.modelHeight = modelHeight;
        this.modelWidth = modelWidth;
        this.modelDepth = modelDepth;
        this.modelCost = modelCost;
    }

    public String getName() {
        return modelName;
    }

    public void setName(String modelName) {
        this.modelName = modelName;
    }

    public String getType() {
        return modelType;
    }

    public void setType(String modelType) {
        this.modelType = modelType;
    }

    public String getHeight() {
        return modelHeight;
    }

    public void setHeight(String modelHeight) {
        this.modelHeight = modelHeight;
    }

    public String getWeight() {
        return modelWeight;
    }

    public void setWeight(String modelWeight) {
        this.modelWeight = modelWeight;
    }

    public String getWidth() {
        return modelWidth;
    }

    public void setWidth(String modelWidth) {
        this.modelWidth = modelWidth;
    }

    public String getDepth() {
        return modelDepth;
    }

    public void setDepth(String modelDepth) {
        this.modelDepth = modelDepth;
    }

    public String getCost() {
        return modelCost;
    }

    public void setCost(String modelCost) {
        this.modelCost = modelCost;
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
