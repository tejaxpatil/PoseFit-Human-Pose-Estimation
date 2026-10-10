// import { useState } from 'react'

// const stats = [
//   { label: 'TOTAL SQUATS', value: '12', detail: 'Repetitions completed' },
//   { label: 'LEFT KNEE', value: '92°', detail: 'Joint angle' },
//   { label: 'RIGHT KNEE', value: '95°', detail: 'Joint angle' },
//   { label: 'EXERCISE STATUS', value: 'Ready', detail: 'Waiting for workout' },
// ]

// function App() {
//   const [activeSection, setActiveSection] = useState('Dashboard')

//   const navItems = [
//     { name: 'Dashboard', icon: '◫' },
//     { name: 'How It Works', icon: '⌘' },
//     { name: 'About Project', icon: 'ⓘ' },
//   ]

//   return (
//     <div className="min-h-screen bg-[#090b10] text-slate-100 md:flex">
//       {/* Sidebar */}
//       <aside className="border-b border-white/10 bg-[#0d1018] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
//             P
//           </div>
//           <div>
//             <h1 className="text-xl font-bold">PoseFit</h1>
//             <p className="text-xs text-slate-500">Computer Vision</p>
//           </div>
//         </div>

//         <p className="mb-3 mt-9 text-xs font-semibold uppercase tracking-widest text-slate-500">
//           Workspace
//         </p>

//         <nav className="flex gap-2 md:flex-col">
//           {navItems.map((item) => (
//             <button
//               key={item.name}
//               onClick={() => setActiveSection(item.name)}
//               className={`flex flex-1 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition md:flex-none ${
//                 activeSection === item.name
//                   ? 'bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/20'
//                   : 'text-slate-400 hover:bg-white/5 hover:text-white'
//               }`}
//             >
//               <span>{item.icon}</span>
//               {item.name}
//             </button>
//           ))}
//         </nav>

//         <div className="mt-10 hidden rounded-xl border border-white/10 p-4 md:block">
//           <p className="text-sm font-medium">Mini Project</p>
//           <p className="mt-2 text-xs leading-5 text-slate-500">
//             Human Pose Estimation for Fitness Monitoring
//           </p>
//           <span className="mt-3 inline-block rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
//             ● System ready
//           </span>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
//         <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <p className="text-sm text-slate-500">PoseFit / {activeSection}</p>
//             <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
//               {activeSection === 'Dashboard'
//                 ? 'Fitness Dashboard'
//                 : activeSection}
//             </h2>
//             <p className="mt-2 text-sm text-slate-400">
//               Real-time human pose analysis and squat monitoring.
//             </p>
//           </div>
//           <div className="rounded-xl border border-white/10 bg-[#11151e] px-4 py-2 text-sm text-slate-300">
//             <span className="mr-2 text-emerald-400">●</span>
//             Local environment
//           </div>
//         </header>

//         {activeSection === 'Dashboard' && (
//           <>
//             {/* Statistics */}
//             <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//               {stats.map((stat) => (
//                 <div
//                   key={stat.label}
//                   className="rounded-2xl border border-white/10 bg-[#11151e] p-5"
//                 >
//                   <p className="text-xs font-semibold tracking-wider text-slate-500">
//                     {stat.label}
//                   </p>
//                   <p className="mt-4 text-3xl font-bold tracking-tight">
//                     {stat.value}
//                   </p>
//                   <p className="mt-2 text-xs text-slate-500">
//                     {stat.detail}
//                   </p>
//                 </div>
//               ))}
//             </section>

//             {/* Monitor and information */}
//             <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
//               <div className="rounded-2xl border border-white/10 bg-[#11151e] p-5 xl:col-span-2">
//                 <div className="flex flex-wrap items-center justify-between gap-3">
//                   <div>
//                     <h3 className="font-semibold">Live Fitness Monitor</h3>
//                     <p className="mt-1 text-sm text-slate-500">
//                       Camera feed and pose landmarks
//                     </p>
//                   </div>
//                   <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
//                     Demo preview
//                   </span>
//                 </div>

//                 <div className="mt-5 flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#090c13] p-6 text-center">
//                   <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl text-blue-400">
//                     ◎
//                   </div>
//                   <h4 className="font-medium">Camera preview will appear here</h4>
//                   <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
//                     Your Python pose-estimation backend will provide the live
//                     video, body landmarks, and joint-angle measurements.
//                   </p>
//                   <button
//                     disabled
//                     className="mt-5 cursor-not-allowed rounded-xl bg-blue-600/50 px-5 py-3 text-sm font-medium text-white/70"
//                   >
//                     Camera integration — Next phase
//                   </button>
//                 </div>

