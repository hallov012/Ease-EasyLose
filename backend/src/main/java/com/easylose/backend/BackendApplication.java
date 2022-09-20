package com.easylose.backend;

// import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.filter.HiddenHttpMethodFilter;
// import org.springframework.context.annotation.Bean;

// import com.easylose.backend.api.v1.domain.User;
// import com.easylose.backend.api.v1.repository.UserRepository;

@SpringBootApplication
@EnableJpaAuditing
public class BackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }


}
