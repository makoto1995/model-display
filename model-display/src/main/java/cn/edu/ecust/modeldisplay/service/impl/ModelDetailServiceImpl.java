package cn.edu.ecust.modeldisplay.service.impl;

import cn.edu.ecust.modeldisplay.mapper.ModelDetailMapper;
import cn.edu.ecust.modeldisplay.model.ModelDetail;
import cn.edu.ecust.modeldisplay.service.ModelDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ModelDetailServiceImpl implements ModelDetailService {
    private ModelDetailMapper modelDetailMapper;

    @Autowired
    public ModelDetailServiceImpl(ModelDetailMapper modelDetailMapper) {
        this.modelDetailMapper = modelDetailMapper;
    }

    @Override
    public ModelDetail getDetail(String name) {
        return this.modelDetailMapper.getModelDetailByParam(name);
    }
}
