# pip install flask
# pip install pandas
# pip install scikit-learn

from flask import Flask, jsonify, request, make_response
import pandas as pd
from email_module import link_inbox, count_inbox, fetch_emails, delete_email

app = Flask(__name__)

# 기본
@app.route('/test') 
def main():
    success_message = "flask connect"
    return jsonify({
        'success_message' : success_message
    })

# 연동 확인 후 성공여부 return
@app.route('/link', methods = ['POST']) 
def link():
    try:
        req = request.get_json()
        print(req)
        emailId = req['Emails']['email_address']
        emailPw = req['Emails']['password']
        print(emailId)
        print(emailPw)
        success_message = link_inbox(emailId , emailPw)
        result = {'success_message' : success_message}
        return jsonify(result)
    except :
        return jsonify({
            'fail_message' : 'fail_message' # node에서 데이터가 제대로 전송 안되면
        })


# 연동 후 보관함 메일 수 return
@app.route('/count', methods = ['POST']) 
def count():
    try:
        req = request.get_json()
        print(req)
        emailList = []
        for em in req['Emails']:
            emailId = em['email_id']
            emailPw = em['email_Pw']
            emailCount = count_inbox(emailId , emailPw)
            emailList.append({'email_address' : emailId , 'emailCount' : emailCount})
        result = {'success_message' : "flask connect", 'Result' : emailList}

        return jsonify(result)
    except :
        return jsonify({
            'fail_message' : 'fail_message'
        })
                
# 이메일 분류
@app.route('/predict', methods=['POST']) 
def predict():
    try:
        req = request.get_json()
        emailId = req['Emails']['email_address']
        emailPw = req['Emails']['password']
        print(emailPw)
        result = fetch_emails(emailId , emailPw)
        classification = result.to_json(orient = 'index',force_ascii=False)
        res = make_response(classification)
        return res
    except Exception as e: 
        return jsonify({
            'fail_message' : 'fail_message'
        })

# 삭제
@app.route('/delete', methods = ['POST']) 
def delete():
    try:
        req = request.get_json()
        print(req)
        email_address = req['Emails']['email_address']
        password = req['Emails']['password']
        emailList = req['Emails']['list']
        email_no = req['Emails']['email_no']
        result, lenEmail, emailRsult = delete_email(email_address , password , emailList,email_no)
        data = {'success' : result, "emailLen" : lenEmail, 'Emails': emailRsult}
        res = make_response(data)
        return res
    except Exception as e: 
        return jsonify({
            'fail_message' : 'fail_message'
        })

if __name__ == "__main__":
    app.run(debug=True)