//                 <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
//                   <span className="text-slate-400">Current exercise</span>
//                   <span className="rounded-lg bg-white/5 px-3 py-2">
//                     Squat
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="rounded-2xl border border-white/10 bg-[#11151e] p-5">
//                   <h3 className="font-semibold">Workout Overview</h3>
//                   <div className="mt-5 rounded-xl bg-[#090c13] p-4">
//                     <p className="text-sm text-slate-500">Repetitions</p>
//                     <p className="mt-2 text-4xl font-bold">12</p>
//                     <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
//                       <div className="h-full w-3/5 rounded-full bg-blue-500" />
//                     </div>
//                     <p className="mt-2 text-xs text-slate-500">
//                       Illustrative progress · demo data
//                     </p>
//                   </div>
//                   <div className="mt-4 flex items-center justify-between text-sm">
//                     <span className="text-slate-400">Pose detection</span>
//                     <span className="text-emerald-400">UI ready</span>
//                   </div>
//                 </div>

//                 <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
//                   <p className="text-sm font-semibold text-blue-400">
//                     Computer Vision
//                   </p>
//                   <p className="mt-3 text-sm leading-6 text-slate-400">
//                     MediaPipe detects body landmarks. Joint geometry is used
//                     to estimate knee angles and classify squat movements.
//                   </p>
//                 </div>
//               </div>
//             </section>
//           </>
//         )}

//         {activeSection === 'How It Works' && (
//           <section className="grid gap-4 md:grid-cols-2">
//             {[
//               ['01', 'Video Capture', 'OpenCV reads frames from the webcam.'],
//               ['02', 'Pose Estimation', 'MediaPipe identifies human body landmarks.'],
//               ['03', 'Angle Calculation', 'NumPy and coordinate geometry calculate knee angles.'],
//               ['04', 'Squat Detection', 'Angle thresholds identify movement and count repetitions.'],
//             ].map(([number, title, description]) => (
//               <article
//                 key={number}
//                 className="rounded-2xl border border-white/10 bg-[#11151e] p-6"
//               >
//                 <p className="text-sm font-bold text-blue-400">{number}</p>
//                 <h3 className="mt-4 font-semibold">{title}</h3>
//                 <p className="mt-2 text-sm leading-6 text-slate-400">
//                   {description}
//                 </p>
//               </article>
//             ))}
//           </section>
//         )}

//         {activeSection === 'About Project' && (
//           <section className="rounded-2xl border border-white/10 bg-[#11151e] p-6 md:p-8">
//             <h3 className="text-xl font-semibold">Project Overview</h3>
//             <p className="mt-4 max-w-3xl leading-7 text-slate-400">
//               Human Pose Estimation for Fitness Monitoring is a Computer Vision
//               mini-project that uses webcam video to estimate body landmarks,
//               calculate knee angles, identify squat movements, and count
//               repetitions in real time.
//             </p>
//             <h4 className="mt-8 font-semibold">Technology Stack</h4>
//             <div className="mt-4 flex flex-wrap gap-2">
//               {['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'React', 'Vite', 'Tailwind CSS', 'FastAPI'].map(
//                 (technology) => (
//                   <span
//                     key={technology}
//                     className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300"
//                   >
//                     {technology}
//                   </span>
//                 )
//               )}
//             </div>
//             <h4 className="mt-8 font-semibold">Project Objectives</h4>
//             <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-slate-400">
//               <li>Detect body landmarks from video.</li>
//               <li>Calculate knee joint angles.</li>
//               <li>Classify squat movements using angle thresholds.</li>
//               <li>Count completed squat repetitions.</li>
//             </ul>
//             <h4 className="mt-8 font-semibold">Current Limitations</h4>
//             <p className="mt-3 text-sm leading-6 text-slate-400">
//               Detection accuracy depends on lighting, camera placement,
//               landmark visibility, and the selected angle thresholds.
//               The website currently uses demonstration data until the
//               backend integration is completed.
//             </p>
//           </section>
//         )}

