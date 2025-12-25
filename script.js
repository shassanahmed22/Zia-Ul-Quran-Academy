// ===== CURRENT YEAR =====
document.getElementById("year").textContent = new Date().getFullYear()

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    })
})

// ===== TABS =====
const tabBtns = document.querySelectorAll(".tab-btn")
const tabPanes = document.querySelectorAll(".tab-pane")

tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"))
        tabPanes.forEach((p) => p.classList.remove("active"))

        btn.classList.add("active")
        const tabId = btn.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
    })
})

// ===== MOBILE MENU (FIXED) =====
const menuToggle = document.getElementById("menuToggle")
const nav = document.querySelector(".nav")

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")

    // ICON TOGGLE
    if (nav.classList.contains("active")) {
        menuToggle.innerHTML = "✖"
    } else {
        menuToggle.innerHTML = "☰"
    }
})

// ===== CLOSE MENU ON LINK CLICK =====
document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("active")
        menuToggle.innerHTML = "☰"
    })
})

// ===== CONTACT FORM → WHATSAPP =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value

    const whatsappNumber = "923135586040"

    const text = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    )

    alert("Thank you! Your message is being sent on WhatsApp.")
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank")
    this.reset()
})

// ===== REGISTER FORM =====
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault()
    alert("Registration submitted! We will contact you soon.")
    this.reset()
})

// ===== ACTIVE NAV ON SCROLL =====
window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id")
        }
    })

    document.querySelectorAll(".nav a").forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active")
        }
    })
})

// ===== WHATSAPP FLOATING CHAT =====
document.addEventListener("DOMContentLoaded", function () {
    const chatBtn = document.getElementById("whatsapp-chat")
    const popup = document.getElementById("whatsapp-popup")
    const closeBtn = document.getElementById("close-popup")
    const sendBtn = document.getElementById("send-whatsapp")
    const input = document.getElementById("whatsapp-input")

    const whatsappNumber = "923209619484"
    const websiteLink = "https://www.tumhariwebsite.com"

    chatBtn.onclick = () => {
        popup.style.display = popup.style.display === "block" ? "none" : "block"
    }

    closeBtn.onclick = () => {
        popup.style.display = "none"
    }

    sendBtn.onclick = () => {
        const msg = input.value.trim()
        if (!msg) {
            alert("Please write something first!")
            return
        }

        const finalMsg = `${msg}\n\nSent from: ${websiteLink}`
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMsg)}`
        window.open(url, "_blank")
        input.value = ""
    }
})
