package com.easylose.backend.security.auth;

import com.easylose.backend.security.jwt.JwtService;
import java.io.IOException;
import java.util.Arrays;
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
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

@Slf4j
@RequiredArgsConstructor
public class AuthenticationFilter extends GenericFilterBean {
  private final JwtService jwtService;

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException, AuthenticationException {

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
          request.setAttribute("jwtError", "Refresh token expired");
          break;

        case ERROR:
          request.setAttribute("jwtError", "Invalid refresh token");
          break;
      }
    } else {
      String headerAuthorization = ((HttpServletRequest) request).getHeader("Authorization");

      if (headerAuthorization != null && headerAuthorization.startsWith("Bearer ")) {
        accessJws = headerAuthorization.substring("Bearer ".length());
      }
    }

    log.info("accessJws={}, refreshJws={}", accessJws, refreshJws);

    if (accessJws == null) {
      request.setAttribute("jwtError", "Access token required");
    } else {
      switch (jwtService.validateAccessJws(accessJws)) {
        case OK:
          Long id = jwtService.getId(accessJws);
          Authentication auth =
              new UsernamePasswordAuthenticationToken(
                  id, "", Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));

          SecurityContextHolder.getContext().setAuthentication(auth);
          break;

        case EXPIRED:
          request.setAttribute("jwtError", "Access token expired");
          break;

        case ERROR:
          request.setAttribute("jwtError", "Invalid access token");
          break;
      }
    }

    chain.doFilter(request, response);
  }
}
