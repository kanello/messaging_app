# Belay

### Anthony Kanellopoulos

---

## Setting up the app

### **Database**

1. Create database: `cd server_side` then `sqlite3 belay.db`
2. Create tables: run `.read 20220318T000001-create_db.sql`
3. [Optional] Insert fake data `.read 20220318T00002-test_data.sql`

### **Back End / Server Side**

- `cd server_side` then run `app.py`
- please make sure you run from inside `server_side` otherwise it won't be able to find the database
- server is run on `http://127.0.0.1:5000/`

### **Front End**

- in second terminal
- `cd client` then run `npm start`
- Run React `npm run`

---

### Current Noteworth Issues

Polling messages

- `setInterval` and `useEffect` go into a loop of calling a new get request to the server when a channel is clicked, but without closing off the previous get request loop. This causes concurrent get requests for different channels to be sent, resulting in messages from different channels getting displayed every loop recurrence. For now, I have commented out the `setInterval()` in `Channels.jsx` `lines 20, 30-31` and you will have to refresh the page to get new messages posted

Front End

- CSS box does not extend down to the whole screen when scrolling
- Grids not aligning well currently
- Images rendered look quite awkward
