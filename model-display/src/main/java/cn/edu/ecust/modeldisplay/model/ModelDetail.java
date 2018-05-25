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

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getModelType() {
        return modelType;
    }

    public void setModelType(String modelType) {
        this.modelType = modelType;
    }

    public String getModelHeight() {
        return modelHeight;
    }

    public void setModelHeight(String modelHeight) {
        this.modelHeight = modelHeight;
    }

    public String getModelWeight() {
        return modelWeight;
    }

    public void setModelWeight(String modelWeight) {
        this.modelWeight = modelWeight;
    }

    public String getModelWidth() {
        return modelWidth;
    }

    public void setModelWidth(String modelWidth) {
        this.modelWidth = modelWidth;
    }

    public String getModelDepth() {
        return modelDepth;
    }

    public void setModelDepth(String modelDepth) {
        this.modelDepth = modelDepth;
    }

    public String getModelCost() {
        return modelCost;
    }

    public void setModelCost(String modelCost) {
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
