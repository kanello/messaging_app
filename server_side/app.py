from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3 
import uuid


app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

#create database connection and create user tables
con = sqlite3.connect('belay.db', check_same_thread=False)
cur = con.cursor()

# cur.executescript('create_db.sql')
# #add fake data for now | switch off when done
# cur.executescript('.read test_data.sql')



@app.route('/credentials-check', methods=['POST'])
def credentials_check():
    """
    Credentials check. See if user has entered correct info

    Parameters
    request:
        - json object containing {username: username, password: hashed_password}

    Returns
    json object:
        - json string with success message
    """
    

    username =  request.json["username"] 
    password =  request.json["password"] 

    cur.execute(f"select user_password from users where user_name = '{username}';") #and password = '{password}'
    outcome = cur.fetchone()
    
    #outcome for some reason is a tuple, so return only first part
    if outcome[0] == password:
        return jsonify({"success":True, "message":f'Logged in, welcome back {username}'})
    
    return jsonify({"success":False, "message":f'user and pass combo not correct'})

@app.route('/create-user', methods=['POST'])
def create_user():
    """
    Create user

    Parameters
    request:
        - json object containing {username: username, password: hashed_password}

    Returns
    json object:
        - json object containing success or fail message
    """

    username =  request.json["username"] 
    password =  request.json["password"] 
    user_id = uuid.uuid4() #not sure how to ensure uniqueness of passwords otherwise

    #check that user doesn't exist
    cur.execute(f"select count(*) from users where user_name = '{username}';") 
    outcome = cur.fetchone()

    #check username is "clear"
    if outcome[0] == 0:

        cur.execute(f"insert into users (user_id, user_name, user_password) values ('{user_id}', '{username}', '{password}');")
        
        #need this here for the data to persist, otherwise it gets dumped
        con.commit()

        return jsonify({"success":True, "message":f'Successfully created {username}'})
    
    return jsonify({"success":False, "message":f'{username} is taken'})
        
@app.route('/create-channel', methods=['POST'])
def create_channel():
    """
    Create channel

    Parameters
    request:
        - json object containing {channel: channel_name}

    Returns
    json object:
        - json object containing success or fail message
    """

    channel_id = uuid.uuid4() #not sure how to ensure uniqueness of passwords otherwise
    channel_name =  request.json["channel_name"] 
    

    #check that user doesn't exist
    cur.execute(f"select count(*) from channels where channel_name = '{channel_name}';") 
    outcome = cur.fetchone()

    #check username is "clear"
    if outcome[0] == 0:

        cur.execute(f"insert into channels (channel_id, channel_name) values ('{channel_id}', '{channel_name}');")
        
        #need this here for the data to persist, otherwise it gets dumped
        con.commit()

        return jsonify({"success":True, "message":f'Successfully created {channel_name}'})
    
    return jsonify({"success":False, "message":f'{channel_name} is taken'})
        
@app.route('/write-message', methods=['POST'])
def write_message():
    """
    Write message. Takes the json object passed through, autogenerates an id, timestamp and writes the message to the database, persisting the change.

    Timestamp is generated via the sql query => datetime('now')

    Parameters
    request:
        - json object containing {message: message_body, author_id:author_id, channel_id:channel_id}

    Returns
    json object:
        - json object containing success or fail message
    """

    msg_id = uuid.uuid4() #not sure how to ensure uniqueness of passwords otherwise
    message_body = request.json["message_body"]
    author_id = request.json["author_id"]
    channel_id =  request.json["channel_id"] 
    

    cur.execute(f"insert into messages (msg_id, message_body, sent_time, author_id, channel_id) values ('{msg_id}', '{message_body}', datetime('now'), '{author_id}', '{channel_id}');")
    
    #need this here for the data to persist, otherwise it gets dumped
    con.commit()

    return jsonify({"success":True, "message":f'wrote message id {msg_id}'})
    
@app.route('/get-channels', methods=['GET'])
def get_channels():
    """
    Gets all the available channels from the database and returns them as a json object

    Parameters
    None

    Returns
    json_object
        - channels: {channel_id:channel_name}
    """

    query = cur.execute("select * from channels order by channel_name desc;")
    channels = {}
    for row in query.fetchall():

        channels[str(row[0])]=row[1]
        

    return jsonify({'channels':channels})






# TODO: Create the API
@app.route('/<id>', methods=['GET'])
def home(id):
    
    users = ['tom', 'jerry']
    
    return jsonify(users,id)


if __name__ == '__main__':
    app.run()