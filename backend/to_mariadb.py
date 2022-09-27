import pymysql.cursors
import json
import os


conn = pymysql.connect(
    host='localhost',
    port=3307,
    user = 'root', 		 
    password = 'root',
    database = 'easylose',
	charset = 'utf8'
)


curs = conn.cursor()
print(curs)
with open('./data.json', encoding='utf-8') as json_file:
    json_data = json.load(json_file)["rows"]
    for line in json_data:
        
        values = []
        for k, v in line.items():
            if k == 'can_recommend':
                if v == 'false':
                    v = 0
                else:
                    v = 1
            values.append(v)

        sql = "INSERT INTO food(id, food_type, can_recommend, name, user_id, product_id, barcode,total_amount, calorie, carb,protein,  fat,  sugar,  salt, cholesterol,  saturated_fat, trans_fat ) VALUE (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

        curs.execute(sql, values)
        conn.commit()
