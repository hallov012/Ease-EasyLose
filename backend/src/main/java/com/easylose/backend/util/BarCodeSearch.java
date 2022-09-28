package com.easylose.backend.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
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

      Map map = new HashMap<>();
      //      JSONObject json = JSONObject.fromObject(response);
      //      for (Object k : json.keySet()) {
      //        Object v = json.get(k);
      //        //          ，
      //        if (v instanceof JSONArray) {
      //          List list = new ArrayList <>();
      //          Iterator it = ((JSONArray) v).iterator();
      //          while (it.hasNext()) {
      //            JSONObject json2 = (JSONObject) it.next();
      //            list.add(json2.Map(json2.toString()));
      //          }
      //          map.put(k.toString(), list);
      //        } else {
      //          map.put(k.toString(), v);
      //        }
      //      }

      log.info("response from barcode : {}", response.toString());
      log.info("response to HashMap:{} {}", map.get(serviceId), map.get(serviceId).getClass());

      return response.toString();
    } catch (Exception e) {
      log.info("error : {}", e);
      return null;
    }
  }
  ;
}
