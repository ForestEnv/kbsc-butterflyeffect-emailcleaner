#pip install flask

from flask import Flask, render_template, request
import pickle
import pandas as pd

eg_loaded_model = pickle.load(open('./eg_model_NB.pkl', 'rb'))
eg_tdmvector = pickle.load(open('./eg_tdmvector.pkl','rb')) 
eg_tfidf_transformer = pickle.load(open('./eg_tfidf_transformer.pkl','rb'))
kr_loaded_model = pickle.load(open('./kr_model_NB.pkl', 'rb'))
kr_tdmvector = pickle.load(open('./kr_tdmvector.pkl','rb')) 
kr_tfidf_transformer = pickle.load(open('./kr_tfidf_transformer.pkl','rb'))

app = Flask(__name__)

#### 추후에 모듈화 필요 ####
def isEnglishOrKorean(input_s):
    k_count = 0
    e_count = 0
    o_count = 0
    if input_s != input_s:
        return "o"
    for c in input_s:
        if ord('가') <= ord(c) <= ord('힣'):
            k_count+=1
        elif ord('a') <= ord(c.lower()) <= ord('z'):
            e_count+=1
        else:
            o_count+=1
    if k_count>1:
        return "k"  # 한글
    elif e_count>1:
        return "e"  # 기타
    else:
        return "o"  # 영어

@app.route('/')
def main():
    return render_template('home.html')

@app.route('/predict', methods=['POST'])
def home():

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

if __name__ == "__main__":
    app.run(debug=True)