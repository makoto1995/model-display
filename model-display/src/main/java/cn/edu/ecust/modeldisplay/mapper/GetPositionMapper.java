package cn.edu.ecust.modeldisplay.mapper;

import cn.edu.ecust.modeldisplay.model.Positions;
import org.apache.ibatis.annotations.Param;

public interface GetPositionMapper {
    Positions getPositions(@Param("counter") int counter);
}
