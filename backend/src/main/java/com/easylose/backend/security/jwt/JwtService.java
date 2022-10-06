package com.easylose.backend.security.jwt;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  private final UserRepository userRepository;
  private final SecretKey accessSecretKey;
  private final SecretKey refreshSecretKey;

  public JwtService(
      UserRepository userRepository,
      @Value("${secret.jwt.access-secret-string}") String accessSecretString,
      @Value("${secret.jwt.refresh-secret-string}") String refreshSecretString) {
    this.userRepository = userRepository;
    this.accessSecretKey = Keys.hmacShaKeyFor(accessSecretString.getBytes(StandardCharsets.UTF_8));
    this.refreshSecretKey =
        Keys.hmacShaKeyFor(refreshSecretString.getBytes(StandardCharsets.UTF_8));
  }

  public TokenDto create(User user) {
    String accessJws = createJws(accessSecretKey, 30, user, "AT");
    String refreshJws = createJws(refreshSecretKey, 60 * 24 * 7, null, "RT");
    return TokenDto.builder().accessJws(accessJws).refreshJws(refreshJws).build();
  }

  public String refreshAccessJws(String refreshJws) {
    List<User> queryResult = userRepository.findByRefreshJws(refreshJws);
    if (queryResult.isEmpty()) {
      return "";
    }
    User user = queryResult.get(0);

    return createJws(accessSecretKey, 30, user, "AT");
  }

  private String createJws(SecretKey secretKey, int expMin, User user, String subject) {
    JwtBuilder builder = Jwts.builder();

    builder.setHeaderParam("typ", "JWT");
    builder.setIssuer("Easy Lose");
    builder.setSubject(subject);
    builder.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * expMin));
    builder.setIssuedAt(new Date());
    if (user != null) {
      builder.claim("id", user.getId());
    }
    builder.signWith(secretKey);

    return builder.compact();
  }

  public JwtValidateResultEnum validateAccessJws(String accessJws) {
    return validate(accessJws, accessSecretKey);
  }

  public JwtValidateResultEnum validateRefreshJws(String refreshJws) {
    List<User> queryResult = userRepository.findByRefreshJws(refreshJws);
    if (queryResult.isEmpty()) {
      return JwtValidateResultEnum.ERROR;
    }
    return validate(refreshJws, refreshSecretKey);
  }

  private JwtValidateResultEnum validate(String jws, SecretKey secretKey) {
    try {
      Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(jws);

      return JwtValidateResultEnum.OK;

    } catch (ExpiredJwtException e) {
      return JwtValidateResultEnum.EXPIRED;

    } catch (Exception e) {
      return JwtValidateResultEnum.ERROR;
    }
  }

  public Long getId(String accessJws) {
    Number id =
        (Integer)
            Jwts.parserBuilder()
                .setSigningKey(accessSecretKey)
                .build()
                .parseClaimsJws(accessJws)
                .getBody()
                .get("id");
    return id.longValue();
  }
}
