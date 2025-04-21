import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

import woman from '../assets/woman.jpg';
import man from '../assets/man.jpg';
import bgTop from '../assets/bgTop.jpg';
import bgMiddle from '../assets/bgMiddle.jpg';
import bgEvent from '../assets/bgEvent.jpg';
import floralDivider from '../assets/floral-divider.png';

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
      ease: 'easeInOut'
    }
  }
};

const bounce = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

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
      onError={(e) => { e.target.style.display = 'none'; }}
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

  return (
    <div className="bg-[#fbf9f6] text-[#3d2b1f] font-serif overflow-hidden">
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center text-white relative"
        style={{ backgroundImage: `url(${bgTop})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 px-4 text-center">
          <motion.h1 initial="hidden" animate="visible" custom={1} variants={textVariant} className="text-5xl md:text-6xl font-bold mb-4 tracking-wider">
            Undangan Pernikahan
          </motion.h1>
          <motion.p initial="hidden" animate="visible" custom={2} variants={textVariant} className="text-xl md:text-2xl mb-8 font-light">
            Kepada Yth. {guestName}
          </motion.p>
          <motion.p initial="hidden" animate="visible" custom={3} variants={textVariant} className="text-lg italic mb-12 max-w-2xl mx-auto">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri..."
            <br />(QS. Ar-Rum: 21)
          </motion.p>
          <Countdown targetDate={eventDate} />
          <ScrollButton targetId="couple-section" />
        </div>
      </section>

      <section className="h-[200px] md:h-[300px] bg-cover bg-center" style={{ backgroundImage: `url(${bgMiddle})` }}></section>

      <FloralDivider />

      <section id="couple-section" className="py-20 bg-[#fbf9f6] text-center">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={textVariant} className="mb-12">
            <h2 className="text-3xl font-bold mb-2 text-[#5a3e36]">Aufa & Rizky</h2>
            <p className="text-[#7a5c4d]">Akan melangsungkan pernikahan</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-center items-center gap-12"
          >
            <div className="text-center">
              <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-[#bfa99a] shadow-lg mb-4">
                <img src={woman} alt="Aufa" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-[#5a3e36]">Aufa Zahra</h3>
              <p className="text-[#7a5c4d]">Putri dari Bpk. Ahmad & Ibu Siti</p>
            </div>

            <div className="text-4xl text-[#bfa99a] font-light">&</div>

            <div className="text-center">
              <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-[#bfa99a] shadow-lg mb-4">
                <img src={man} alt="Rizky" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-[#5a3e36]">Rizky Pratama</h3>
              <p className="text-[#7a5c4d]">Putra dari Bpk. Budi & Ibu Ani</p>
            </div>
          </motion.div>
        </div>
      </section>

      <FloralDivider />

      <section className="py-12 md:py-20 text-center relative bg-cover bg-center text-white px-4" style={{ backgroundImage: `url(${bgEvent})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={textVariant} className="bg-white/90 rounded-lg p-6 md:p-8 shadow-lg max-w-md mx-auto text-[#5a3e36]">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Acara Pernikahan</h2>
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#7a5c4d] mb-1">Akad Nikah</h3>
                <p>Sabtu, 6 Juni 2025</p>
                <p>08.00 - 10.00 WIB</p>
                <p className="mt-1 text-sm text-[#7a5c4d]">Masjid Al-Hikmah</p>
                <p className="text-sm text-[#7a5c4d]">Jl. Kenangan Indah No. 123, Jakarta</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#7a5c4d] mb-1">Resepsi</h3>
                <p>Sabtu, 6 Juni 2025</p>
                <p>11.00 - 16.00 WIB</p>
                <p className="mt-1 text-sm text-[#7a5c4d]">Grand Ballroom Hotel Mawar</p>
                <p className="text-sm text-[#7a5c4d]">Jl. Kemerdekaan No. 456, Jakarta</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <FloralDivider />
      <section className="py-20 bg-[#fbf9f6] text-center">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-3xl font-bold text-[#5a3e36] mb-4">Kotak Hadiah</h2>
          <p className="text-[#7a5c4d] mb-6">Jika Anda ingin mengirimkan hadiah, kami akan sangat menghargainya.</p>
          <div className="bg-white border border-[#e1d4c9] rounded-lg p-6 shadow-md">
            <p className="text-[#5a3e36] font-semibold">BCA - 1234567890</p>
            <p className="text-[#7a5c4d] text-sm">a.n. Aufa Zahra</p>
            <hr className="my-4" />
            <p className="text-[#5a3e36] font-semibold">Mandiri - 9876543210</p>
            <p className="text-[#7a5c4d] text-sm">a.n. Rizky Pratama</p>
          </div>
        </div>
      </section>

      {/* Ucapan Selamat */}
      <FloralDivider />
      <section className="py-20 bg-[#f8f3ee] text-center">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-3xl font-bold text-[#5a3e36] mb-4">Ucapan & Doa</h2>
          <p className="text-[#7a5c4d] mb-6">Kirimkan ucapan atau doa terbaik Anda untuk kami.</p>
          <form className="space-y-4">
            <input type="text" placeholder="Nama Anda" className="w-full border border-[#d6c7bc] rounded px-4 py-2 focus:ring-[#bfa99a] focus:outline-none" />
            <textarea placeholder="Ucapan & doa..." className="w-full border border-[#d6c7bc] rounded px-4 py-2 focus:ring-[#bfa99a] focus:outline-none" rows="4"></textarea>
            <button className="w-full bg-[#bfa99a] hover:bg-[#a99282] text-white font-medium py-2 px-4 rounded shadow">Kirim</button>
          </form>
        </div>
      </section>

      {/* Galeri Pengantin */}
      <FloralDivider />
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#5a3e36] mb-4">Galeri Pengantin</h2>
          <p className="text-[#7a5c4d] mb-8">Kenangan indah kami bersama</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <img key={i} src={`https://source.unsplash.com/400x400/?wedding,couple,${i}`} alt={`Galeri ${i}`} className="w-full h-48 object-cover rounded-lg shadow-md" />
            ))}
          </div>
        </div>
      </section>

      {/* Promosi Web Penyedia */}
      <FloralDivider />
      <footer className="bg-[#3d2b1f] text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm">Website undangan ini dibuat dengan penuh cinta oleh <a href="https://contohwebwedding.id" target="_blank" className="text-[#bfa99a] underline">ContohWebWedding.id</a></p>
          <p className="text-xs text-[#bfa99a] mt-2">&copy; 2025 Aufa & Rizky</p>
        </div>
      </footer>
    </div>
  );
}
