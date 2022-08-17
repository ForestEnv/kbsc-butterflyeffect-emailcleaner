#pip install flask

from flask import Flask, jsonify, request,render_template
import pickle
import pandas as pd
import os
from email_module import isEnglishOrKorean, count_inbox

PATH = os.getcwd()

eg_loaded_model = pickle.load(open(PATH + '/pkl/eg_model_NB.pkl', 'rb'))
eg_tdmvector = pickle.load(open(PATH + '/pkl/eg_tdmvector.pkl','rb')) 
eg_tfidf_transformer = pickle.load(open(PATH + '/pkl/eg_tfidf_transformer.pkl','rb'))
kr_loaded_model = pickle.load(open(PATH + '/pkl/kr_model_NB.pkl', 'rb'))
kr_tdmvector = pickle.load(open(PATH + '/pkl/kr_tdmvector.pkl','rb')) 
kr_tfidf_transformer = pickle.load(open(PATH + '/pkl/kr_tfidf_transformer.pkl','rb'))

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
        print("debugTEST1");
        req = request.get_json()
        print("FROM NODE:", req);
        print("debugTEST2");
        emailList = []
        for em in req['Emails']:
            emailId = em['email_address']
            emailPw = em['password']
            emailCount = count_inbox(emailId , emailPw)
            emailList.append({'email_address' : emailId , 'emailCount' : emailCount})
        result = {'success_message' : "flask connect", 'Result' : emailList}
        print("debugTEST3");

        return jsonify(result)
    except :
        return jsonify({
            'fail_message' : 'fail_message'
        })
                
# 이메일 분류
@app.route('/predict', methods=['POST']) 
def predict():

    data1 = request.form['a']
    test_email = [{'email_title' : data1}]
    df_test_email = pd.DataFrame(test_email)
    lang = isEnglishOrKorean(data1)
    print(lang)
    if lang == 'k':
        test_x_email = df_test_email['email_title']
        test_x_tdm = kr_tdmvector.transform(test_x_email)
        test_x_tfidfv = kr_tfidf_transformer.transform(test_x_tdm)
        pred = kr_loaded_model.predict(test_x_tfidfv)
    elif lang == 'e':
        test_x_email = df_test_email['email_title']
        test_x_tdm = eg_tdmvector.transform(test_x_email)
        test_x_tfidfv = eg_tfidf_transformer.transform(test_x_tdm)
        pred = eg_loaded_model.predict(test_x_tfidfv)
    return render_template('after.html', data= pred)

# 삭제
@app.route('/delete') 
def delete():
    success_message = "flask connect"
    return jsonify({
        'success_message' : success_message
    })

if __name__ == "__main__":
    app.run(debug=True)