import app from 'firebase/app'
import auth from 'firebase/auth'
import storage from 'firebase/storage'

const Plugin = {
	install(Vue){
		app.initializeApp({
			apiKey: "AIzaSyAVtROWacifsqk8SfyUipkhB0QU5WqNcqs",
			authDomain: "farmzghana.firebaseapp.com",
			projectId: "farmzghana",
			storageBucket: "farmzghana.appspot.com",
			messagingSenderId: "438107731674",
			appId: "1:438107731674:web:59391e25c49f40556b17e3",
			measurementId: "G-S0QWN0H6G2"
		})
		Vue.prototype.$firebase = app
	}
}

export default Plugin
