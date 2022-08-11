import imaplib
from email.header import decode_header, make_header
import email
import time
import json

t = 0

with open("./UserData.json", "r") as file:
    data = json.load(file)

imap_host = 'imap.'+data["Emails"][t]["domain"]

user_id = data["Emails"][t]["email_address"].split("@")[t] if "naver" in data["Emails"][t]["domain"] else data["Emails"][t]["email_address"]
user_pw = data["Emails"][t]["password"]

obj = imaplib.IMAP4_SSL(imap_host, 993)
obj.login(user_id, user_pw)
obj.select('Inbox')
print("Fetch")
start_time = time.time()
resp, data = obj.fetch('1:*' , '(RFC822.HEADER)')
print(f"Fetch Done {time.time()-start_time}sec")
email_list = []
for n, i in enumerate(data):
    if(n%2 == 1): continue
    raw_email = i[1]

    try:
        raw_email_string = raw_email.decode('euc-kr')
    except:
        raw_email_string = raw_email.decode('utf-8')

    email_msg = email.message_from_string(raw_email_string)

    #UnicodeDecodeError: 'euc_kr' codec can't decode byte 0x96 in position 18: illegal multibyte sequence
    try:
        subject_= make_header(decode_header(str(email_msg['Subject'])))
    except Exception as e:
        print(e)
        subject_= str(e)
        email_list.append(subject_)
        continue
    
    while True:
            try:
                subject_= make_header(decode_header(email_msg['Subject']))
                break
            except TypeError:
                subject_= make_header(decode_header(str(email_msg['Subject'])))
                break
    email_list.append(subject_)
    print(subject_)
print("DONE")

obj.close()
obj.logout()