package com.easylose.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
// swagger 주소 : http://localhost:8080/swagger-ui.html
public class SwaggerConfig {
  @Bean
  public OpenAPI openAPI() {
    Info info =
        new Info()
            .title("Easy Lose Spring Boot REST API")
            .description("Easy Lose Swagger를 통해 Easy Build 하세요!")
            .version("v0.0.1")
            .license(
                new License()
                    .name("Apache 2.0")
                    .url("https://www.apache.org/licenses/LICENSE-2.0"));

    SecurityScheme securityScheme =
        new SecurityScheme()
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT")
            .in(SecurityScheme.In.HEADER)
            .name("Authorization");

    SecurityRequirement securityRequirement = new SecurityRequirement().addList("Bearer");

    return new OpenAPI()
        .info(info)
        .components(new Components().addSecuritySchemes("Bearer", securityScheme))
        .security(Arrays.asList(securityRequirement));
  }
}
