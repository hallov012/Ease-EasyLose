package com.easylose.backend.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Slf4j
@AllArgsConstructor
@NoArgsConstructor
public class BarCodeSearch {

  private String barcode;
  private String uri = "https://openapi.foodsafetykorea.go.kr/api";
  private String keyId = "sample";
  private String serviceId = "C005";
  private String dataType = "json";

  public String search(String code) {
    this.barcode = code;

    uri += "/" + keyId + "/" + serviceId + "/" + dataType + "/1/1000/BAR_CD=" + barcode;
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

      Map map = jsonToMap(response.toString());

      ArrayList res = (ArrayList) map.get("row");
      LinkedHashMap finalMap = (LinkedHashMap) res.get(0);
      String name = (String) finalMap.get("PRDLST_NM");

      log.info("name : {}", name);
      return name;
    } catch (Exception e) {
      log.info("error : {}", e);
      return null;
    }
  }

  public static Map jsonToMap(String response) {
    Map map = new HashMap<>();
    JSONObject json = JSONObject.fromObject(response);
    for (Object k : json.keySet()) {
      Object v = json.get(k);
      //          ，
      if (v instanceof JSONArray) {
        List list = new ArrayList();
        Iterator it = ((JSONArray) v).iterator();
        while (it.hasNext()) {
          JSONObject json2 = (JSONObject) it.next();
          list.add(jsonToMap(json2.toString()));
        }
        map.put(k.toString(), list);
      } else {
        map.put(k.toString(), v);
      }
    }
    Map ans = null;
    JSONObject jsonObj = (JSONObject) map.get(System.getenv("SERVICE_ID"));

    try {
      ans = new ObjectMapper().readValue(jsonObj.toString(), Map.class);

    } catch (JsonMappingException e) {
      throw new RuntimeException(e);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }

    return ans;
  }
}
