import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

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
    <div className="flex justify-center gap-3 text-center text-[#1f2d2e] font-semibold text-sm sm:text-xl mt-6">
      {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
        <div key={unit} className="bg-white/30 backdrop-blur-sm border border-white px-3 py-2 rounded-md shadow-md">
          <div className="text-2xl sm:text-3xl font-bold">{String(timeLeft[unit] ?? '00').padStart(2, '0')}</div>
          <div className="text-xs capitalize tracking-wide mt-1">{unit}</div>
        </div>
      ))}
    </div>
  );
};

export default function InvitationPage() {
  const [params] = useSearchParams();
  const guestName = params.get('to') ?? 'Guest';
  const eventDate = new Date('2025-06-06T08:00:00');

  return (
    <div className="bg-gradient-to-b from-[#d8e6e7] to-[#546f74] text-[#1f2d2e] font-sans">
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-[url('/bg-top.png')] bg-cover bg-no-repeat bg-center relative"
      >
        <p className="text-xs tracking-widest uppercase text-[#4a5c5e] mb-2">The Wedding of</p>
        <h1 className="text-4xl font-serif font-bold text-[#2c3e3f] mb-1">Aulia & Adibakti</h1>
        <span className="w-12 h-px bg-[#2c3e3f] mb-3" />
        <p className="text-sm mb-1 text-[#4a5c5e]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
        <h2 className="text-xl font-semibold text-[#2c3e3f]">{guestName}</h2>
        <p className="text-xs italic text-[#4a5c5e] mt-1">Dengan hormat, kami mengundang Anda untuk hadir di acara pernikahan kami.</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-10 bg-[url('/bg-middle.png')] bg-cover text-center"
      >
        <p className="text-sm mb-2">The Wedding of</p>
        <h1 className="text-3xl font-bold mb-4">Aulia & Adibakti</h1>
        <Countdown targetDate={eventDate} />
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="mt-6 bg-white px-4 py-2 rounded shadow"
        >
          Buka Undangan
        </motion.button>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-10 bg-[#e4e8e8] text-center flex flex-col gap-6 items-center"
      >
        <div className="w-60 rounded-3xl bg-white shadow-md p-6 border border-gray-200">
          <img src="/aulia.png" alt="Aulia" className="mx-auto w-24 h-24 rounded-full border-4 border-[#c5d8d9]" />
          <h2 className="mt-4 font-bold text-xl text-[#1f2d2e]">Aulia</h2>
          <p className="text-sm text-[#4a5c5e]">Lukmanul Hakim Tri Utami</p>
        </div>

        <div className="w-60 rounded-3xl bg-white shadow-md p-6 border border-gray-200">
          <img src="/adibakti.png" alt="Adibakti" className="mx-auto w-24 h-24 rounded-full border-4 border-[#c5d8d9]" />
          <h2 className="mt-4 font-bold text-xl text-[#1f2d2e]">Adibakti</h2>
          <p className="text-sm text-[#4a5c5e]">Pradana Sandika</p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-10 bg-[url('/bg-event.png')] bg-cover text-white text-center"
      >
        <h2 className="text-xl font-bold mb-4">Akad Nikah</h2>
        <p>6 Juni 2025, 08.00 WIB</p>
        <p>Jl. Kenangan No. 1, Bandung</p>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="mt-4 bg-white text-black px-4 py-2 rounded shadow"
        >
          Lihat Lokasi
        </motion.button>

        <h2 className="text-xl font-bold mt-8 mb-4">Resepsi</h2>
        <p>6 Juni 2025, 11.00 WIB</p>
        <p>Jl. Kenangan No. 1, Bandung</p>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="mt-4 bg-white text-black px-4 py-2 rounded shadow"
        >
          Lihat Lokasi
        </motion.button>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-10 bg-[#f8fafb] text-center"
      >
        <h2 className="text-xl font-bold">Wedding Gift</h2>
        <p className="text-sm max-w-md mx-auto mt-2">Doa restu Anda merupakan hadiah terbaik. Namun jika ingin memberikan tanda kasih...</p>
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="mt-4 p-4 bg-white inline-block rounded shadow"
        >
          <p className="font-bold">BCA</p>
          <p>1234567890</p>
          <p>a.n. Aulia</p>
        </motion.div>
      </motion.section>

      <footer className="py-6 bg-[#1f2d2e] text-white text-center">
        <p>&copy; 2025 Aulia & Adibakti</p>
        <p>Designed by Invidream</p>
      </footer>
    </div>
  );
}