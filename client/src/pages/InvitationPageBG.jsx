import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

import woman from '../assets/woman.jpg';
import man from '../assets/man.jpg';
import bgTop from '../assets/bgTop.jpg';
import bgMiddle from '../assets/bgMiddle.jpg';
import bgEvent from '../assets/bgEvent.jpg';
import floralDivider from '../assets/floral-divider.png'; // Make sure this path is correct

const textVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6
    }
  })
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

const bounce = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Define the FloralDivider component
const FloralDivider = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="my-12 flex justify-center"
  >
    <img 
      src={floralDivider} 
      alt="floral divider" 
      className="h-16 opacity-70" 
      onError={(e) => {
        // Fallback if image fails to load
        e.target.style.display = 'none';
      }}
    />
  </motion.div>
);

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      className="flex justify-center gap-3 text-center text-[#3d2b1f] font-semibold mt-6"
    >
      {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
        <div 
          key={unit} 
          className="bg-white/70 backdrop-blur-sm border border-[#bfa99a] px-3 py-2 rounded-lg shadow-lg min-w-[70px]"
        >
          <div className="text-3xl sm:text-4xl font-bold text-[#5a3e36]">
            {String(timeLeft[unit] ?? '00').padStart(2, '0')}
          </div>
          <div className="text-xs uppercase tracking-wider mt-1 text-[#7a5c4d]">
            {unit}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

const ScrollButton = ({ targetId }) => {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      variants={bounce}
      initial="initial"
      animate="animate"
      onClick={scrollToSection}
      className="mt-12 bg-white/30 backdrop-blur-sm border border-white rounded-full p-4 text-white hover:bg-white/50 transition-all duration-300 focus:outline-none"
      aria-label="Scroll to next section"
    >
      <FaChevronDown className="text-2xl" />
    </motion.button>
  );
};

