import imaplib
import email
from email.header import decode_header, make_header

while True:
    try:
        
        user_email = input("Enter Email address: ")
        user_password = input("Enter Password: ")
        box = imaplib.IMAP4_SSL('imap.'+user_email.split('@')[1], 993)
        
        if("naver.com" in user_email):
            user_email = user_email.split("@")[0]
        box.login(user_email, user_password)
        

    except:
        print("Error Occured. Try again.")
    
    else:
        break

box.select('Inbox')

typ, data = box.search(None, 'ALL')

res, search_data = box.uid('search',None, 'ALL')
all_email = search_data[0].split()
split_data = data[0].split()
split_data.reverse()
all_email.reverse()



email_list = []
print("fetching email")
for n, mail in enumerate(all_email):
    res, mail_data = box.uid('fetch', mail, '(RFC822)')
    
    raw = mail_data[0][1]

    email_msg = email.message_from_bytes(raw)
    subject_= make_header(decode_header(str(email_msg['Subject'])))
    
    while True:
            try:
                subject_= make_header(decode_header(email_msg['Subject']))
                break
            except TypeError:
                subject_= make_header(decode_header(str(email_msg['Subject'])))
                break
    email_list.append(subject_)
    
print("fetch done", n)

while(True):
    for i, s in enumerate(email_list):
        print(i,":",s)

    user_input = int(input("삭제할 메일의 인덱스 입력: "))
    if(user_input < 0):
        break
    if(user_input > n):
        print(n,"이하의 정수를 입력하세요")
        continue
    print("삭제할 메일: ", email_list[user_input])
    box.store(split_data[user_input], '+FLAGS', '\\Deleted')
    box.expunge()
    del email_list[user_input]


box.expunge()
box.close()
box.logout()