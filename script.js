// ============================================
// CURRENT YEAR
// ============================================
const yearElement = document.getElementById("year")
if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
}

// ============================================
// SMOOTH SCROLL
// ============================================
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

        // Close mobile menu after clicking link
        const nav = document.querySelector(".nav")
        const menuToggle = document.getElementById("menuToggle")
        if (nav && nav.classList.contains("active")) {
            nav.classList.remove("active")
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
        }
    })
})

// ============================================
// TABS FUNCTIONALITY
// ============================================
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

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById("menuToggle")
const nav = document.querySelector(".nav")

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active")

        // Toggle icon
        if (nav.classList.contains("active")) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>'
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
        }
    })
}

// ============================================
// CLOSE MENU ON LINK CLICK
// ============================================
document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
        if (nav && menuToggle) {
            nav.classList.remove("active")
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
        }
    })
})

// ============================================
// ACTIVE NAV ON SCROLL
// ============================================
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

// ============================================
// WHATSAPP FLOATING CHAT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    const chatBtn = document.getElementById("whatsapp-chat")
    const popup = document.getElementById("whatsapp-popup")
    const closeBtn = document.getElementById("close-popup")
    const sendBtn = document.getElementById("send-whatsapp")
    const input = document.getElementById("whatsapp-input")

    const whatsappNumber = "923209619484"
    const websiteLink = "https://ziaulquran.com"

    if (chatBtn) {
        chatBtn.onclick = () => {
            popup.style.display = popup.style.display === "block" ? "none" : "block"
            if (popup.style.display === "block") {
                input.focus()
            }
        }
    }

    if (closeBtn) {
        closeBtn.onclick = () => {
            popup.style.display = "none"
        }
    }

    if (sendBtn) {
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
            popup.style.display = "none"
        }
    }

    // Send message on Enter key
    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                sendBtn.click()
            }
        })
    }
})

// ============================================
// CLOSE POPUP ON OUTSIDE CLICK
// ============================================
window.addEventListener("click", (e) => {
    const popup = document.getElementById("whatsapp-popup")
    if (e.target === popup) {
        popup.style.display = "none"
    }
})

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.querySelector(".header")
let lastScroll = 0

if (header) {
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset

        if (currentScroll > 100) {
            header.classList.add("scrolled")
        } else {
            header.classList.remove("scrolled")
        }

        lastScroll = currentScroll
    })
}

console.log("Script.js loaded successfully!")
