package com.easylose.backend.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends GenericFilterBean {
  private final JwtService jwtService;

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {

    String accessJws = null;
    String refreshJws = ((HttpServletRequest) request).getHeader("Refresh-Token");

    // Refresh token check
    if (refreshJws != null) {
      switch (jwtService.validateRefreshJws(refreshJws)) {
        case OK:
          accessJws = jwtService.refreshAccessJws(refreshJws);
          ((HttpServletResponse) response).addHeader("Access-Token", accessJws);

          break;

        case EXPIRED:
          setErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Refresh Token Expired");

          return;

        case ERROR:
          setErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid Refresh Token");

          return;
      }
    } else {
      String headerAuthorization = ((HttpServletRequest) request).getHeader("Authorization");

      if (headerAuthorization != null && headerAuthorization.startsWith("Bearer ")) {
        accessJws = headerAuthorization.substring("Bearer ".length());
      }
    }

    log.info("accessJws={}, refreshJws={}", accessJws, refreshJws);

    switch (jwtService.validateAccessJws(accessJws)) {
      case OK:
        Long id = jwtService.getId(accessJws);
        Authentication auth =
            new UsernamePasswordAuthenticationToken(
                id, "", Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));

        SecurityContextHolder.getContext().setAuthentication(auth);

        break;

      case EXPIRED:
        setErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Access Token Expired");

        return;

      case ERROR:
        setErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid Access Token");

        return;
    }

    chain.doFilter(request, response);
  }

  private void setErrorResponse(ServletResponse response, int status, String message)
      throws IOException, IllegalStateException {
    HashMap<String, String> errorMessage = new HashMap<String, String>();
    errorMessage.put("Error", message);
    String errorMessageJson = (new ObjectMapper()).writeValueAsString(errorMessage);

    response.setContentType("application/json");
    ((HttpServletResponse) response).setStatus(status);
    response.getOutputStream().print(errorMessageJson);
  }
}
