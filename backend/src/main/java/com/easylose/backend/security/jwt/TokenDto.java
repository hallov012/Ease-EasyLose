package com.easylose.backend.security.jwt;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TokenDto {
  private String accessJws;
  private String refreshJws;
}
