  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
  } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyD5MHci3Zl_DMVhjG_3YDP9v_u0kMSXaFM",
    authDomain: "aifit-ff041.firebaseapp.com",
    projectId: "aifit-ff041",
    storageBucket: "aifit-ff041.appspot.com",
    messagingSenderId: "383396399714",
    appId: "1:383396399714:web:68219a70a2ebe8f6729f3b",
    measurementId: "G-HB50VSM746"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const formTitle = document.getElementById("formTitle");
  const formType = document.getElementById("formType");
  const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
  const form = document.getElementById("authForm");
  const submitBtn = document.getElementById("submitBtn");
  const googleBtn = document.getElementById("googleSignInBtn");

  let isSignUp = false;

  window.toggleForm = function () {
    isSignUp = !isSignUp;
    formTitle.textContent = isSignUp ? "Sign Up for AI Fit" : "Sign In to AI Fit";
    formType.value = isSignUp ? "Sign Up" : "Sign In";
    submitBtn.textContent = isSignUp ? "Sign Up" : "Sign In";
    confirmPasswordGroup.style.display = isSignUp ? "block" : "none";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword")?.value.trim();

    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";

    try {
      if (formType.value === "Sign Up") {
        if (password !== confirmPassword) {
          alert("❌ Passwords do not match.");
          resetBtn();
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Account created!");
        toggleForm();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("🎉 Login successful!");
        setTimeout(() => window.location.href = "Main.html", 1000);
      }
    } catch (err) {
      alert("❌ " + err.message);
    }

    resetBtn();
  });

  googleBtn.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert("🎉 Signed in as " + user.displayName);
      setTimeout(() => window.location.href = "Main.html", 1000);
    } catch (error) {
      alert("❌ Google Sign-In failed: " + error.message);
    }
  });

  function resetBtn() {
    submitBtn.disabled = false;
    submitBtn.textContent = isSignUp ? "Sign Up" : "Sign In";
  }

  window.sendResetEmail = async function () {
    const email = document.getElementById("email").value.trim();
    if (!email) {
      alert("⚠️ Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("📧 Password reset email sent. Check your inbox.");
    } catch (err) {
      alert("❌ " + err.message);
    }
  }