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

id = 1
curs = conn.cursor()
print(curs)
with open('./food_recommend.json', encoding='utf-8') as json_file:
    json_data = json.load(json_file)["rows"]
    for line in json_data:
        c, p, f = 0, 0, 0
        for k, v in line.items():
            if k == "id":
                c, p, f = map(int, map(float, v.split(",")))
            if k == "value":
                value_list = list(map(int, v.split(",")))
                for val in value_list:
                    values = [id, c, p, f, val]
                    sql = "INSERT INTO recommend(id, carb, protein, fat, food_id) VALUE (%s, %s, %s, %s, %s)"
                    curs.execute(sql, values)
                    conn.commit()
                    id += 1

