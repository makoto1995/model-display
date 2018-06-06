package cn.edu.ecust.modeldisplay.dto;

public class ChangeStageMessage {
    private String stage;
    public ChangeStageMessage(){}
    public ChangeStageMessage(String stage){
        this.stage = stage;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }
}
