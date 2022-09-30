package com.easylose.backend.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class BarCodeSearch {

  private @Value("${barcode.uri}") String uri;
  private @Value("${barcode.key}") String keyId;
  private @Value("${barcode.service-id}") String serviceId;
  private @Value("${barcode.data-type}") String dataType;

  public String search(String barcode) {
    try {
      URL url =
          new URL(
              uri + "/" + keyId + "/" + serviceId + "/" + dataType + "/1/1000/BAR_CD=" + barcode);
      log.info("url : {}", url.toString());

      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.setRequestMethod("GET");

      int responseCode = con.getResponseCode();
      BufferedReader br;
      if (responseCode == 200) {
        br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));

      } else {
        br = new BufferedReader(new InputStreamReader(con.getErrorStream(), "UTF-8"));
      }
      String inputLine;
      StringBuffer response = new StringBuffer();

      while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
      }
      br.close();

      String name = getProductListName(response.toString());

      log.info("name : {}", name);

      return name;
    } catch (Exception e) {
      log.info("error : {}", e.getMessage());
      return null;
    }
  }

  public String getProductListName(String response) {
    try {
      return (String)
          JSONObject.fromObject(response)
              .getJSONObject(serviceId)
              .getJSONArray("row")
              .getJSONObject(0)
              .get("PRDLST_NM");

    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}
