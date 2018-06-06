package cn.edu.ecust.modeldisplay.controller;

import cn.edu.ecust.modeldisplay.dto.AlertMessage;
import cn.edu.ecust.modeldisplay.dto.ChangeStageMessage;
import cn.edu.ecust.modeldisplay.dto.PositionMessage;
import cn.edu.ecust.modeldisplay.dto.ProductLineMessage;
import cn.edu.ecust.modeldisplay.service.PositionsService;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin
public class DisplayController {

    private static boolean isMoving = false;
    private static int counter = 0;
    private PositionsService positionsService;
    private SimpMessagingTemplate messagingTemplate;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public DisplayController(PositionsService positionsService, SimpMessagingTemplate messagingTemplate) {
        this.positionsService = positionsService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping(value = "/arms/reset", consumes = {"application/json; charset=utf-8"})
    @ResponseBody
    public void reset(){
        counter = 0;
        isMoving = false;
    }

    @PostMapping(value = "/arms/alert", consumes = {"application/json; charset=utf-8"})
    @ResponseBody
    public void alert(@RequestBody AlertMessage message){
        switch (message.getMessageType()) {
            case 0:
                isMoving = false;
                break;
            case 1:
                isMoving = true;
                break;
        }
    }

    @PostMapping(value = "/arms/startup", consumes = {"application/json; charset=utf-8"})
    @ResponseBody
    public void startUp(@RequestBody ProductLineMessage message){
        logger.info(String.valueOf(message.getProductLineNum()));
        this.positionsService.setProductLineArms(message.getProductLineArms());
        if (message.getProductLineNum() == 1) {
            isMoving = true;
        }
    }

    @Scheduled(fixedDelay = 50000)
    public void sendAlert(){
        isMoving = false;
        messagingTemplate.convertAndSend("topic/warnings", JSON.toJSONString(new AlertMessage(0,"Arm1-2", "Part4")));
    }

    @Scheduled(fixedDelay = 60000)
    public void reverseAlert(){
        isMoving = true;
        messagingTemplate.convertAndSend("topic/warnings", JSON.toJSONString(new AlertMessage(1,"Arm1-2", "Part4")));
    }

    @Scheduled(fixedDelay = 30000)
    public void changeState(){
        messagingTemplate.convertAndSend("topic/stages", JSON.toJSONString(new ChangeStageMessage("change")));
    }

    @Scheduled(fixedDelay = 1000)
    public void sendPosition(){
        if (!isMoving) {
            return;
        }
        PositionMessage[] positionMessages = new PositionMessage[this.positionsService.getProductLineArms()];
        for (int i = 0; i < positionMessages.length; i++) {
            if (i % 2 == 0) {
                positionMessages[i] = new PositionMessage(this.positionsService.getPositions(counter));
            } else {
                positionMessages[i] = new PositionMessage(new float[5]);
            }
        }
        counter = (counter >= 8000) ? 0 : counter + 1;
        messagingTemplate.convertAndSend("/topic/positions", JSON.toJSONString(positionMessages));
    }
}
