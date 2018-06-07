package cn.edu.ecust.modeldisplay.model;

public class Positions {
    private int joint1;
    private int joint2;
    private int joint3;
    private int joint4;
    private int joint5;

    public Positions() {
    }

    public Positions(int joint1, int joint2, int joint3, int joint4, int joint5) {
        this.joint1 = joint1;
        this.joint2 = joint2;
        this.joint3 = joint3;
        this.joint4 = joint4;
        this.joint5 = joint5;
    }

    public int getJoint1() {
        return joint1;
    }

    public void setJoint1(int joint1) {
        this.joint1 = joint1;
    }

    public int getJoint2() {
        return joint2;
    }

    public void setJoint2(int joint2) {
        this.joint2 = joint2;
    }

    public int getJoint3() {
        return joint3;
    }

    public void setJoint3(int joint3) {
        this.joint3 = joint3;
    }

    public int getJoint4() {
        return joint4;
    }

    public void setJoint4(int joint4) {
        this.joint4 = joint4;
    }

    public int getJoint5() {
        return joint5;
    }

    public void setJoint5(int joint5) {
        this.joint5 = joint5;
    }

    public float[] toArray() {
        return new float[]{joint1, joint2 * 2, joint3 * 3, joint4 * 4, joint5 * 5};
    }
}
