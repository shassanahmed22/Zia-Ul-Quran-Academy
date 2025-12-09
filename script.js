document.getElementById("year").textContent = new Date().getFullYear()

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

const tabBtns = document.querySelectorAll(".tab-btn")
const tabPanes = document.querySelectorAll(".tab-pane")

tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        // Remove active from all
        tabBtns.forEach((b) => b.classList.remove("active"))
        tabPanes.forEach((p) => p.classList.remove("active"))

        // Add active to clicked
        btn.classList.add("active")
        const tabId = btn.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
    })
})

const menuToggle = document.getElementById("menuToggle")
const nav = document.querySelector(".nav")

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
})

document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("active")
    })
})

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const whatsappNumber = "923135586040"; // apna number

    const text = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );

    alert("Thank you! Your message is being sent on WhatsApp.");

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
});


document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault()
    alert("Registration submitted! We will contact you soon.")
    this.reset()
})

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault()
    alert("Message sent! Thank you for reaching out.")
    this.reset()
})

window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
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

document.addEventListener("DOMContentLoaded", function () {
    const chatBtn = document.getElementById("whatsapp-chat");
    const popup = document.getElementById("whatsapp-popup");
    const closeBtn = document.getElementById("close-popup");
    const sendBtn = document.getElementById("send-whatsapp");
    const input = document.getElementById("whatsapp-input");

    // Apna WhatsApp number yahan daalein
    const whatsappNumber = "923135586040";

    // Apni website link
    const websiteLink = "https://www.tumhariwebsite.com"; // change this

    // Toggle popup
    chatBtn.onclick = () => {
        popup.style.display = popup.style.display === "block" ? "none" : "block";
    };

    // Close popup
    closeBtn.onclick = () => {
        popup.style.display = "none";
    };

    // Send message
    sendBtn.onclick = () => {
        const msg = input.value.trim();
        if (!msg) {
            alert("Please write something first!");
            return;
        }

        // Message + website link
        const finalMsg = `${msg}\n\nSent from: ${websiteLink}`;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMsg)}`;
        window.open(url, "_blank");
    };
});


