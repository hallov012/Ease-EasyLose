package com.easylose.backend.security.oauth2;

import java.util.HashMap;
import java.util.Map;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Builder(access = AccessLevel.PRIVATE)
@Getter
public class OAuth2Attribute {
  private String id;
  private String provider;
  private String name;
  private String img;

  static OAuth2Attribute of(String provider, Map<String, Object> attributes) {
    switch (provider) {
      case "google":
        return ofGoogle(attributes);
      case "kakao":
        return ofKakao(attributes);
      case "naver":
        return ofNaver(attributes);
      default:
        throw new RuntimeException();
    }
  }

  private static OAuth2Attribute ofGoogle(Map<String, Object> attributes) {
    return OAuth2Attribute.builder()
        .id((String) attributes.get("sub"))
        .name((String) attributes.get("name"))
        .img((String) attributes.get("picture"))
        .provider("google")
        .build();
  }

  private static OAuth2Attribute ofKakao(Map<String, Object> attributes) {
    @SuppressWarnings("unchecked")
    Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

    return OAuth2Attribute.builder()
        .id(((Long) attributes.get("id")).toString())
        .name((String) properties.get("nickname"))
        .img((String) properties.get("profile_image"))
        .provider("kakao")
        .build();
  }

  private static OAuth2Attribute ofNaver(Map<String, Object> attributes) {
    @SuppressWarnings("unchecked")
    Map<String, Object> response = (Map<String, Object>) attributes.get("response");

    return OAuth2Attribute.builder()
        .id((String) response.get("id"))
        .name((String) response.get("name"))
        .img((String) response.get("profile_image"))
        .provider("naver")
        .build();
  }

  Map<String, Object> convertToMap() {
    Map<String, Object> map = new HashMap<>();
    map.put("id", id);
    map.put("name", name);
    map.put("img", img);
    map.put("provider", provider);

    return map;
  }
}
