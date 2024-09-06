import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronDown, ChevronUp, Menu, Star, X } from 'lucide-react'
import eventImage from '../assets/landingimg.jpg';
import weddingPng from '../assets/icons/wedding.png';
import bdayPng from '../assets/icons/bdaysvg.png';
import partyPng from '../assets/icons/party.png';
import conferencePng from '../assets/icons/conference.png';
import camera from '../assets/vendorpics/camera.jpg';
import decor from '../assets/vendorpics/decor.jpg';
import lightsound from '../assets/vendorpics/lightsound.jpg';
import entertainment from '../assets/vendorpics/entertainment.jpg';

const menuItems = [
  {
    name: 'Home',
    href: '#',
  },
  {
    name: 'Tutorials',
    href: '/tutorials',
  }
  // {
  //   name: 'Contact',
  //   href: '#',
  // },
  // {
  //   name: 'Blogs',
  //   href: '#',
  // },
]

export default function LandingPageOne() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="w-full">
      <header className="relative w-full border-b bg-white pb-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="inline-flex items-center space-x-2">
            <span className="font-bold">Eventio</span>
          </div>
          <div>
            <ul className="inline-flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              type="button"
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="relative w-full bg-white">
        <div className="mx-auto max-w-7xl flex">
          <div className="flex-1 flex flex-col justify-center px-4 py-12">
            <h1 className="text-6xl font-bold tracking-tight text-black">
              Effortless Planning, Memorable Events.
            </h1>
            <p className="mt-8 text-lg text-gray-700">
              Effortlessly orchestrating unforgettable events with ease and precision, so you can focus on making every moment count!
            </p>
          </div>
          <div className="flex-1">
            <img
              className="w-full h-auto object-cover"
              src={eventImage}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto my-32 max-w-7xl px-2">
        <div className="grid grid-cols-4 gap-12 text-center">
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <img
                src={weddingPng}
                alt="Round shape"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Weddings</h3>
            <p className="mt-4 text-sm text-gray-600">
              Happily Ever After, Starts Now.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <img
                src={bdayPng}
                alt="Round shape"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Birthdays</h3>
            <p className="mt-4 text-sm text-gray-600">
              The Annual Excuse to Eat Cake and Pretend You're Not Getting Older
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 p-2">
              <img
                src={partyPng}
                alt="Round shape"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Parties</h3>
            <p className="mt-4 text-sm text-gray-600">
              Unforgettable night of music and fun!
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <img
                src={conferencePng}
                alt="Round shape"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Conferences</h3>
            <p className="mt-4 text-sm text-gray-600">
              Connect, Collaborate, Create
            </p>
          </div>
        </div>
      </div>

      {/* Vendors Section */}
      <section className="mx-auto max-w-7xl bg-gray-50 px-2 py-10">
        <div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-5xl font-bold leading-tight text-black">
              Vendors registered with us
            </h2>
          </div>
          <div className="mx-auto my-32 max-w-7xl px-2">
            <div className="grid grid-cols-4 gap-12 text-center">
              <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <img
                    src={camera}
                    alt="Round shape"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Photography</h3>
                <p className="mt-4 text-sm text-gray-600">
                  Capturing Moments, Creating Memories.
                </p>
              </div>
              <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <img
                    src={decor}
                    alt="Round shape"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Decorations</h3>
                <p className="mt-4 text-sm text-gray-600">
                  Designing Ambiance with Every Detail
                </p>
              </div>
              <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 p-2">
                  <img
                    src={lightsound}
                    alt="Round shape"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Light and Sound</h3>
                <p className="mt-4 text-sm text-gray-600">
                  Setting the Mood with Perfect Light and Sound.
                </p>
              </div>
              <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <img
                    src={entertainment}
                    alt="Round shape"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Entertainment</h3>
                <p className="mt-4 text-sm text-gray-600">
                  Where Fun and Excitement Take Center Stage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <div className="my-32 flex justify-center">
        <button
          type="button"
          className="rounded-md bg-black px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() => navigate('/vendorregistration')}
        >
          Join Us
        </button>
      </div>
    </div>
  )
}
