package cn.edu.ecust.modeldisplay.service;

import cn.edu.ecust.modeldisplay.model.ModelDetail;

import java.util.List;

public interface ModelDetailService {

    List<String> listModel();

    List<ModelDetail> listModelDetail();

    ModelDetail getDetail(String id);
}
