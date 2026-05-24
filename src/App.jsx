import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function DreamyLoveWebsite() {
  const [letterOpen, setLetterOpen] = useState(false);
  const [scratchedNotes, setScratchedNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [unlockedQuestions, setUnlockedQuestions] = useState([1]);
  const [quizMessages, setQuizMessages] = useState({});
  const [revealedPhotos, setRevealedPhotos] = useState([]);

  const affirmations = [
    'you are my favorite notification ♡',
    "if loving you was a job, i'd be employee of the month",
    'you make even boring days feel like side quests',
    "i'd still choose you in every universe, every timeline",
    'you + me = suspicious amounts of happiness',
    'you are my emotional support human',
    'i hope your pillow is always cold on both sides',
    'certified cutest person award: you',
    "i like you more than fries... and that's serious",
    'every playlist secretly becomes about you',
    'you are literally my favorite plot twist',
    'i would share my last momo with you',
    'our lore is genuinely unmatched',
    "you make my brain go :')",
    'being obsessed with you is my full time hobby',
    'you are my favorite person to do absolutely nothing with',
    'i miss you even before you leave',
    'you make my inner child feel safe ♡',
    'i still get excited when your name pops up',
    'you are proof the universe can be nice sometimes',
    'everywhere feels softer with you around',
    'you are my cutest bad decision',
    'i hope we stay silly forever',
    'falling for you was actually so embarrassing of me',
    'you are my favorite hello and hardest goodbye',
    'i want to annoy you for the rest of my life',
    'you make even airports feel romantic',
    'you are the reason my screen time is so high',
    'you are basically a human comfort blanket',
    'i would still pick you in mario kart even if you steal boosts',
    'you make my heart do the zoomies',
    'our love language is sending each other dumb things online',
    'you are my prettiest coincidence',
    'i think we are painfully adorable',
    'you are my roman empire actually',
    'life with you feels like bonus content ♡',
  ];

  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);
  const [futureNotes, setFutureNotes] = useState([
    'watch the sunrise somewhere pretty',
    'adopt a dog, maybe three',
    'road trip with no plan',
    'dance in the kitchen at 2am',
    'grow old in a tiny house',
  ]);

  const loveLetter =
    'Welcome to our little universe. Every memory here is a piece of my favorite story - ours. I made this for you, for us, and for all the moments that made my heart yours.';

  // PHOTO SETUP FOR PUBLISHING:
  // In CodeSandbox / your website editor, create: public/images
  // Then upload photos with these exact names:
  // hero.jpg       -> big polaroid beside the envelope
  // city-you.jpg   -> left photo in the "wdym it's been a year?" section
  // city-me.jpg    -> right photo in the "wdym it's been a year?" section
  // together.jpg   -> center merged photo in that same section
  // 01.jpg to 05.jpg -> quiz photos revealed after each correct answer
  const photos = {
    hero: '/images/hero.jpg',
    cityYou: '/images/city-you.jpg',
    cityMe: '/images/city-me.jpg',
    together: '/images/together.jpg',
    quiz: {
      '01': '/images/01.jpg',
      '02': '/images/02.jpg',
      '03': '/images/03.jpg',
      '04': '/images/04.jpg',
      '05': '/images/05.jpg',
    },
  };

  const trail = [
    {
      number: '01',
      title:
        'In the first photo Chai shared with Shanky - what t-shirt was she wearing?',
      unlocked: true,
      options: [
        'a) Starry Night',
        'b) Spongebob Squarepants',
        'c) Not a t-shirt!',
        'd) People on her back',
      ],
      correctAnswer: 'b) Spongebob Squarepants',
      unlocks: 2,
      photoLabel: 'add photo 1',
    },
    {
      number: '02',
      title: 'What was the first museum Chai & Shanky visited together?',
      unlocked: unlockedQuestions.includes(2),
      options: [
        'a) The Louvre',
        'b) The Museum of Innocence',
        'c) Field Museum of Natural History',
        'd) MAP',
      ],
      correctAnswer: 'a) The Louvre',
      unlocks: 3,
      photoLabel: 'add photo 2',
    },
    {
      number: '03',
      title: 'What was the first movie Chai & Shanky watched together?',
      unlocked: unlockedQuestions.includes(3),
      options: [
        'a) Love at first sight',
        'b) Love at the airport',
        'c) Love in a transit',
        'd) Love actually',
      ],
      correctAnswer: 'a) Love at first sight',
      unlocks: 4,
      photoLabel: 'add photo 3',
    },
    {
      number: '04',
      title:
        'What was the color of the umbrella Chai & Shanky carried in Rome?',
      unlocked: unlockedQuestions.includes(4),
      options: ['a) Red', 'b) Orange', 'c) Yellow', 'd) Pink'],
      correctAnswer: 'd) Pink',
      unlocks: 5,
      photoLabel: 'add photo 4',
    },
    {
      number: '05',
      title: 'Where did Chai and Shanky tie a love lock?',
      unlocked: unlockedQuestions.includes(5),
      options: [
        'a) Ponte delle Sirenette',
        'b) Ponte Alda Merini',
        'c) Ponte della Chiesa',
        'd) Ponte della pasta',
      ],
      correctAnswer: 'b) Ponte Alda Merini',
      unlocks: null,
      photoLabel: 'add photo 5',
    },
  ];

  const toggleScratchNote = (note) => {
    setScratchedNotes((current) =>
      current.includes(note)
        ? current.filter((item) => item !== note)
        : [...current, note]
    );
  };

  const addFutureNote = () => {
    const trimmedNote = newNote.trim();
    if (!trimmedNote) return;
    setFutureNotes((current) => [trimmedNote, ...current]);
    setNewNote('');
  };

  const submitQuizAnswer = (item) => {
    const selectedAnswer = selectedAnswers[item.number];

    if (selectedAnswer === item.correctAnswer) {
      if (item.unlocks) {
        setUnlockedQuestions((current) =>
          current.includes(item.unlocks) ? current : [...current, item.unlocks]
        );
      }

      setRevealedPhotos((current) =>
        current.includes(item.number) ? current : [...current, item.number]
      );

      setQuizMessages((current) => ({
        ...current,
        [item.number]: 'correct!! ♡ shanky remembers the lore ✨',
      }));
    } else {
      setQuizMessages((current) => ({
        ...current,
        [item.number]: 'hmmmmm nope 😭 try again ♡',
      }));
    }
  };

  const FloralSprig = ({ className = '' }) => (
    <svg
      className={className}
      viewBox="0 0 140 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M66 282C62 234 72 205 61 161C49 116 59 79 45 26"
        stroke="#86AF84"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M61 199C38 186 24 166 17 141"
        stroke="#86AF84"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M64 153C90 140 107 117 113 90"
        stroke="#86AF84"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M57 108C35 95 24 73 17 49"
        stroke="#86AF84"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M69 236C93 222 110 201 118 175"
        stroke="#86AF84"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[
        [18, 141, '#F4B4BE'],
        [28, 128, '#F6D8A5'],
        [14, 113, '#E9C7E6'],
        [114, 90, '#F2A7B4'],
        [121, 77, '#F8D89D'],
        [101, 70, '#DCC7EF'],
        [17, 48, '#F4B0BB'],
        [29, 36, '#F7D79B'],
        [14, 24, '#EACDE7'],
        [118, 175, '#F2AFBB'],
        [127, 161, '#F8D89E'],
        [105, 152, '#DCC8EF'],
      ].map(([cx, cy, fill], i) => (
        <g key={`flower-${i}`}>
          <circle cx={cx} cy={cy} r="8" fill={fill} />
          <circle cx={cx} cy={cy} r="2.8" fill="#8B6A60" opacity="0.4" />
        </g>
      ))}
    </svg>
  );

  const Butterfly = ({ className = '' }) => (
    <svg
      className={className}
      viewBox="0 0 90 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M44 34C18 6 6 19 15 38C20 49 34 48 44 36"
        fill="#F3B8C2"
        stroke="#9F7068"
      />
      <path
        d="M46 34C72 6 84 19 75 38C70 49 56 48 46 36"
        fill="#E5CBF1"
        stroke="#9F7068"
      />
      <path
        d="M44 36C23 51 28 65 41 56C47 52 46 43 44 36"
        fill="#F7D58D"
        stroke="#9F7068"
      />
      <path
        d="M46 36C67 51 62 65 49 56C43 52 44 43 46 36"
        fill="#F5BAC5"
        stroke="#9F7068"
      />
      <path
        d="M45 27C44 40 45 52 46 61"
        stroke="#5B4037"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );

  const Ladybug = ({ className = '' }) => (
    <div className={className} aria-hidden="true">
      <div className="relative h-9 w-9 rounded-full bg-[#ef6a6f] shadow">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/30" />
        <div className="absolute -top-1 left-3 h-4 w-4 rounded-full bg-[#43312b]" />
        <div className="absolute left-2 top-4 h-1.5 w-1.5 rounded-full bg-black" />
        <div className="absolute right-2 top-5 h-1.5 w-1.5 rounded-full bg-black" />
      </div>
    </div>
  );

  const PhotoWithFallback = ({
    src,
    label,
    className,
    fallbackClassName = '',
  }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
      return (
        <div
          className={`flex items-center justify-center text-center text-rose-300 ${fallbackClassName}`}
        >
          {label}
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={label}
        onError={() => setHasError(true)}
        className={className}
      />
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fff8ef] text-[#543d35]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=DM+Serif+Display&family=Nunito:wght@300;400;500;700&display=swap');
        body { font-family: 'Nunito', sans-serif; }
        .hand { font-family: 'Caveat', cursive; }
        .serif { font-family: 'DM Serif Display', serif; }
        .paper-bg {
          background-color: #fff8ef;
          background-image:
            radial-gradient(rgba(191, 91, 111, 0.13) 0.8px, transparent 1px),
            radial-gradient(rgba(120, 88, 69, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(155, 118, 95, .045) 1px, transparent 1px),
            linear-gradient(rgba(155, 118, 95, .045) 1px, transparent 1px);
          background-position: 10px 12px, 0 0, 0 0, 0 0;
          background-size: 90px 90px, 18px 18px, 48px 48px, 48px 48px;
        }
        .paper-bg::before {
          content: "♡   ♡      ♡       ♡";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          color: rgba(210, 112, 132, 0.18);
          font-family: 'Caveat', cursive;
          font-size: 20px;
          letter-spacing: 92px;
          line-height: 150px;
          white-space: pre-wrap;
        }
        .paper-bg > * { position: relative; z-index: 1; }
        .paper-card {
          background: rgba(255, 252, 246, .76);
          border: 1px solid rgba(153, 112, 92, .14);
          box-shadow: 0 18px 60px rgba(128, 88, 67, .10);
          backdrop-filter: blur(8px);
        }
        .twinkle { animation: twinkle 3s ease-in-out infinite; }
        .left-photo { animation: leftMeet 5.5s ease-in-out infinite; }
        .right-photo { animation: rightMeet 5.5s ease-in-out infinite; }
        .join-photo { animation: joinPhoto 5.5s ease-in-out infinite; }
        .shrink-path { animation: shrinkPath 5.5s ease-in-out infinite; transform-origin: center; }
        .scratch-note::after {
          content: "";
          position: absolute;
          left: 16px;
          right: 16px;
          top: 50%;
          height: 16px;
          border-top: 4px solid rgba(120, 74, 67, 0.55);
          border-bottom: 3px solid rgba(210, 112, 132, 0.35);
          transform: rotate(-4deg) scaleX(0);
          transform-origin: left center;
          border-radius: 999px;
          opacity: 0;
          transition: transform 520ms ease, opacity 280ms ease;
        }
        .scratch-note.is-scratched::after { transform: rotate(-4deg) scaleX(1); opacity: 1; }
        .photo-shimmer {
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.65) 45%, rgba(255,255,255,0) 70%);
          animation: photoShimmer 2.8s ease-in-out infinite;
        }
        @keyframes photoShimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes twinkle { 0%,100% { opacity:.35; transform:scale(.9); } 50% { opacity:1; transform:scale(1.15); } }
        @keyframes leftMeet { 0%,25% { transform:translateX(0) rotate(-5deg); } 60%,76% { transform:translateX(190px) rotate(-1deg); } 100% { transform:translateX(0) rotate(-5deg); } }
        @keyframes rightMeet { 0%,25% { transform:translateX(0) rotate(5deg); } 60%,76% { transform:translateX(-190px) rotate(1deg); } 100% { transform:translateX(0) rotate(5deg); } }
        @keyframes joinPhoto { 0%,42% { opacity:0; transform:translate(-50%,-50%) scale(.82); } 60%,76% { opacity:1; transform:translate(-50%,-50%) scale(1); } 100% { opacity:0; transform:translate(-50%,-50%) scale(.82); } }
        @keyframes shrinkPath { 0%,25% { transform:scaleX(1); opacity:.9; } 60%,76% { transform:scaleX(.08); opacity:.25; } 100% { transform:scaleX(1); opacity:.9; } }
      `}</style>

      <main className="paper-bg relative min-h-screen">
        <nav className="sticky top-0 z-40 border-b border-[#ead8c9] bg-[#fff8ef]/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm lowercase">
            <div className="text-2xl text-purple-300">✿</div>
            <div className="hidden gap-10 md:flex">
              <a
                className="text-rose-400 underline underline-offset-8"
                href="#home"
              >
                home
              </a>
              <a href="#distance">our story</a>
              <a href="#quiz">memory trail</a>
              <a href="#future">adventures together</a>
            </div>
            <div className="rounded-full border border-[#d9c4c0] px-3 py-2">
              ♪
            </div>
          </div>
        </nav>

        <section
          id="home"
          className="relative mx-auto max-w-6xl px-6 pb-16 pt-12 md:min-h-[700px] md:px-8"
        >
          <FloralSprig className="absolute left-0 top-28 hidden h-72 w-36 md:block" />
          <Butterfly className="absolute right-10 top-24 h-14 w-16" />
          <Ladybug className="absolute left-14 top-[430px] hidden md:block" />
          <div className="twinkle absolute left-10 top-24 text-3xl text-yellow-400">
            ✧
          </div>
          <div className="twinkle absolute left-[45%] top-48 text-2xl text-yellow-400">
            ✦
          </div>
          <div className="twinkle absolute right-[18%] top-[22rem] text-xl text-yellow-400">
            ✧
          </div>

          <div className="grid items-start gap-8 md:grid-cols-[0.85fr_1.15fr]">
            <div className="pt-10 md:pl-14">
              <button
                type="button"
                aria-expanded={letterOpen}
                aria-label="Open love letter envelope"
                onClick={() => setLetterOpen((current) => !current)}
                className="relative h-[430px] w-full max-w-md bg-transparent text-left outline-none"
              >
                <p className="hand mb-5 text-center text-4xl text-rose-400">
                  click to open ♡
                </p>
                <motion.div
                  animate={
                    letterOpen
                      ? { y: -118, scale: 1.04, rotate: -1 }
                      : { y: 0, scale: 1, rotate: 0 }
                  }
                  transition={{ type: 'spring', stiffness: 110, damping: 15 }}
                  className={`absolute left-1/2 top-20 h-64 w-[88%] -translate-x-1/2 rounded-[2rem] border border-rose-100 bg-[#fff8f8] p-7 shadow-2xl ${
                    letterOpen ? 'z-50' : 'z-10'
                  }`}
                >
                  <h1 className="hand mb-3 text-6xl leading-none text-[#4f3932]">
                    hi love,
                  </h1>
                  <p className="mb-5 whitespace-pre-line text-[15px] leading-7 text-[#6a4a42]">
                    {loveLetter}
                  </p>
                  {letterOpen && (
                    <a
                      href="#distance"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-block rounded-full bg-rose-400 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-1 hover:bg-rose-500"
                    >
                      ready to relive them? ♡
                    </a>
                  )}
                </motion.div>
                <motion.div
                  animate={
                    letterOpen ? { rotateX: 165, y: -18 } : { rotateX: 0, y: 0 }
                  }
                  transition={{ duration: 0.75 }}
                  className="absolute left-1/2 top-44 z-30 h-28 w-[92%] origin-top -translate-x-1/2 rounded-t-3xl bg-[#f3aebc] shadow-lg"
                  style={{ clipPath: 'polygon(0 0,50% 100%,100% 0)' }}
                />
                <div className="absolute bottom-8 left-1/2 z-20 h-48 w-[92%] -translate-x-1/2 overflow-hidden rounded-3xl shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100" />
                  <div
                    className="absolute inset-0 bg-rose-300/70"
                    style={{
                      clipPath: 'polygon(0 0,50% 55%,100% 0,100% 100%,0 100%)',
                    }}
                  />
                  <Heart className="absolute bottom-14 left-1/2 h-10 w-10 -translate-x-1/2 fill-rose-500 text-rose-500" />
                </div>
              </button>
            </div>

            <div className="relative h-[500px]">
              <div className="absolute left-[16%] top-10 rotate-3 rounded-[5px] bg-white p-4 shadow-2xl">
                {/* ADD PHOTO HERE: upload public/images/hero.jpg */}
                <PhotoWithFallback
                  src={photos.hero}
                  label="your photo here ♡"
                  className="h-80 w-72 rounded-sm object-cover object-center"
                  fallbackClassName="h-80 w-72 rounded-sm bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100 text-lg"
                />
                <p className="hand mt-3 text-center text-3xl">you + me ♡</p>
              </div>
              <FloralSprig className="absolute right-0 top-14 hidden h-72 w-36 md:block" />
            </div>
          </div>
        </section>

        <section id="distance" className="relative px-6 py-10">
          <div className="paper-card relative mx-auto max-w-6xl overflow-hidden rounded-[28px] px-6 py-12 md:px-14">
            <FloralSprig className="absolute left-2 top-18 hidden h-56 w-28 scale-75 md:block" />
            <FloralSprig className="absolute right-0 top-20 hidden h-56 w-28 scale-75 md:block" />
            <div className="text-center">
              <h2 className="hand text-5xl text-[#4f3932] md:text-6xl">
                wdym it&apos;s been a year?
              </h2>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-[#6d554d]">
                no matter the city, my favorite place will always be closer to
                you.
              </p>
            </div>
            <div className="relative mx-auto mt-12 h-[300px] max-w-4xl">
              <div className="shrink-path absolute left-1/2 top-[42%] h-px w-[620px] -translate-x-1/2 border-t-2 border-dashed border-[#b87976]" />
              <div className="absolute left-1/2 top-[35%] -translate-x-1/2 text-4xl text-rose-400">
                ♥
              </div>
              <div className="left-photo absolute left-[7%] top-16 rounded bg-white p-3 shadow-xl">
                {/* ADD PHOTO HERE: upload public/images/city-you.jpg */}
                <PhotoWithFallback
                  src={photos.cityYou}
                  label="your city/photo"
                  className="h-32 w-36 rounded-sm object-cover object-center"
                  fallbackClassName="h-32 w-36 rounded-sm bg-[#f1e9df] text-sm text-[#9e7b70]"
                />
                <p className="hand mt-2 text-center text-2xl">you ♡</p>
              </div>
              <div className="right-photo absolute right-[7%] top-16 rounded bg-white p-3 shadow-xl">
                {/* ADD PHOTO HERE: upload public/images/city-me.jpg */}
                <PhotoWithFallback
                  src={photos.cityMe}
                  label="add your photo"
                  className="h-32 w-36 rounded-sm object-cover object-center"
                  fallbackClassName="h-32 w-36 rounded-sm bg-[#f1e9df] text-sm text-[#9e7b70]"
                />
                <p className="hand mt-2 text-center text-2xl">me ♡</p>
              </div>
              <div className="join-photo absolute left-1/2 top-[47%] z-20 rounded bg-white p-3 shadow-2xl">
                {/* ADD PHOTO HERE: upload public/images/together.jpg */}
                <PhotoWithFallback
                  src={photos.together}
                  label="one photo of us"
                  className="h-40 w-48 rounded-sm object-cover object-center"
                  fallbackClassName="h-40 w-48 rounded-sm bg-gradient-to-br from-pink-100 to-purple-100 text-rose-400"
                />
                <p className="hand mt-2 text-center text-2xl">
                  finally together ♡
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="quiz" className="relative px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="hand text-6xl text-[#4f3932] md:text-7xl">
                Our memory trail quiz
              </h2>
              <p className="mt-3 text-[#6d554d]">
                Let's play a game - answer each question to unlock the next
                memory
              </p>
            </div>

            <div className="space-y-7">
              {trail.map((item, index) => (
                <div
                  key={item.number}
                  className="paper-card relative overflow-hidden rounded-2xl p-5"
                >
                  <div className="absolute left-5 top-5 z-30 rounded-xl border border-rose-200 bg-[#fff8ef]/95 px-4 py-2 shadow-sm">
                    <span className="serif text-3xl text-rose-400">
                      {item.number}
                    </span>
                  </div>

                  {index === 0 && (
                    <Ladybug className="absolute -right-1 bottom-2 scale-75" />
                  )}

                  {!item.unlocked && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#fffaf4]/45 backdrop-blur-sm">
                      <div className="text-center text-[#5b4037]">
                        <div className="mb-2 text-3xl">□</div>
                        <p className="text-sm">answer the previous question</p>
                        <p className="text-sm">to unlock this memory ♡</p>
                      </div>
                    </div>
                  )}

                  <div
                    className={`grid gap-6 md:grid-cols-[210px_1fr] ${
                      !item.unlocked ? 'blur-sm opacity-50' : ''
                    }`}
                  >
                    <div className="rounded bg-white p-3 shadow-md">
                      <div className="relative h-36 overflow-hidden rounded-sm bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100">
                        <motion.div
                          animate={
                            revealedPhotos.includes(item.number)
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0.96 }
                          }
                          transition={{ duration: 0.55, ease: 'easeOut' }}
                          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-100 via-amber-50 to-purple-100 text-center text-sm text-rose-400"
                        >
                          {/* ADD QUIZ PHOTOS HERE: upload public/images/01.jpg, 02.jpg, 03.jpg, 04.jpg, 05.jpg */}
                          <PhotoWithFallback
                            src={photos.quiz[item.number]}
                            label="photo revealed ♡"
                            className="h-full w-full object-cover object-center"
                            fallbackClassName="h-full w-full bg-gradient-to-br from-rose-100 via-amber-50 to-purple-100 text-rose-400"
                          />
                        </motion.div>

                        <motion.div
                          animate={
                            revealedPhotos.includes(item.number)
                              ? { y: '-110%', rotate: -3 }
                              : { y: 0, rotate: 0 }
                          }
                          transition={{ duration: 0.75, ease: 'easeInOut' }}
                          className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100 text-center text-sm text-rose-300 shadow-inner"
                        >
  
                          <span className="photo-shimmer absolute inset-0" />
                        </motion.div>
                      </div>
                    </div>

                    <div>
                      <h3 className="serif mb-5 pl-20 text-3xl text-[#4f3932]">
                        {item.title}
                      </h3>

                      {item.unlocked && (
                        <div>
                          <div className="grid gap-3 sm:grid-cols-4">
                            {item.options.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() =>
                                  setSelectedAnswers((current) => ({
                                    ...current,
                                    [item.number]: option,
                                  }))
                                }
                                className={`rounded-lg border px-4 py-3 text-sm transition ${
                                  selectedAnswers[item.number] === option
                                    ? 'border-rose-400 bg-rose-100 text-rose-500 shadow-sm'
                                    : 'border-rose-200 bg-[#fffaf4]/80 hover:bg-rose-50'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>

                          <div className="mt-4 flex flex-col items-start gap-3">
                            <button
                              type="button"
                              onClick={() => submitQuizAnswer(item)}
                              className="rounded-lg bg-rose-400 px-8 py-3 font-bold text-white shadow-md transition hover:bg-rose-500"
                            >
                              submit →
                            </button>

                            {quizMessages[item.number] && (
                              <p
                                className={`hand text-3xl ${
                                  quizMessages[item.number].includes('correct')
                                    ? 'text-emerald-500'
                                    : 'text-rose-400'
                                }`}
                              >
                                {quizMessages[item.number]}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 w-max rounded-lg bg-[#efe2d1] px-10 py-3 text-center text-[#6d554d] shadow-sm">
              more memories coming soon... ✿
            </div>
          </div>
        </section>

        <section
          id="future"
          className="relative border-t border-[#ead8c9] px-6 py-20"
        >
          <FloralSprig className="absolute left-3 top-10 hidden h-52 w-28 scale-75 md:block" />
          <FloralSprig className="absolute right-6 top-10 hidden h-52 w-28 scale-75 md:block" />
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="hand text-6xl text-[#4f3932] md:text-7xl">
              infinite things to do together
            </h2>
            <p className="mt-2 text-[#6d554d]">
              dream it, add it, do it — together ♥
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                addFutureNote();
              }}
              className="mx-auto mt-9 flex max-w-3xl overflow-hidden rounded-lg border border-[#ead0ca] bg-white/55 shadow-sm"
            >
              <input
                value={newNote}
                onChange={(event) => setNewNote(event.target.value)}
                className="flex-1 bg-transparent px-5 py-4 text-sm outline-none"
                placeholder="add something we should do together..."
              />
              <button
                type="submit"
                className="bg-rose-400 px-8 py-4 font-bold text-white transition hover:bg-rose-500"
              >
                add ♥
              </button>
            </form>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-5">
              {futureNotes.map((note, index) => {
                const bg =
                  index === 0
                    ? 'bg-yellow-100 -rotate-[4deg]'
                    : index === 1
                    ? 'bg-purple-100 rotate-[3deg]'
                    : index === 2
                    ? 'bg-pink-100 -rotate-[2deg]'
                    : index === 3
                    ? 'bg-orange-100 rotate-[4deg]'
                    : 'bg-green-100 -rotate-[3deg]';
                const isScratched = scratchedNotes.includes(note);
                return (
                  <button
                    key={`${note}-${index}`}
                    type="button"
                    onClick={() => toggleScratchNote(note)}
                    className={`${bg} scratch-note ${
                      isScratched ? 'is-scratched opacity-60' : ''
                    } relative min-h-40 p-6 text-left shadow-lg transition duration-300 hover:-translate-y-1`}
                    aria-pressed={isScratched}
                  >
                    <p
                      className={`hand text-2xl leading-7 transition ${
                        isScratched ? 'text-[#5b4037]/60' : ''
                      }`}
                    >
                      {note}
                    </p>
                    <p className="absolute bottom-3 right-4 text-2xl text-[#5b4037]/60">
                      {isScratched ? 'done ♡' : '♡'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative border-t border-[#ead8c9] px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="hand text-6xl text-[#4f3932] md:text-7xl">
              the giggle machine ✿
            </h2>
            <p className="mt-2 text-[#6d554d]">
              romantic, silly, mildly unhinged affirmations 🦋 ✿
            </p>
            <div className="paper-card relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-[30px] p-10">
              <div className="absolute right-6 top-6 text-3xl text-rose-300">
                ♡
              </div>
              <p className="hand text-4xl leading-[1.4] text-[#5b4037]">
                {currentAffirmation}
              </p>
              <button
                type="button"
                onClick={() => {
                  const random =
                    affirmations[
                      Math.floor(Math.random() * affirmations.length)
                    ];
                  setCurrentAffirmation(random);
                }}
                className="mt-8 rounded-full bg-rose-400 px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-rose-500"
              >
                generate another 🦋
              </button>
            </div>
          </div>
        </section>

        <footer className="relative px-6 pb-24 pt-8 text-center">
          <p className="hand text-4xl text-[#5b4037]">
            thank you for being my favorite everything
          </p>
          <p className="hand mt-4 text-5xl text-rose-400 md:text-6xl">
            happy anniversary ♡
          </p>
          <p className="hand absolute bottom-0 right-6 text-2xl text-[#8f6e66]/80">
            love,
            <br />
            chai ♡
          </p>
        </footer>
      </main>
    </div>
  );
}
