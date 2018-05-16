package cn.edu.ecust.modeldisplay.controller;

import cn.edu.ecust.modeldisplay.dto.Result;
import cn.edu.ecust.modeldisplay.model.ModelDetail;
import cn.edu.ecust.modeldisplay.service.ModelDetailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/model")
public class ModelController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private ModelDetailService modelDetailService;
    @Autowired
    public ModelController(ModelDetailService modelDetailService){
        this.modelDetailService = modelDetailService;
    }

    @PostMapping(value = "/", produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public Result<ModelDetail> getModelDetail(@RequestParam("modelName")String modelName){
        try{
            return new Result<>(true,this.modelDetailService.getDetail(modelName));
        }catch (Exception e){
            return new Result<>(false,e.toString());
        }
    }

}
