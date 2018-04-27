package cn.edu.ecust.modeldisplay.mapper;

import cn.edu.ecust.modeldisplay.model.ModelDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ModelDetailMapper {
    List<ModelDetail> listModelDetail();

    List<String> listModelName();

    ModelDetail getModelDetailByParam(@Param("name") String name);

}
