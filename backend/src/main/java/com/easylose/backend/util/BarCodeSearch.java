package com.easylose.backend.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
@NoArgsConstructor
public class BarCodeSearch {

  private String barcode;

  public String search(String code) {
    this.barcode = code;
    String uri = System.getenv("BARCODE_URL");
    String keyId = System.getenv("KEY");
    String serviceId = System.getenv("SERVICE_ID");
    String dataType = System.getenv("DATA_TYPE");
    uri += "/" + keyId + "/" + serviceId + "/" + dataType + "/1/52660/BRCD_NO=" + barcode;
    try {
      URL url = new URL(uri);
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
      log.info("response from barcode : {}", response.toString());
      log.info("response to HashMap:{}", response);

      return response.toString();
    } catch (Exception e) {
      log.info("error : {}", e);
      return null;
    }
  }
  ;
}
