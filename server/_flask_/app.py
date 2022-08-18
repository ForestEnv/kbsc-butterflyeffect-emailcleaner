# pip install flask
# pip install pandas
# pip install scikit-learn

from flask import Flask, jsonify, request,render_template
import pandas as pd
from email_module import count_inbox, fetch_emails
import json

app = Flask(__name__)

# 기본
@app.route('/test') 
def main():
    success_message = "flask connect"
    return jsonify({
        'success_message' : success_message
    })

# 연동 후 보관함 메일 수 return
@app.route('/count', methods = ['POST']) 
def count():
    try:
        req = request.get_json()
        emailList = []
        for em in req['Emails']:
            emailId = em['email_address']
            emailPw = em['password']
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
        result = fetch_emails(emailId , emailPw)
        classification = result.to_json(orient = 'index',force_ascii=False)
        return classification
    except Exception as e: 
        return jsonify({
            'fail_message' : 'fail_message'
        })

# 삭제
@app.route('/delete', methods = ['POST']) 
def delete():
    success_message = "flask connect"
    return jsonify({
        'success_message' : success_message
    })

if __name__ == "__main__":
    app.run(debug=True)