//         <footer className="mt-10 border-t border-white/10 pt-5 text-xs text-slate-600">
//           PoseFit · Human Pose Estimation for Fitness Monitoring · Computer Vision Mini Project
//         </footer>
//       </main>
//     </div>
//   )
// }

// export default App







// import { useEffect, useState } from 'react'

// const API = 'http://127.0.0.1:8000'

// function App() {
//   const [activeSection, setActiveSection] = useState('Dashboard')
//   const [stats, setStats] = useState({
//     left_angle: null,
//     right_angle: null,
//     squats: 0,
//     status: 'Waiting',
//     detected: false,
//   })
//   const [apiOnline, setApiOnline] = useState(false)
//   const [resetting, setResetting] = useState(false)

//   useEffect(() => {
//     let mounted = true

//     async function fetchStats() {
//       try {
//         const response = await fetch(`${API}/api/stats`)
//         if (!response.ok) throw new Error('API unavailable')

//         const data = await response.json()

//         if (mounted) {
//           setStats(data)
//           setApiOnline(true)
//         }
//       } catch {
//         if (mounted) setApiOnline(false)
//       }
//     }

//     fetchStats()
//     const interval = setInterval(fetchStats, 500)

//     return () => {
//       mounted = false
//       clearInterval(interval)
//     }
//   }, [])

//   async function resetCounter() {
//     setResetting(true)

//     try {
//       const response = await fetch(`${API}/api/reset`, {
//         method: 'POST',
//       })

//       if (!response.ok) throw new Error('Reset failed')

//       const data = await response.json()

//       setStats((previous) => ({
//         ...previous,
//         squats: data.squats,
//         status: data.squats === 0 ? 'UP' : previous.status,
//       }))
//     } catch {
//       alert('Could not reset. Check whether the backend is running.')
//     } finally {
//       setResetting(false)
//     }
//   }

//   const navItems = [
//     { name: 'Dashboard', icon: '◫' },
//     { name: 'How It Works', icon: '⌘' },
//     { name: 'About Project', icon: 'ⓘ' },
//   ]

