package cn.edu.ecust.modeldisplay.service;

import cn.edu.ecust.modeldisplay.model.Positions;

public interface PositionsService {
    int getProductLineArms();
    void setProductLineArms(int productLineArms);
    float[] getPositions(int counter);
}
