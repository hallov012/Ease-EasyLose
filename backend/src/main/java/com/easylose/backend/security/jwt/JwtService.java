package com.easylose.backend.security.jwt;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.List;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  private final UserRepository userRepository;
  private final String accessEncodeKey;
  private final String refreshEncodeKey;

  public JwtService(
      UserRepository userRepository,
      @Value("${secret.jwt.access-encode-key}") String accessEncodeKey,
      @Value("${secret.jwt.refresh-encode-key}") String refreshEncodeKey) {
    this.userRepository = userRepository;
    this.accessEncodeKey = accessEncodeKey;
    this.refreshEncodeKey = refreshEncodeKey;
  }

  public TokenDto create(User user) {
    String accessJws = createJws(accessEncodeKey, 30, user, "AT");
    String refreshJws = createJws(refreshEncodeKey, 60 * 24 * 700, null, "RT");
    return TokenDto.builder().accessJws(accessJws).refreshJws(refreshJws).build();
  }

  public String refreshAccessJws(String refreshJws) {
    List<User> queryResult = userRepository.findByRefreshJws(refreshJws);
    if (queryResult.isEmpty()) {
      return "";
    }
    User user = queryResult.get(0);

    return createJws(accessEncodeKey, 30, user, "AT");
  }

  private String createJws(String encodeKey, int expMin, User user, String subject) {
    SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(encodeKey));

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
    return validate(accessJws, accessEncodeKey);
  }

  public JwtValidateResultEnum validateRefreshJws(String refreshJws) {
    List<User> queryResult = userRepository.findByRefreshJws(refreshJws);
    if (queryResult.isEmpty()) {
      return JwtValidateResultEnum.ERROR;
    }
    return validate(refreshJws, refreshEncodeKey);
  }

  private JwtValidateResultEnum validate(String jws, String encodeKey) {
    SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(encodeKey));
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
    SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(accessEncodeKey));
    Number id =
        (Integer)
            Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(accessJws)
                .getBody()
                .get("id");
    return id.longValue();
  }
}
