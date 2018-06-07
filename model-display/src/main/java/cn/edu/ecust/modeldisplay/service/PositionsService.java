package cn.edu.ecust.modeldisplay.service;

public interface PositionsService {
    int getProductLineArms();

    void setProductLineArms(int productLineArms);

    float[] getPositions(int counter);
}
