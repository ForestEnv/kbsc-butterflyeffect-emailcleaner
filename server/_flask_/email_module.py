#전체 메일 개수 = count_inbox(메일주소, 비밀번호)
#전체 메일 데이터프레임 = fetch_emails(메일주소, 비밀번호)
#결과(성공시 'OK'), 삭제된 메일 개수, 삭제된 메일 데이터프레임 = delete_email(메일주소, 비밀번호, 삭제할 메일 인덱스 리스트)
import pandas as pd
import imaplib, email
from email.header import decode_header, make_header
import os
import pickle

PATH = os.getcwd()

eg_loaded_model = pickle.load(open(PATH + '/pkl/eg_model_NB.pkl', 'rb'))
eg_tdmvector = pickle.load(open(PATH + '/pkl/eg_tdmvector.pkl','rb')) 
eg_tfidf_transformer = pickle.load(open(PATH + '/pkl/eg_tfidf_transformer.pkl','rb'))
kr_loaded_model = pickle.load(open(PATH + '/pkl/kr_model_NB.pkl', 'rb'))
kr_tdmvector = pickle.load(open(PATH + '/pkl/kr_tdmvector.pkl','rb')) 
kr_tfidf_transformer = pickle.load(open(PATH + '/pkl/kr_tfidf_transformer.pkl','rb'))


def count_inbox(email_address, password):

    imap_host = 'imap.'+ email_address.split("@")[1]

    obj = imaplib.IMAP4_SSL(imap_host, 993)
    obj.login(email_address, password)
    obj.select('Inbox')

    _, data = obj.search(None, "ALL")
    
    obj.close()
    obj.logout()

    return len(data[0].split())

def fetch_emails(email_address, password):
    #imap login, fetch
    imap_host = 'imap.'+ email_address.split("@")[1]
    obj = imaplib.IMAP4_SSL(imap_host, 993)
    obj.login(email_address, password)
    obj.select('Inbox')

    _, all_data = obj.fetch('1:*' , '(RFC822)')
    obj.close()
    obj.logout()
    #Remove Bytes & Reverse
    all_data = all_data[0::2]
    all_data.reverse()
    df_mail_list = pd.DataFrame()
    
    #Parse Message
    for n, data in enumerate(all_data):
        email_message = email.message_from_bytes(data[1])

        date_ = make_header(decode_header(email_message["Date"]))
        from_ = make_header(decode_header(email_message["From"]))

        while True:
            try:
                subject_= make_header(decode_header(email_message['Subject']))
                break
            except TypeError:
                subject_= make_header(decode_header(str(email_message['Subject'])))
                break
        pred_ = emailClassification(subject_)
        '''
        body_ = ""

        for part in email_message.walk():
            if part.get_content_type() == "text/plain":
                body = part.get_payload(decode=True)
                email_data = body.decode()
                body_ += email_data + "\n"
            elif part.get_content_type() == "text/html":
                html_body = part.get_payload(decode=True)
                email_data = html_body.decode()
                body_ += email_data + "\n"
        '''
        #df = pd.DataFrame({"index": n, "date": str(date_), "subject": str(subject_), "sender": str(from_), "body": body_, "pred" : pred_}, index=[n])
        df = pd.DataFrame({"index": n, "date": str(date_), "subject": str(subject_), "sender": str(from_), "pred" : pred_}, index=[n])
        df_mail_list = pd.concat([df_mail_list, df])

    return df_mail_list

def emailClassification(subject_):
    test_email = [{'email_title' : str(subject_)}]
    df_test_email = pd.DataFrame(test_email)
    #print(df_test_email)
    lang = isEnglishOrKorean(str(subject_))
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
    else:
        pred = 0
    return pred

# 이메일 언어 분류
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

def delete_email(email_address, password, emailList):
    imap_host = 'imap.'+ email_address.split("@")[1]
    obj = imaplib.IMAP4_SSL(imap_host, 993)
    obj.login(email_address, password)
    obj.select('Inbox')

    #search email
    _, search_data = obj.search(None, 'ALL')
    all_email = search_data[0].split()
    all_email.reverse()
    #get email data
    mail_numbers = ""
    for n, i in enumerate(emailList):
        if(n != 0): 
            mail_numbers += ","
        mail_numbers += str(len(all_email) - i)
    
    _, all_data = obj.fetch(mail_numbers , '(RFC822)')

    #Remove Bytes & Reverse
    all_data = all_data[0::2]
    all_data.reverse()

    df_mail_list = pd.DataFrame()

    #Parse Message
    for n, data in enumerate(all_data):

        email_message = email.message_from_bytes(data[1])

        date_ = make_header(decode_header(email_message["Date"]))
        from_ = make_header(decode_header(email_message["From"]))

        while True:
            try:
                subject_= make_header(decode_header(email_message['Subject']))
                break
            except TypeError:
                subject_= make_header(decode_header(str(email_message['Subject'])))
                break
        '''
        body_ = ""

        for part in email_message.walk():
            if part.get_content_type() == "text/plain":
                body = part.get_payload(decode=True)
                email_data = body.decode()
                body_ += email_data + "\n"
            elif part.get_content_type() == "text/html":
                html_body = part.get_payload(decode=True)
                email_data = html_body.decode()
                body_ += email_data + "\n"
          '''    
        #df = pd.DataFrame({"index": n, "date": str(date_), "subject": str(subject_), "sender": str(from_), "body": body_}, index=[n])
        df = pd.DataFrame({"index": n, "date": str(date_), "subject": str(subject_), "sender": str(from_)}, index=[n])
        df_mail_list = pd.concat([df_mail_list, df])
        emailRsult = df_mail_list.to_dict('records')
    #delete email
    for i in emailList:
        obj.store(all_email[i], '+FLAGS', '\\Deleted')
        pass

    res, deleted = obj.expunge()

    obj.close()
    obj.logout()
    
    return res, len(deleted), emailRsult
