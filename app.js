const form = document.querySelector('form');
const meetingInfo = document.querySelector('#meeting-info');
const apiKey = 'rAT2A_xCSzaJDUvnyXv-rQ';
const apiSecret = '6eYUGHeduQqzKMkW6Q3bJ1VwtCHfvyUXzInL';
const apiUrl = 'https://api.zoom.us/v2/users/me/meetings';
form.getElementById('Zoom-form').addEventListener('create-meeting-btn', createMeeting);

function Create Meeting(event){
	event.preventDefault();

	const topic = form.getElementById('topic').value;
	const date = form.getElementById('date').value;
	const startTime = form.getElementById('start-Time').value;
	const duration = form.getElementById('duration').value;
	const password = form.getElementById('password').value;

	const JWT Token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InJBVDJBX3hDU3phSkRVdm55WHYtclEiLCJleHAiOjE2Nzk5Mjk4MTQsImlhdCI6MTY3OTkyNDQxNn0.hWlRRen5Xbnx0qd2Kvzl2FZFUVrNEidqFkqraDAywvMCopy';


	const data = {
		topic: topic,
		type: 2,
		startTime: `${date}T${startTime}:00`,
		duration: duration,
		password: generatePassword(),
		settings: {
			host_video: true,
			participant_video: true,
			mute_upon_entry: false,
			auto_recording: 'none',
			waiting_room: false,
		}
	};

	axios.post(apiUrl,data,{
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${getAccessToken()}`,
			'Content-Type' :  'application/jsonwebtoken'
		},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(response => {
		const meetingId = response.data.id;
		const password = response.data.password;
	 document.getElementById('meeting-info').innerHTML = `<p>Meeting ID: ${response.id}</p>
	 <p>Password: ${response.password}</p> 
	 <p>Meeting created successfully!</p>`;
	})
	form.reset();
	.catch(error => console.error(error));
}

function generateToken(apiKey, apiSecret) {
	const payload = {
		iss: apiKey,
		exp: Math.floor(Date.now() / 1000) + 60
	};
	const token = jwt.sign(payload, apiSecret);
	return token;
}
function generatePassword() {
	//Generate a random password
	return Math.random().toString(36).subString(2,8);
}
const jwt = require('jsonwebtoken');

function getAccessToken() {
	const apiUrl = 'https://zoom.us/oauth/token';
	const body = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`;
	const headers = {
		'Content-Type' : 'application/x-www-form-urlencoded'
	};
	return 	axios.post(apiUrl,{
		method: 'POST',
		headers: headers,
		body: body
	})	
	.then(response => response.json())
	.then(response => response.access_token)
	.then(error => console.error(error));
}

function generatePassword() {
	const characters = '6eYUGHeduQqzKMkW6Q3bJ1VwtCHfvyUXzInL';
	let password = '';
	for (let i = 0; i < 8; i++) {
		password += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return password;
}