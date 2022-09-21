package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.UserDto;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.service.UserService;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public Collection<UserDto> getUserAll() {
    Collection users = userRepository.findAll();
    return users;
  }

  public UserDto.ResponseDto createUser(UserDto.CreateRequestDto userRequestDto) {
    User user = userRepository.save(userRequestDto.toEntity());
    return new UserDto.ResponseDto(user);
  }

  public UserDto.ResponseDto getUser(Long id) {
    return new UserDto.ResponseDto(userRepository.findById(id).orElse(null));
  }

  public UserDto.ResponseDto updateUser(Long id, UserDto.UpdateRequestDto userRequestDto) {
    User user = userRepository.findById(id).orElse(null);
    user.update(userRequestDto);
    userRepository.save(user);
    return new UserDto.ResponseDto(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
