import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

import woman from '../assets/woman.jpg';
import man from '../assets/man.jpg';

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
    <div className="flex justify-center gap-3 text-center text-[#3d2b1f] font-semibold text-sm sm:text-xl mt-6">
      {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
        <div key={unit} className="bg-white/50 backdrop-blur-sm border border-[#bfa99a] px-3 py-2 rounded-md shadow-md">
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
    <div className="bg-[#fbf9f6] text-[#3d2b1f] font-serif">
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={textVariant}
        className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-[url('/bg-texture.png')] bg-repeat relative"
      >
        <motion.p custom={1} variants={textVariant} className="text-xs tracking-widest uppercase text-[#6f5846] mb-2">The Wedding of</motion.p>
        <motion.h1 custom={2} variants={textVariant} className="text-4xl font-extrabold text-[#3d2b1f] mb-1">Aufa & Rizky</motion.h1>
        <motion.span custom={3} variants={textVariant} className="w-12 h-px bg-[#3d2b1f] mb-3" />
        <motion.p custom={4} variants={textVariant} className="text-sm mb-1 text-[#6f5846]">Kepada Yth. Bapak/Ibu/Saudara/i</motion.p>
        <motion.h2 custom={5} variants={textVariant} className="text-xl font-semibold text-[#3d2b1f]">{guestName}</motion.h2>
        <motion.p custom={6} variants={textVariant} className="text-xs italic text-[#6f5846] mt-1">Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dalam acara pernikahan kami.</motion.p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-10 bg-[#efe8e0] text-center"
      >
        <p className="text-sm mb-2">Hitung Mundur Menuju Hari Bahagia</p>
        <Countdown targetDate={eventDate} />
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="mt-6 bg-[#bfa99a] text-white px-4 py-2 rounded shadow"
        >
          Buka Undangan
        </motion.button>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-10 bg-[#fbf9f6] text-center flex flex-col gap-6 items-center"
      >
        <div className="w-60 rounded-xl bg-white shadow-md p-6 border border-[#e1d4c9]">
          <img src={woman} alt="Aufa" className="mx-auto w-24 h-32 object-cover rounded-[1rem] border-4 border-[#c9b8ab]" />
          <h2 className="mt-4 font-bold text-xl text-[#3d2b1f]">Aufa</h2>
          <p className="text-sm text-[#6f5846]">Putri dari Bpk. Hadi & Ibu Sri</p>
        </div>

        <div className="w-60 rounded-xl bg-white shadow-md p-6 border border-[#e1d4c9]">
          <img src={man} alt="Rizky" className="mx-auto w-24 h-32 object-cover rounded-[1rem] border-4 border-[#c9b8ab]" />
          <h2 className="mt-4 font-bold text-xl text-[#3d2b1f]">Rizky</h2>
          <p className="text-sm text-[#6f5846]">Putra dari Bpk. Budi & Ibu Sari</p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-10 bg-[#f0eae4] text-[#3d2b1f] text-center"
      >
        <h2 className="text-xl font-bold mb-4">Akad Nikah</h2>
        <p>12 Juli 2025, 08.00 WIB</p>
        <p>Jl. Melati No. 2, Jakarta</p>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="mt-4 bg-[#bfa99a] text-white px-4 py-2 rounded shadow"
        >
          Lihat Lokasi
        </motion.button>

        <h2 className="text-xl font-bold mt-8 mb-4">Resepsi</h2>
        <p>12 Juli 2025, 11.00 WIB</p>
        <p>Jl. Melati No. 2, Jakarta</p>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="mt-4 bg-[#bfa99a] text-white px-4 py-2 rounded shadow"
        >
          Lihat Lokasi
        </motion.button>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-10 bg-[#fbf9f6] text-center"
      >
        <h2 className="text-xl font-bold">Wedding Gift</h2>
        <p className="text-sm max-w-md mx-auto mt-2">Doa restu Anda merupakan hadiah terbaik. Namun jika ingin memberikan tanda kasih, dapat melalui:</p>
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="mt-4 p-4 bg-white inline-block rounded shadow border border-[#e1d4c9]"
        >
          <p className="font-bold">BCA</p>
          <p>9876543210</p>
          <p>a.n. Aufa</p>
        </motion.div>
      </motion.section>

      <footer className="py-6 bg-[#3d2b1f] text-white text-center">
        <p>&copy; 2025 Aufa & Rizky</p>
        <p>Designed by UnityInvitation</p>
      </footer>
    </div>
  );
}
