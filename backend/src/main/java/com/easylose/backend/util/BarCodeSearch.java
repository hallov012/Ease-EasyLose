package com.easylose.backend.util;

public class BarCodeSearch {

  private String barcode;

  public void search(String code) {
    this.barcode = code;
    String url = System.getenv("BARCODE_URL");
    String keyId = System.getenv("KEY");
    String serviceId = System.getenv("SYSTEM_ID");
    String dataType = System.getenv("DATA_TYPE");

    url = url + "/" + keyId + "/" + serviceId + "/" + dataType + "?";
  }
  ;
}
