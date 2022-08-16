#전체 메일 개수 = count_inbox(메일주소, 비밀번호)
#전체 메일 데이터프레임 = fetch_emails(메일주소, 비밀번호)
#결과(성공시 'OK'), 삭제된 메일 개수, 삭제된 메일 데이터프레임 = delete_email(메일주소, 비밀번호, 삭제할 메일 인덱스 리스트)
import pandas as pd
import imaplib, email
from email.header import decode_header, make_header

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
        
        df = pd.DataFrame({"index": n, "date": str(date_), "subject": str(subject_), "sender": str(from_), "body": body_}, index=[n])
        df_mail_list = pd.concat([df_mail_list, df])

    return df_mail_list

def delete_email(email_address, password, mail_list):
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
    for n, i in enumerate(mail_list):
        if(n != 0): 
            mail_numbers += ","
        mail_numbers += str(len(all_email) - i)
    
    print(mail_numbers)
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
        
        df = pd.DataFrame({"index": n, "date": str(date_), "subject": str(subject_), "sender": str(from_), "body": body_}, index=[n])
        df_mail_list = pd.concat([df_mail_list, df])

    #delete email
    for i in mail_list:
        #obj.store(all_email[i], '+FLAGS', '\\Deleted')
        pass

    res, deleted = obj.expunge()

    obj.close()
    obj.logout()

    return res, len(deleted), df_mail_list
