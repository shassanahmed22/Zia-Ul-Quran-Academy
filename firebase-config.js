// Firebase Configuration and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5lysz9duEX_jW8pnbP_Q9C_IIlbVqm0g",
  authDomain: "zia-ul-quran-aa426.firebaseapp.com",
  projectId: "zia-ul-quran-aa426",
  storageBucket: "zia-ul-quran-aa426.firebasestorage.app",
  messagingSenderId: "987013750880",
  appId: "1:987013750880:web:3a0a572ba1c92e9390e305",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

console.log("[v0] Firebase initialized successfully!")

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] DOM loaded, looking for forms...")

  // Check if Firebase is properly initialized
  try {
    console.log("[v0] Auth instance:", auth)
    console.log("[v0] Firestore instance:", db)
  } catch (error) {
    console.error("[v0] Firebase initialization error:", error)
  }

  // ============================================
  // REGISTRATION FORM HANDLER
  // ============================================
  const registerForm = document.getElementById("registerForm")

  if (registerForm) {
    console.log("[v0] Register form found!")

    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      console.log("[v0] Register form submitted!")

      // Get form elements
      const nameEl = document.getElementById("studentName")
      const emailEl = document.getElementById("studentEmail")
      const phoneEl = document.getElementById("studentPhone")
      const zoomIdEl = document.getElementById("zoomId")
      const countryEl = document.getElementById("country")
      const genderEl = document.querySelector('input[name="gender"]:checked')

      console.log("[v0] Form elements:", { nameEl, emailEl, phoneEl, zoomIdEl, countryEl, genderEl })

      // Check if all elements exist
      if (!nameEl || !emailEl || !phoneEl || !zoomIdEl || !countryEl) {
        console.error("[v0] Some form elements not found!")
        alert("Form error. Please refresh the page.")
        return
      }

      // Get values
      const name = nameEl.value.trim()
      const email = emailEl.value.trim()
      const phone = phoneEl.value.trim()
      const zoomId = zoomIdEl.value.trim()
      const country = countryEl.value
      const gender = genderEl ? genderEl.value : ""

      console.log("[v0] Form values:", { name, email, phone, zoomId, country, gender })

      // Validate
      if (!name) {
        alert("Please enter your name")
        return
      }
      if (!email) {
        alert("Please enter your email")
        return
      }
      if (!phone) {
        alert("Please enter your phone number")
        return
      }
      if (!zoomId) {
        alert("Please enter your Zoom ID")
        return
      }
      if (!country) {
        alert("Please select your country")
        return
      }
      if (!gender) {
        alert("Please select your gender (Male or Female)")
        return
      }

      const submitBtn = registerForm.querySelector('button[type="submit"]')
      const originalBtnText = submitBtn.textContent

      try {
        submitBtn.disabled = true
        submitBtn.textContent = "Processing..."
        console.log("[v0] Creating user in Firebase Auth...")

        // Generate random password
        const password = Math.random().toString(36).slice(-8) + "Aa1!"
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        console.log("[v0] User created, saving to Firestore...")

        // Save student data to Firestore
        await setDoc(doc(db, "students", user.uid), {
          name,
          email,
          phone,
          zoomId,
          country,
          gender,
          createdAt: new Date().toISOString(),
          status: "active",
        })

        console.log("[v0] Student registered successfully!")
        alert("Registration successful! Thank you for registering.")
        registerForm.reset()
      } catch (error) {
        console.error("[v0] Registration error:", error)

        if (error.code === "auth/email-already-in-use") {
          alert("This email is already registered!")
        } else if (error.code === "auth/invalid-email") {
          alert("Please enter a valid email address")
        } else if (error.code === "auth/weak-password") {
          alert("Password is too weak")
        } else {
          alert("Registration failed: " + error.message)
        }
      } finally {
        submitBtn.disabled = false
        submitBtn.textContent = originalBtnText
      }
    })
  } else {
    console.error("[v0] Register form NOT found!")
  }

  // ============================================
  // CONTACT FORM HANDLER
  // ============================================
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    console.log("[v0] Contact form found!")

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      console.log("[v0] Contact form submitted!")

      const nameEl = document.getElementById("contactName")
      const emailEl = document.getElementById("contactEmail")
      const messageEl = document.getElementById("contactMessage")

      if (!nameEl || !emailEl || !messageEl) {
        console.error("[v0] Contact form elements not found!")
        alert("Form error. Please refresh the page.")
        return
      }

      const name = nameEl.value.trim()
      const email = emailEl.value.trim()
      const message = messageEl.value.trim()

      if (!name) {
        alert("Please enter your name")
        return
      }
      if (!email) {
        alert("Please enter your email")
        return
      }
      if (!message) {
        alert("Please enter your message")
        return
      }

      // Format WhatsApp message
      const whatsappNumber = "923145300399"
      const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

      // Open WhatsApp in new tab
      window.open(whatsappURL, "_blank")

      // Reset form and show success message
      contactForm.reset()
      alert("Redirecting to WhatsApp...")
    })
  } else {
    console.error("[v0] Contact form NOT found!")
  }
})

export { app, auth, db }
