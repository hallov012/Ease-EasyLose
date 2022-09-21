package com.easylose.backend.config;

import com.easylose.backend.security.jwt.JwtAuthFilter;
import com.easylose.backend.security.jwt.JwtService;
import com.easylose.backend.security.oauth2.OAuth2SuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
  private final OAuth2SuccessHandler successHandler;
  private final JwtService jwtService;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.httpBasic()
        .disable()
        .csrf()
        .disable()
        .formLogin()
        .disable()
        .logout()
        .disable()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests()
        .mvcMatchers("/oauth2/**")
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .addFilterBefore(new JwtAuthFilter(jwtService), UsernamePasswordAuthenticationFilter.class)
        .oauth2Login()
        .successHandler(successHandler)
        .redirectionEndpoint()
        .baseUri("/oauth2/callback/{registrationId}");

    return http.build();
  }
}
