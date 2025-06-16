import { useEffect, useState } from 'react'
import logo from '/logo.svg'
import me from '/me.svg'
import gmailLight from '/gmailLight.svg'
import gmailDark from '/gmailDark.svg'
import linkedinLight from '/linkedinLight.svg'
import linkedinDark from '/linkedinDark.svg'
import githubLight from '/githubLight.svg'
import githubDark from '/githubDark.svg'
import instaLight from '/instaLight.svg'
import instaDark from '/instaDark.svg'
import DarkModeToggle from "react-dark-mode-toggle";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDarkMode]);

  return (
    <>
      <div className='w-full min-h-screen dark:bg-slate-800 bg-slate-200 pb-12'>
        <div className='pt-8 px-8'>
          <div className='flex flex-row justify-between items-center'>
            <a className='cursor-pointer'><img src={logo} className="h-14" alt="Portfolio Logo" /></a>
            <DarkModeToggle
              onChange={setIsDarkMode}
              checked={isDarkMode}
              size={80}
              className='focus:outline-none focus:ring-0'
            />
          </div>
          <div className="w-full flex flex-col items-center md:mt-24 mt-12 text-center">
            <h1 className="dark:text-slate-200 text-slate-800 text-4xl sm:text-5xl font-bold">Full Stack Software Engineer</h1>
            <h1 className="dark:text-slate-200 text-slate-800 text-xl sm:text-2xl pt-6">Crafting scalable solutions from design to deployment</h1>
            <div className='flex flex-col md:flex-row items-center md:space-x-8'>
              <div className='md:flex hidden pt-14 flex-col space-y-6'>
                <a className='cursor-pointer bounce-left' href="mailto:crnorthc99@gmail.com">
                  <img src={isDarkMode ? gmailLight : gmailDark} className="h-16 sm:h-16" alt="Gmail" />
                </a>
                <a className='cursor-pointer bounce-left' href="https://www.linkedin.com/in/caleb--ryan/" target="_blank">
                  <img src={isDarkMode ? linkedinLight : linkedinDark} className="h-16 sm:h-16" alt="LinkedIn" />
                </a>
              </div>
              <img src={me} className="h-48 sm:h-60 mt-12" alt="Cartoon Caleb" />
              <div className='pt-14 md:flex hidden flex-col space-y-6'>
                <a className='cursor-pointer bounce-right' href="https://www.instagram.com/northcottcaleb/" target="_blank">
                  <img src={isDarkMode ? instaLight : instaDark} className="h-16 sm:h-16" alt="Instagram" />
                </a>
                <a className='cursor-pointer bounce-right' href="https://github.com/crnorthc" target="_blank">
                  <img src={isDarkMode ? githubLight : githubDark} className="h-16 sm:h-16" alt="GitHub" />
                </a>
              </div>
              <div className='md:hidden w-full text-center dark:text-slate-200 text-slate-800 pt-2 pb-7 text-3xl'>Caleb Northcott</div>
              <div className='pb-7 flex md:hidden flex-row space-x-6'>
                <a className='cursor-pointer bounce-left' href="mailto:crnorthc99@gmail.com">
                  <img src={isDarkMode ? gmailLight : gmailDark} className="h-16 sm:h-16" alt="Gmail" />
                </a>
                <a className='cursor-pointer bounce-left' href="https://www.linkedin.com/in/caleb--ryan/" target="_blank">
                  <img src={isDarkMode ? linkedinLight : linkedinDark} className="h-16 sm:h-16" alt="LinkedIn" />
                </a>
                <a className='cursor-pointer bounce-right' href="https://www.instagram.com/northcottcaleb/" target="_blank">
                  <img src={isDarkMode ? instaLight : instaDark} className="h-16 sm:h-16" alt="Instagram" />
                </a>
                <a className='cursor-pointer bounce-right' href="https://github.com/crnorthc" target="_blank">
                  <img src={isDarkMode ? githubLight : githubDark} className="h-16 sm:h-16" alt="GitHub" />
                </a>
              </div>
            </div>
          </div>
          <div className='hidden md:block w-full text-center dark:text-slate-200 text-slate-800 pt-2 text-3xl'>Caleb Northcott</div>
          <div className='w-full flex justify-center md:pt-6'>
            <a href="https://drive.google.com/file/d/1MVCflLbpob8xQr9106g7XYlcOgMAwshh/view?usp=sharing" target="_blank" className='bg-blueish hover:bg-blueish/80 py-3 px-5 rounded-md text-slate-200 cursor-pointer'>Resume</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
