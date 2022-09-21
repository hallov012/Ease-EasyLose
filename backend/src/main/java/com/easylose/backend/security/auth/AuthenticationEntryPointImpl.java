package com.easylose.backend.security.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
  @Override
  public void commence(
      HttpServletRequest request,
      HttpServletResponse response,
      AuthenticationException authException)
      throws IOException, ServletException {
    String errorMessage = (String) request.getAttribute("jwtError");
    HashMap<String, Object> errorDetail = new HashMap<String, Object>();
    errorDetail.put("code", HttpServletResponse.SC_UNAUTHORIZED);
    errorDetail.put("message", errorMessage);
    Map<String, Object> errorMap = Collections.singletonMap("error", errorDetail);

    String errorMessageJson = (new ObjectMapper()).writeValueAsString(errorMap);

    response.setContentType("application/json");
    ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    response.getOutputStream().print(errorMessageJson);
  }
}