export default function InvitationPage() {
  const [params] = useSearchParams();
  const guestName = params.get('to') ?? 'Tamu Undangan';
  const eventDate = new Date('2025-06-06T08:00:00');
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && message) {
      setMessages(prev => [...prev, { name, message, date: new Date() }]);
      setName('');
      setMessage('');
    }
  };

  return (
    <div className="bg-[#fbf9f6] text-[#3d2b1f] font-serif overflow-hidden">
      {/* Full-Page Hero Section */}
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center text-white relative"
        style={{ backgroundImage: `url(${bgTop})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 px-4 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariant}
            className="text-5xl md:text-6xl font-bold mb-4 tracking-wider"
          >
            Undangan Pernikahan
          </motion.h1>
          
          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariant}
            className="text-xl md:text-2xl mb-8 font-light"
          >
            Kepada Yth. {guestName}
          </motion.p>
          
          <motion.p
            initial="hidden"
            animate="visible"
            custom={3}
            variants={textVariant}
            className="text-lg italic mb-12 max-w-2xl mx-auto"
          >
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."
            <br />(QS. Ar-Rum: 21)
          </motion.p>
          
          <Countdown targetDate={eventDate} />
          
          <ScrollButton targetId="couple-section" />
        </div>
      </section>

      <FloralDivider />

      {/* Couple Profile Section */}
      <section id="couple-section" className="py-20 text-center bg-[#fbf9f6]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-2 text-[#5a3e36]">Aufa & Rizky</h2>
            <p className="text-[#7a5c4d]">Akan melangsungkan pernikahan</p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12"
          >
            <div className="text-center">
              <div className="relative mx-auto w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#bfa99a] shadow-lg mb-4">
                <img src={woman} alt="Aufa" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-[#5a3e36]">Aufa Zahra</h3>
              <p className="text-[#7a5c4d]">Putri dari Bpk. Ahmad & Ibu Siti</p>
            </div>
            
            <div className="text-4xl text-[#bfa99a] font-light my-4 md:my-0">&</div>
            
            <div className="text-center">
              <div className="relative mx-auto w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#bfa99a] shadow-lg mb-4">
                <img src={man} alt="Rizky" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-[#5a3e36]">Rizky Pratama</h3>
              <p className="text-[#7a5c4d]">Putra dari Bpk. Budi & Ibu Ani</p>
            </div>
          </motion.div>
          
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
            className="text-lg max-w-2xl mx-auto text-[#5a3e36]"
          >
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan kami yang insya Allah akan dilaksanakan pada:
          </motion.p>
        </div>
      </section>

      <FloralDivider />

      {/* Event Details */}
      <section className="py-12 md:py-20 text-center relative bg-[#5a3e36] px-4">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariant}
            className="bg-white/90 rounded-lg p-6 md:p-8 shadow-lg max-w-md mx-auto"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#5a3e36]">Acara Pernikahan</h2>
            
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#7a5c4d] mb-1">Akad Nikah</h3>
                <p className="text-[#5a3e36]">Sabtu, 6 Juni 2025</p>
                <p className="text-[#5a3e36]">08.00 - 10.00 WIB</p>
                <p className="mt-1 text-sm text-[#7a5c4d]">Masjid Al-Hikmah</p>
                <p className="text-sm text-[#7a5c4d]">Jl. Kenangan Indah No. 123, Jakarta</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#7a5c4d] mb-1">Resepsi</h3>
                <p className="text-[#5a3e36]">Sabtu, 6 Juni 2025</p>
                <p className="text-[#5a3e36]">11.00 - 16.00 WIB</p>
                <p className="mt-1 text-sm text-[#7a5c4d]">Grand Ballroom Hotel Mawar</p>
                <p className="text-sm text-[#7a5c4d]">Jl. Kemerdekaan No. 456, Jakarta</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FloralDivider />

      {/* RSVP Section */}
      <section className="py-20 bg-[#fbf9f6]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#5a3e36]">Konfirmasi Kehadiran</h2>
            <p className="text-lg max-w-xl mx-auto text-[#7a5c4d]">
              Mohon konfirmasi kehadiran Anda sebelum 1 Juni 2025
            </p>
          </motion.div>
          
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border border-[#e1d4c9]">
            <form className="space-y-4">
              <div>
                <label className="block text-[#5a3e36] mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-[#d6c7bc] rounded focus:outline-none focus:ring-2 focus:ring-[#bfa99a]" 
                />
              </div>
              
              <div>
                <label className="block text-[#5a3e36] mb-1">Jumlah Hadir</label>
                <select className="w-full px-4 py-2 border border-[#d6c7bc] rounded focus:outline-none focus:ring-2 focus:ring-[#bfa99a]">
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang</option>
                  <option value="5">5 Orang</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[#5a3e36] mb-1">Konfirmasi Kehadiran</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="attendance" value="yes" className="text-[#bfa99a]" />
                    <span className="ml-2">Hadir</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="attendance" value="no" className="text-[#bfa99a]" />
                    <span className="ml-2">Tidak Hadir</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-[#5a3e36] mb-1">Ucapan (Opsional)</label>
                <textarea 
                  rows="3" 
                  className="w-full px-4 py-2 border border-[#d6c7bc] rounded focus:outline-none focus:ring-2 focus:ring-[#bfa99a]"
                ></textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-[#bfa99a] hover:bg-[#a99282] text-white px-6 py-3 rounded-lg shadow-md transition-colors duration-300"
              >
                Konfirmasi
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      <FloralDivider />

      {/* Wishes Section */}
      <section className="py-20 bg-[#f8f3ee]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#5a3e36]">Ucapan & Doa</h2>
            <p className="text-lg max-w-xl mx-auto text-[#7a5c4d]">
              Kirimkan doa dan ucapan terbaik Anda untuk kami
            </p>
          </motion.div>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2 border border-[#d6c7bc] rounded focus:outline-none focus:ring-2 focus:ring-[#bfa99a]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Hubungan (Keluarga/Teman/Rekan)"
                    className="w-full px-4 py-2 border border-[#d6c7bc] rounded focus:outline-none focus:ring-2 focus:ring-[#bfa99a]"
                  />
                </div>
              </div>
              
              <textarea
                placeholder="Tulis ucapan dan doa Anda di sini..."
                rows="4"
                className="w-full mb-4 px-4 py-2 border border-[#d6c7bc] rounded focus:outline-none focus:ring-2 focus:ring-[#bfa99a]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="bg-[#bfa99a] hover:bg-[#a99282] text-white px-6 py-2 rounded shadow transition-colors duration-300"
              >
                Kirim Ucapan
              </motion.button>
            </form>
            
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border border-[#e1d4c9] rounded-lg p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[#5a3e36]">{msg.name}</h4>
                    <span className="text-xs text-[#7a5c4d]">
                      {new Date(msg.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-[#6f5846]">{msg.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#5a3e36]">Lokasi Acara</h2>
            <p className="text-lg max-w-xl mx-auto text-[#7a5c4d]">
              Temukan lokasi resepsi pernikahan kami
            </p>
          </motion.div>
          
          <div className="rounded-xl overflow-hidden shadow-xl border border-[#e1d4c9] max-w-4xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507824!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b462cb9b3a503de!2sHotel%20Mawar!5e0!3m2!1sen!2sid!4v1621234567890!5m2!1sen!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-[#f8f3ee]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#5a3e36]">Galeri Kami</h2>
            <p className="text-lg max-w-xl mx-auto text-[#7a5c4d]">
              Kenangan indah kami bersama
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer"
              >
                <img
                  src={`https://images.pexels.com/photos/11184004/pexels-photo-11184004.jpeg,${item}`}
                  alt={`Gallery ${item}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#3d2b1f] text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Aufa & Rizky</h3>
            <p className="mb-6">06.06.2025</p>
            
            <div className="flex justify-center gap-4 mb-6">
              <a href="#" className="hover:text-[#bfa99a] transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="hover:text-[#bfa99a] transition-colors duration-300">
                <span className="sr-only">WhatsApp</span>
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
            </div>
            
            <p className="text-sm text-[#bfa99a]">
              &copy; 2025 Undangan Pernikahan Aufa & Rizky. All Rights Reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}