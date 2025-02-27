// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyA_YZ4zHssWbXrk1Jn1-xZ9yrEbW8qJzaI",
  authDomain: "parent-education-style-test.firebaseapp.com",
  databaseURL: "https://parent-education-style-test-default-rtdb.firebaseio.com",
  projectId: "parent-education-style-test",
  storageBucket: "parent-education-style-test.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890abcdef123456"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// 데이터베이스 참조 생성
const database = firebase.database();
