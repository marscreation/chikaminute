import { useEffect, useState } from 'react'
import { User } from "../../store/userDetails";
import person2 from "../../assets/person2.png";
import logo from "../../assets/logo.svg";

function Navbar() {
  const [theme, setTheme] = useState(null);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    if (window.matchMedia('{prefers-color-scheme: dark}').matches) {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }, [])

  useEffect(() => {
    console.log(theme)
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      document.querySelector('[data-toggle-icon="moon"]')?.classList.remove("hidden")
      document.querySelector('[data-toggle-icon="sun"]')?.classList.add("hidden")
    } else {
      document.documentElement.classList.remove("dark")
      document.querySelector('[data-toggle-icon="moon"]')?.classList.add("hidden")
      document.querySelector('[data-toggle-icon="sun"]')?.classList.remove("hidden")
    }
  }, [theme])

  return (
    <nav className="bg-white border-gray-200 dark:bg-slate-900 border-b-slate-100 border-b-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="Chika Minute Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ChikaMinute</span>
        </a>
        <div className="flex items-center md:order-2">
          <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src={person2} alt="user photo" />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div className="z-50 block absolute m-0 max-w-xs text-base list-none bg-white divide-y divide-gray-100 rounded-b-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
            style={{ inset: '62px 0px auto auto'}}>
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">{User.firstname} {User.lastname}</span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{User.email}</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  <button data-tooltip-target="toggle-checked-example-toggle-dark-mode-tooltip" onClick={handleThemeSwitch} type="button" data-toggle-dark="dark" className="flex items-center w-9 h-9 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <svg data-toggle-icon="moon" className="w-3.5 h-3.5 hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                      <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
                    </svg>
                    <svg data-toggle-icon="sun" className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
                    </svg>
                    <span className="sr-only">Toggle dark/light mode</span>
                  </button>
                </div>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar