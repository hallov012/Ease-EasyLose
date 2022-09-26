package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.UserDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserMapper {
  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  void updateUserFromRequestDto(UserDto.UserRequestDto dto, @MappingTarget User user);

  UserDto.UserResponseDto userToResponseDto(User user);
}
