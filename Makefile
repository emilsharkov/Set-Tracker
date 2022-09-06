run-app:
	make app -j

app: app-server app-client

app-server:
	cd server && nodemon index.js
	
app-client:
	cd client && nodemon index.tsx