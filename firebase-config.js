// Firebase 설정
// 아래 설정 값을 Firebase 콘솔에서 확인한 실제 값으로 대체하세요
// Firebase 콘솔 > 프로젝트 설정 > 일반 > 내 앱 > Firebase SDK snippet > 구성
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "parent-education-style-test.firebaseapp.com",
  databaseURL: "https://parent-education-style-test-default-rtdb.firebaseio.com",
  projectId: "parent-education-style-test",
  storageBucket: "parent-education-style-test.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// 데이터베이스 참조 생성
const database = firebase.database();
