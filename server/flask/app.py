from flask import Flask, render_template, request
import pickle
import pandas as pd

loaded_model = pickle.load(open('./eg_model_NB.pkl', 'rb'))
tdmvector = pickle.load(open('./tdmvector.pkl','rb')) 
tfidf_transformer = pickle.load(open('./tfidf_transformer.pkl','rb'))

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('home.html')

@app.route('/predict', methods=['POST'])
def home():

    data1 = request.form['a']
    test_email = [{'email_title' : data1}]
    df_test_email = pd.DataFrame(test_email)
    test_x_email = df_test_email['email_title']
    test_x_tdm = tdmvector.transform(test_x_email)
    test_x_tfidfv = tfidf_transformer.transform(test_x_tdm)
    pred = loaded_model.predict(test_x_tfidfv)
    return render_template('after.html', data= pred)

if __name__ == "__main__":
    app.run(debug=True)