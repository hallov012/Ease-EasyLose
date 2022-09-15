
'''
# File name : get_data_from_food_nutrition_DB.py
# 
# Written by Dongwon Kim
#
# Get data from data.go.kr
#   done from 1 ~ 9000 (total 90608)
#   closing } should be removed manually
#   can get 1000 rows per try
#
# Modificatoin history
#    written by Dongwon Kim on Sep 15, 2022
'''
import requests

for i in range(1, 90609, 1000):
    url = "http://openapi.foodsafetykorea.go.kr/api/7f641171b3c24a64bc5e/I2790/json/" + str(i) + "/" + str(i+999)
    print("---- progress {}/{} ----".format(i, 90608))
    
    res = requests.get(url)

    with open("./food_nutrition_DB_total.json", "a", encoding='UTF-8') as f:
        f.write(res.text)
