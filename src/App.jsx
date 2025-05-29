import { useEffect, useState, useRef } from "react";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const chatContainerRef = useRef(null);

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Show welcome notification
  useEffect(() => {
    if (!isLoading) {
      const name = prompt("Siapa nama kamu?");
      setUserName(name || "Pengunjung");
      alert(`Selamat datang, ${name || "Pengunjung"}!`);
    }
  }, [isLoading]);

  const stories = [
    {
      title: "ANTAKA",
      cover: "https://files.catbox.moe/9z4sct.jpg", 
      pdfLink: "https://drive.google.com/file/d/1ADjxFfMPAjzhYy2PPHapPLafpRZAb1D-/view?usp=drivesdk",
    },
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: "user", text: chatInput };
    const aiResponse = getAIResponse(chatInput);

    setChatLog((prev) => [...prev, userMessage, aiResponse]);
    setChatInput("");
  };

  const getAIResponse = (message) => {
    message = message.toLowerCase();
    let reply = "";

    if (message.includes("hai") || message.includes("halo")) {
      reply = `Halo, ${userName}! Ada yang bisa saya bantu?`;
    } else if (message.includes("karya")) {
      reply = "Andhika memiliki beberapa cerita pendek dalam format PDF. Anda bisa lihat di menu Karya!";
    } else if (message.includes("profil")) {
      reply = "Andhika Januar Pratama, penulis muda dari Jawa Tengah. Usia 15 tahun. Sekolah di MTS Lantaboer.";
    } else if (message.includes("kontak")) {
      reply = "Anda bisa menghubungi Andhika via WhatsApp atau email. Detailnya ada di menu Kontak.";
    } else {
      reply = "Maaf, saya belum bisa memahami itu. Coba tanyakan sesuatu tentang profil, karya, atau kontak.";
    }

    return { role: "ai", text: reply };
  };

  const MenuButton = ({ name, label }) => (
    <button
      onClick={() => setActiveMenu(name)}
      className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
        activeMenu === name
          ? "bg-purple-500 text-white shadow-glow"
          : "text-gray-300 hover:bg-purple-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="min-h-screen bg-black text-gray-100 font-sans">
          {/* Neon Glow CSS */}
          <style>{`
            @keyframes flicker {
              0%, 18%, 22%, 25%, 53%, 57%, 100% {
                opacity: 1;
              }
              20%, 24%, 55% {
                opacity: 0.4;
              }
            }
            .shadow-glow {
              box-shadow: 0 0 10px #a855f7, 0 0 20px #c084fc; 
              animation: flicker 2s infinite;
            }
            .float {
              animation: floatBook 6s ease-in-out infinite;
            }
            @keyframes floatBook {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
          `}</style>

          {/* Navigation Bar */}
          <nav className="p-6 flex justify-between items-center border-b border-purple-700">
            <h1 className="text-2xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Andhika Januar Pratama
            </h1>
            <div className="flex space-x-4">
              <MenuButton name="home" label="Beranda" />
              <MenuButton name="profile" label="Profil" />
              <MenuButton name="karya" label="Karya" />
              <MenuButton name="kontak" label="Kontak" />
              <MenuButton name="chat" label="Chat AI" />
            </div>
          </nav>

          {/* Main Content */}
          <main className="container mx-auto p-6">
            {activeMenu === "home" && (
              <section className="text-center">
                <h2 className="text-4xl font-extrabold mb-4 neon-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
                  Selamat Datang di Dunia Cerita Digital!
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Nikmati cerpen saya dalam format PDF yang bisa dibaca dan diunduh kapan saja.
                </p>

                <a
                  href="https://whatsapp.com/channel/0029VbALx58E50UfOE5c0C2b" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  Join ke Saluran WhatsApp
                </a>
              </section>
            )}

            {activeMenu === "profile" && (
              <section className="max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src="https://files.catbox.moe/2ucirg.jpg" 
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-glow"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">Andhika Januar Pratama</h2>
                    <p>Penulis Muda & Penggemar Dunia Digital</p>
                    <p>Usia: 15 tahun</p>
                    <p>Asal: Jawa Tengah</p>
                    <p>Sekolah: MTS Lantaboer</p>
                    <p className="mt-2">
                      Saya adalah penulis muda yang suka menciptakan dunia fiksi dengan nuansa teknologi dan cyberpunk.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeMenu === "karya" && (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 p-4 rounded-lg border border-purple-700 hover:border-purple-500 transition-all shadow-glow float"
                  >
                    <img
                      src={story.cover}
                      alt={story.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-semibold">{story.title}</h3>
                    <a
                      href={story.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-purple-400 hover:text-purple-300"
                    >
                      Baca Cerpen (PDF)
                    </a>
                  </div>
                ))}
              </section>
            )}

            {activeMenu === "kontak" && (
              <section className="max-w-xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Kontak Saya</h2>
                <ul className="space-y-2">
                  <li>
                    📱 WhatsApp:{" "}
                    <a href="https://wa.me/6288980963797"  className="text-purple-400 hover:underline">
                      +62 889-8096-3797
                    </a>
                  </li>
                  <li>
                    📧 Email:{" "}
                    <a href="mailto:jahraatasya@gmail.com" className="text-purple-400 hover:underline">
                      jahraatasya@gmail.com
                    </a>
                  </li>
                  <li className="mt-4">
                    <h3 className="font-semibold">Ikuti Saya:</h3>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-blue-400 hover:text-blue-300">
                        Instagram
                      </a>
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        Facebook
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-300">
                        Twitter/X
                      </a>
                    </div>
                  </li>
                </ul>
              </section>
            )}

            {activeMenu === "chat" && (
              <section className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Chat dengan AI</h2>
                <div
                  ref={chatContainerRef}
                  className="bg-gray-900 p-4 h-96 overflow-y-scroll rounded border border-purple-700 mb-4"
                >
                  {chatLog.length === 0 && (
                    <div className="text-center text-gray-500 pt-10">
                      Mulailah percakapan dengan AI...
                    </div>
                  )}
                  {chatLog.map((msg, i) => (
                    <div key={i} className={`mb-3 ${msg.role === "user" ? "text-right" : ""}`}>
                      <span
                        className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                          msg.role === "user"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-800 text-gray-200"
                        }`}
                      >
                        {msg.text}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Tulis pesan..."
                    className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded"
                  >
                    Kirim
                  </button>
                </div>
              </section>
            )}
          </main>

          {/* Footer */}
          <footer className="p-6 text-center border-t border-purple-800 mt-12">
            <p>&copy; 2025 Andhika Januar Pratama | Powered by Cyberpunk Imagination</p>
          </footer>
        </div>
      )}
    </>
  );
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-400 text-2xl">📖</div>
        </div>
        <h1 className="text-3xl font-bold text-purple-400 mb-2">LOADING...</h1>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
        </div>
        <p className="mt-4 text-sm text-gray-400">Memuat dunia cerita digital untukmu...</p>
      </div>
    </div>
  );
}