//   const cards = [
//     {
//       label: 'TOTAL SQUATS',
//       value: stats.squats,
//       detail: 'Completed repetitions',
//     },
//     {
//       label: 'LEFT KNEE',
//       value: stats.left_angle == null
//         ? '—'
//         : `${stats.left_angle}°`,
//       detail: 'Joint angle',
//     },
//     {
//       label: 'RIGHT KNEE',
//       value: stats.right_angle == null
//         ? '—'
//         : `${stats.right_angle}°`,
//       detail: 'Joint angle',
//     },
//     {
//       label: 'EXERCISE STATUS',
//       value: stats.status,
//       detail: stats.detected
//         ? 'Pose detected'
//         : 'Waiting for pose',
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-[#090b10] text-slate-100 md:flex">
//       <aside className="border-b border-white/10 bg-[#0d1018] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
//             P
//           </div>
//           <div>
//             <h1 className="text-xl font-bold">PoseFit</h1>
//             <p className="text-xs text-slate-500">Computer Vision</p>
//           </div>
//         </div>

//         <p className="mb-3 mt-9 text-xs font-semibold uppercase tracking-widest text-slate-500">
//           Workspace
//         </p>

//         <nav className="flex gap-2 md:flex-col">
//           {navItems.map((item) => (
//             <button
//               key={item.name}
//               onClick={() => setActiveSection(item.name)}
//               className={`flex flex-1 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition md:flex-none ${
//                 activeSection === item.name
//                   ? 'bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/20'
//                   : 'text-slate-400 hover:bg-white/5 hover:text-white'
//               }`}
//             >
//               <span>{item.icon}</span>
//               {item.name}
//             </button>
//           ))}
//         </nav>

//         <div className="mt-10 hidden rounded-xl border border-white/10 p-4 md:block">
//           <p className="text-sm font-medium">Mini Project</p>
//           <p className="mt-2 text-xs leading-5 text-slate-500">
//             Human Pose Estimation for Fitness Monitoring
//           </p>
//           <span className={`mt-3 inline-block rounded-full px-2 py-1 text-xs ${
//             apiOnline
//               ? 'bg-emerald-500/10 text-emerald-400'
//               : 'bg-red-500/10 text-red-400'
//           }`}>
//             ● {apiOnline ? 'API connected' : 'API disconnected'}
//           </span>
//         </div>
//       </aside>

//       <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
//         <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <p className="text-sm text-slate-500">
//               PoseFit / {activeSection}
//             </p>
//             <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
//               {activeSection === 'Dashboard'
//                 ? 'Fitness Dashboard'
//                 : activeSection}
//             </h2>
//             <p className="mt-2 text-sm text-slate-400">
//               Real-time human pose analysis and squat monitoring.
//             </p>
//           </div>

//           <div className="rounded-xl border border-white/10 bg-[#11151e] px-4 py-2 text-sm">
//             <span className={`mr-2 ${apiOnline ? 'text-emerald-400' : 'text-red-400'}`}>
//               ●
//             </span>
//             {apiOnline ? 'Backend connected' : 'Backend offline'}
//           </div>
//         </header>

//         {activeSection === 'Dashboard' && (
//           <>
//             <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//               {cards.map((card) => (
//                 <div
//                   key={card.label}
//                   className="rounded-2xl border border-white/10 bg-[#11151e] p-5"
//                 >
//                   <p className="text-xs font-semibold tracking-wider text-slate-500">
//                     {card.label}
//                   </p>
//                   <p className="mt-4 text-3xl font-bold tracking-tight">
//                     {card.value}
//                   </p>
//                   <p className="mt-2 text-xs text-slate-500">
//                     {card.detail}
//                   </p>
//                 </div>
//               ))}
//             </section>

//             <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
//               <div className="rounded-2xl border border-white/10 bg-[#11151e] p-5 xl:col-span-2">
//                 <div className="flex flex-wrap items-center justify-between gap-3">
//                   <div>
//                     <h3 className="font-semibold">Live Fitness Monitor</h3>
//                     <p className="mt-1 text-sm text-slate-500">
//                       Live webcam and pose landmarks
//                     </p>
//                   </div>

//                   <span className={`rounded-full px-3 py-1 text-xs ${
//                     stats.detected
//                       ? 'bg-emerald-500/10 text-emerald-400'
//                       : 'bg-amber-500/10 text-amber-400'
//                   }`}>
//                     {stats.detected ? 'Pose detected' : 'Waiting for pose'}
//                   </span>
//                 </div>

//                 <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black">
//                   {apiOnline ? (
//                     <img
//                       src={`${API}/video_feed`}
//                       alt="Live webcam with human pose landmarks"
//                       className="block h-auto max-h-[600px] min-h-64 w-full object-contain"
//                     />
//                   ) : (
//                     <div className="flex min-h-72 flex-col items-center justify-center p-6 text-center">
//                       <div className="text-4xl text-blue-400">◎</div>
//                       <h4 className="mt-4 font-medium">
//                         Waiting for backend
//                       </h4>
//                       <p className="mt-2 text-sm text-slate-500">
//                         Start the FastAPI server to access your webcam feed.
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
//                   <div className="text-sm text-slate-400">
//                     Exercise: <span className="text-white">Squat</span>
//                   </div>

//                   <button
//                     onClick={resetCounter}
//                     disabled={!apiOnline || resetting}
//                     className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     {resetting ? 'Resetting...' : 'Reset Counter'}
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="rounded-2xl border border-white/10 bg-[#11151e] p-5">
//                   <h3 className="font-semibold">Workout Overview</h3>

//                   <div className="mt-5 rounded-xl bg-[#090c13] p-4">
//                     <p className="text-sm text-slate-500">
//                       Completed repetitions
//                     </p>
//                     <p className="mt-2 text-4xl font-bold">
//                       {stats.squats}
//                     </p>
//                     <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
//                       <div
//                         className="h-full rounded-full bg-blue-500 transition-all"
//                         style={{
//                           width: `${Math.min(stats.squats / 20 * 100, 100)}%`,
//                         }}
//                       />
//                     </div>
//                     <p className="mt-2 text-xs text-slate-500">
//                       Illustrative progress toward 20 squats
//                     </p>
//                   </div>

//                   <div className="mt-4 flex items-center justify-between text-sm">
//                     <span className="text-slate-400">Pose detection</span>
//                     <span className={stats.detected ? 'text-emerald-400' : 'text-amber-400'}>
//                       {stats.detected ? 'Active' : 'Waiting'}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
//                   <p className="text-sm font-semibold text-blue-400">
//                     Current Feedback
//                   </p>
//                   <p className="mt-3 text-lg font-semibold">
//                     {!stats.detected
//                       ? 'Position yourself in view'
//                       : stats.status === 'DOWN'
//                         ? 'Squat position detected'
//                         : stats.status === 'UP'
//                           ? 'Standing position detected'
//                           : stats.status}
//                   </p>
//                   <p className="mt-2 text-sm leading-6 text-slate-400">
//                     Feedback is based on the detected knee angle and current
//                     exercise state.
//                   </p>
//                 </div>
//               </div>
//             </section>
//           </>
//         )}

//         {activeSection === 'How It Works' && (
//           <section className="grid gap-4 md:grid-cols-2">
//             {[
//               ['01', 'Video Capture', 'OpenCV reads frames from the webcam.'],
//               ['02', 'Pose Estimation', 'MediaPipe identifies body landmarks.'],
//               ['03', 'Angle Calculation', 'NumPy and coordinate geometry calculate knee angles.'],
//               ['04', 'Squat Detection', 'Angle thresholds identify movements and count repetitions.'],
//               ['05', 'API Integration', 'FastAPI provides live video and workout statistics to React.'],
//             ].map(([number, title, description]) => (
//               <article
//                 key={number}
//                 className="rounded-2xl border border-white/10 bg-[#11151e] p-6"
//               >
//                 <p className="text-sm font-bold text-blue-400">{number}</p>
//                 <h3 className="mt-4 font-semibold">{title}</h3>
//                 <p className="mt-2 text-sm leading-6 text-slate-400">
//                   {description}
//                 </p>
//               </article>
//             ))}
//           </section>
//         )}

//         {activeSection === 'About Project' && (
//           <section className="rounded-2xl border border-white/10 bg-[#11151e] p-6 md:p-8">
//             <h3 className="text-xl font-semibold">Project Overview</h3>
//             <p className="mt-4 max-w-3xl leading-7 text-slate-400">
//               Human Pose Estimation for Fitness Monitoring uses webcam video
//               to estimate body landmarks, calculate knee angles, identify
//               squat movements, and count repetitions.
//             </p>

//             <h4 className="mt-8 font-semibold">Technology Stack</h4>
//             <div className="mt-4 flex flex-wrap gap-2">
//               {[
//                 'Python', 'OpenCV', 'MediaPipe', 'NumPy',
//                 'FastAPI', 'React', 'Vite', 'Tailwind CSS',
//               ].map((technology) => (
//                 <span
//                   key={technology}
//                   className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300"
//                 >
//                   {technology}
//                 </span>
//               ))}
//             </div>

//             <h4 className="mt-8 font-semibold">Project Objectives</h4>
//             <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-slate-400">
//               <li>Detect body landmarks from video.</li>
//               <li>Calculate knee joint angles.</li>
//               <li>Classify squat movements using angle thresholds.</li>
//               <li>Count completed squat repetitions.</li>
//               <li>Display live workout information in a web interface.</li>
//             </ul>

//             <h4 className="mt-8 font-semibold">Limitations</h4>
//             <p className="mt-3 text-sm leading-6 text-slate-400">
//               Accuracy depends on lighting, camera position, and landmark
//               visibility. Exercise classification uses fixed angle thresholds
//               and is not a professional assessment of exercise form.
//             </p>
//           </section>
//         )}

//         <footer className="mt-10 border-t border-white/10 pt-5 text-xs text-slate-600">
//           PoseFit · Human Pose Estimation for Fitness Monitoring · Computer Vision Mini Project
//         </footer>
//       </main>
//     </div>
//   )
// }

// export default App





import { useEffect, useState } from 'react'

const API = 'http://127.0.0.1:8000'

const exercises = ['Squats', 'Bicep Curls', 'Push-ups']

function formatTime(seconds = 0) {
  const minutes = Math.floor(seconds / 60)
  const remaining = seconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`
}

function App() {
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [selectedExercise, setSelectedExercise] = useState('Squats')
  const [stats, setStats] = useState({
    left_angle: null,
    right_angle: null,
    squats: 0,
    status: 'Ready',
    detected: false,
    session_active: false,
    duration: 0,
  })
  const [apiOnline, setApiOnline] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let mounted = true

    async function fetchStats() {
      try {
        const response = await fetch(`${API}/api/stats`)
        if (!response.ok) throw new Error('API unavailable')

        const data = await response.json()

        if (mounted) {
          setStats(data)
          setSelectedExercise(data.exercise || 'Squats')
          setApiOnline(true)
        }
      } catch {
        if (mounted) setApiOnline(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 500)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  async function postAction(path, body) {
    setBusy(true)
    setMessage('')

    try {
      const response = await fetch(`${API}${path}`, {
        method: 'POST',
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body ? JSON.stringify(body) : undefined,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Request failed')
      }

      setMessage(data.message || 'Updated successfully')

      const latest = await fetch(`${API}/api/stats`)
      if (latest.ok) setStats(await latest.json())

      return true
    } catch (error) {
      setMessage(error.message || 'Could not connect to the backend')
      return false
    } finally {
      setBusy(false)
    }
  }

  async function changeExercise(event) {
    const nextExercise = event.target.value
    const success = await postAction('/api/exercise', {
      exercise: nextExercise,
    })

    if (success) {
      setSelectedExercise(nextExercise)
      setMessage(`Selected ${nextExercise}`)
    }
  }

  const isActive = stats.session_active
  const repCount = stats.squats ?? 0
  const duration = stats.duration ?? 0

  const angleLabel = selectedExercise === 'Squats'
    ? 'Knee angle'
    : 'Elbow angle'

  const cards = [
    {
      label: 'REPETITIONS',
      value: repCount,
      detail: `${selectedExercise} completed`,
    },
    {
      label: `LEFT ${angleLabel.toUpperCase()}`,
      value: stats.left_angle == null ? '—' : `${stats.left_angle}°`,
      detail: 'Left side',
    },
    {
      label: `RIGHT ${angleLabel.toUpperCase()}`,
      value: stats.right_angle == null ? '—' : `${stats.right_angle}°`,
      detail: 'Right side',
    },
    {
      label: 'SESSION TIME',
      value: formatTime(duration),
      detail: isActive ? 'Workout in progress' : 'Session paused',
    },
  ]

  const navItems = [
    { name: 'Dashboard', icon: '◫' },
    { name: 'How It Works', icon: '⌘' },
    { name: 'About Project', icon: 'ⓘ' },
  ]

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 md:flex">
      <aside className="border-b border-white/10 bg-[#0d1018] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
            P
          </div>
          <div>
            <h1 className="text-xl font-bold">PoseFit</h1>
            <p className="text-xs text-slate-500">Computer Vision</p>
          </div>
        </div>

        <p className="mb-3 mt-9 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </p>

        <nav className="flex gap-2 md:flex-col">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              className={`flex flex-1 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition md:flex-none ${
                activeSection === item.name
                  ? 'bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-10 hidden rounded-xl border border-white/10 p-4 md:block">
          <p className="text-sm font-medium">System status</p>
          <p className={`mt-3 text-xs ${apiOnline ? 'text-emerald-400' : 'text-red-400'}`}>
            ● {apiOnline ? 'API connected' : 'API disconnected'}
          </p>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              PoseFit / {activeSection}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              {activeSection === 'Dashboard'
                ? 'Fitness Dashboard'
                : activeSection}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Human pose analysis and fitness monitoring.
            </p>
          </div>

          <span className={`rounded-xl border border-white/10 bg-[#11151e] px-4 py-2 text-sm ${
            apiOnline ? 'text-emerald-400' : 'text-red-400'
          }`}>
            ● {apiOnline ? 'Backend connected' : 'Backend offline'}
          </span>
        </header>

        {activeSection === 'Dashboard' && (
          <>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {cards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-white/10 bg-[#11151e] p-5"
                >
                  <p className="text-xs font-semibold tracking-wider text-slate-500">
                    {card.label}
                  </p>
                  <p className="mt-4 text-3xl font-bold">{card.value}</p>
                  <p className="mt-2 text-xs text-slate-500">{card.detail}</p>
                </div>
              ))}
            </section>

            <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#11151e] p-5 xl:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">Live Fitness Monitor</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Webcam and pose landmarks
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {isActive ? 'Workout active' : 'Workout stopped'}
                  </span>
                </div>

                <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black">
                  {apiOnline ? (
                    <img
                      src={`${API}/video_feed`}
                      alt="Live pose estimation video"
                      className="block max-h-[600px] min-h-64 w-full object-contain"
                    />
                  ) : (
                    <div className="flex min-h-72 items-center justify-center p-6 text-center text-slate-400">
                      Start the FastAPI backend to view the camera.
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="exercise"
                    className="mb-2 block text-sm text-slate-400"
                  >
                    Select exercise
                  </label>

                  <select
                    id="exercise"
                    value={selectedExercise}
                    onChange={changeExercise}
                    disabled={!apiOnline || isActive || busy}
                    className="w-full rounded-xl border border-white/10 bg-[#090c13] px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:opacity-50"
                  >
                    {exercises.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => postAction('/api/session/start')}
                      disabled={!apiOnline || isActive || busy}
                      className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Start Workout
                    </button>

                    <button
                      onClick={() => postAction('/api/session/stop')}
                      disabled={!apiOnline || !isActive || busy}
                      className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Stop Workout
                    </button>

                    <button
                      onClick={() => postAction('/api/reset')}
                      disabled={!apiOnline || busy}
                      className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Reset Reps
                    </button>
                  </div>

                  {message && (
                    <p role="status" className="mt-3 text-sm text-blue-400">
                      {message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-[#11151e] p-5">
                  <h3 className="font-semibold">Workout Overview</h3>
                  <div className="mt-5 rounded-xl bg-[#090c13] p-4">
                    <p className="text-sm text-slate-500">Repetitions</p>
                    <p className="mt-2 text-4xl font-bold">{repCount}</p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all"
                        style={{ width: `${Math.min(repCount / 20 * 100, 100)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      Progress toward 20 repetitions
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-400">Pose detection</span>
                    <span className={stats.detected ? 'text-emerald-400' : 'text-amber-400'}>
                      {stats.detected ? 'Active' : 'Waiting'}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-400">Exercise</span>
                    <span>{selectedExercise}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
                  <p className="text-sm font-semibold text-blue-400">
                    Live Feedback
                  </p>
                  <p className="mt-3 text-lg font-semibold">
                    {!isActive
                      ? 'Ready when you are'
                      : !stats.detected
                        ? 'Position yourself in view'
                        : stats.status === 'DOWN'
                          ? 'Lowered position detected'
                          : stats.status === 'UP'
                            ? 'Raised position detected'
                            : stats.status}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Feedback is based on the selected exercise and detected
                    joint angles. It is a basic movement indicator, not a
                    professional form assessment.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'How It Works' && (
          <section className="grid gap-4 md:grid-cols-2">
            {[
              ['01', 'Video Capture', 'OpenCV captures frames from the webcam.'],
              ['02', 'Pose Estimation', 'MediaPipe identifies body landmarks.'],
              ['03', 'Angle Calculation', 'Joint angles are calculated using coordinate geometry.'],
              ['04', 'Exercise Detection', 'Exercise-specific thresholds identify movement states and count repetitions.'],
              ['05', 'Web Integration', 'FastAPI supplies live video and workout statistics to React.'],
            ].map(([number, title, description]) => (
              <article key={number} className="rounded-2xl border border-white/10 bg-[#11151e] p-6">
                <p className="text-sm font-bold text-blue-400">{number}</p>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
              </article>
            ))}
          </section>
        )}

        {activeSection === 'About Project' && (
          <section className="rounded-2xl border border-white/10 bg-[#11151e] p-6 md:p-8">
            <h3 className="text-xl font-semibold">Project Overview</h3>
            <p className="mt-4 max-w-3xl leading-7 text-slate-400">
              PoseFit is a Computer Vision mini-project that estimates body
              landmarks from webcam video, calculates joint angles, and counts
              repetitions for selected fitness exercises.
            </p>

            <h4 className="mt-8 font-semibold">Technology Stack</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'FastAPI', 'React', 'Vite', 'Tailwind CSS'].map((item) => (
                <span key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                  {item}
                </span>
              ))}
            </div>

            <h4 className="mt-8 font-semibold">Exercises</h4>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-slate-400">
              <li>Squats — knee-angle analysis.</li>
              <li>Bicep curls — elbow-angle analysis.</li>
              <li>Push-ups — elbow-angle analysis.</li>
            </ul>

            <h4 className="mt-8 font-semibold">Limitations</h4>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Results depend on camera placement, lighting, landmark visibility,
              and angle thresholds. The system uses basic geometric rules and
              does not replace professional exercise guidance.
            </p>
          </section>
        )}

        <footer className="mt-10 border-t border-white/10 pt-5 text-xs text-slate-600">
          PoseFit · Human Pose Estimation for Fitness Monitoring · Computer Vision Mini Project
        </footer>
      </main>
    </div>
  )
}

export default App