import { useState, useRef } from "react"
import { Moon, Sun, Github, Linkedin, Mail, Download, ExternalLink, CheckCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })

    // Clear error when user types
    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: "",
      })
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { name: "", email: "", message: "" }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
      valid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
      valid = false
    }

    setFormErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        "service_inpj4ma", // Replace with your EmailJS service ID
        "template_3c52egl", // Replace with your EmailJS template ID
        formRef.current,
        "SX9NS0uUz82EP_p8p", // Replace with your EmailJS public key
      )

      console.log("Email sent successfully:", result.text)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Error sending email:", error)
      alert("Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const skills = [
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
  ]
  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
        {/* Navigation */}
        <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 py-4 transition-all duration-300">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <a
              href="#home"
              className="text-2xl font-bold text-primary-600 dark:text-primary-400 hover:scale-105 transition-transform"
            >
              ARV's Portfolio
            </a>
            <div className="flex items-center gap-6">
              <a
                href="#about"
                className="hidden md:block hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                className="hidden md:block hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="hidden md:block hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="hidden md:block hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                Contact
              </a>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center animate-fade-in-up">
              <img
                src="/profile.jpg"
                alt="Aditya Raj Verma"
                className="w-40 h-40 rounded-full mx-auto mb-8 object-cover hover:scale-105 transition-transform duration-300 shadow-xl"
              />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                Aditya Raj Verma
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-6 animate-fade-in">
                Aspiring Web Developer
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in">
                Passionate about building responsive, user-centric web applications using modern technologies. Eager to
                apply creativity and technical expertise to deliver seamless and impactful digital experiences.
              </p>
              <a
                href="./assets/resume.pdf"
                download
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-500/25"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white animate-fade-in-up">About Me</h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <p className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                Hello! I'm Aditya, a recent Computer Science graduate with a passion for web development. My journey in
                coding started during my university years, where I discovered my love for creating user-friendly and
                visually appealing websites.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                I graduated from Indian Institute of Information Technology Kota with a Bachelor's degree in Computer
                Science and Engineering. During my studies, I focused on competitive programming, web technologies and
                modern development practices.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: "600ms" }}>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or enjoying outdoor photography. I believe in continuous learning and staying updated with the latest
                trends in web development.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white animate-fade-in-up">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Crypto Website",
                  description: "Real time crypto application using coinranking API and React,",
                  tech: ["React", "Ant-design", "REST API"],
                  github: "https://github.com/adityarajverma547/crypto-app",
                  demo: "https://clinquant-boba-9c3a7c.netlify.app/",
                },
                {
                  title: "Sign-Language Detection",
                  description: "Real-time Sign detection using CNN and MediaPipe",
                  tech: ["React", "TailwindCSS", "REST API"],
                  github: "#",
                  demo: "#",
                },
                {
                  title: "Task Manager",
                  description: "A responsive task management application with authentication",
                  tech: ["React", "Firebase", "TailwindCSS"],
                  github: "#",
                  demo: "#",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h3 className="text-xl font-bold mb-3 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary-100 dark:bg-gray-700 rounded-full text-sm text-primary-800 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Github className="w-5 h-5 mr-1" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-1" />
                      Demo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white animate-fade-in-up">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-20 h-20 p-4 rounded-xl bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <img
                      src={skill.icon || "/placeholder.svg"}
                      alt={skill.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="mt-3 text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-16 animate-fade-in-up">
              <h3 className="text-xl font-bold mb-6 dark:text-white text-center">Soft Skills</h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-center justify-center transform hover:translate-x-2 transition-transform">
                  • Problem Solving
                </li>
                <li className="flex items-center justify-center transform hover:translate-x-2 transition-transform">
                  • Team Collaboration
                </li>
                <li className="flex items-center justify-center transform hover:translate-x-2 transition-transform">
                  • Communication
                </li>
                <li className="flex items-center justify-center transform hover:translate-x-2 transition-transform">
                  • Time Management
                </li>
                <li className="flex items-center justify-center transform hover:translate-x-2 transition-transform">
                  • Adaptability
                </li>
                <li className="flex items-center justify-center transform hover:translate-x-2 transition-transform">
                  • Critical Thinking
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white animate-fade-in-up">Contact Me</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                {isSubmitted ? (
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Message Sent!</h3>
                    <p className="text-green-600 dark:text-green-300 mb-4">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name" // Important for EmailJS
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${formErrors.name ? "border-red-500 dark:border-red-500" : "dark:border-gray-700"} dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                        placeholder="Your Name"
                      />
                      {formErrors.name && <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email" // Important for EmailJS
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${formErrors.email ? "border-red-500 dark:border-red-500" : "dark:border-gray-700"} dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                        placeholder="adityarajv473@gmail.com"
                      />
                      {formErrors.email && <p className="mt-1 text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message" // Important for EmailJS
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${formErrors.message ? "border-red-500 dark:border-red-500" : "dark:border-gray-700"} dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                        placeholder="Your message..."
                      ></textarea>
                      {formErrors.message && <p className="mt-1 text-red-500 text-sm">{formErrors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Connect With Me</h3>
                  <div className="space-y-4">
                    <a
                      href="https://github.com/adityarajverma547"
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transform hover:translate-x-2 transition-all"
                    >
                      <Github className="w-6 h-6 mr-2" />
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/adityarajverma547"
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transform hover:translate-x-2 transition-all"
                    >
                      <Linkedin className="w-6 h-6 mr-2" />
                      LinkedIn
                    </a>
                    <a
                      href="mailto:adityarajv@gmail.com"
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transform hover:translate-x-2 transition-all"
                    >
                      <Mail className="w-6 h-6 mr-2" />
                      adityarajv473@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
            <p className="animate-fade-in">© 2025 Aditya Raj Verma. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App

