package cn.edu.ecust.modeldisplay.service.impl;

import cn.edu.ecust.modeldisplay.mapper.GetPositionMapper;
import cn.edu.ecust.modeldisplay.model.Positions;
import cn.edu.ecust.modeldisplay.service.PositionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PositionsServiceImpl implements PositionsService {
    private int productLineArms = 0;
    private GetPositionMapper getPositionMapper;
    @Autowired
    public PositionsServiceImpl(GetPositionMapper getPositionMapper){
        this.getPositionMapper = getPositionMapper;
    }

    @Override
    public int getProductLineArms() {
        return this.productLineArms;
    }
    @Override
    public void setProductLineArms(int productLineArms) {
        this.productLineArms = productLineArms;
    }

    @Override
    public float[] getPositions(int counter){
        return this.getPositionMapper.getPositions(counter%80+1).toArray();
    }
}
