import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/FrameWorks";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Profile Image */}
          <div className="lg:col-span-1">
            <div className="w-full h-80 rounded-2xl overflow-hidden">
              <img 
                src="/assets/profilepic.jpg" 
                alt="Betelhem Worku" 
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  // Fallback to placeholder if image doesn't exist
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center" style={{display: 'none'}}>
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold">BW</span>
                  </div>
                  <p className="text-lg font-semibold">Profile Picture</p>
                  <p className="text-sm opacity-80">Add your photo here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Me Description */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  I'm a passionate full-stack developer with a keen eye for design and a love for creating seamless digital experiences. With expertise spanning modern web technologies, UI/UX design, and creative production, I bring ideas to life through code and creativity.
                </p>
                <p className="text-lg leading-relaxed">
                  My approach combines technical excellence with aesthetic sensibility, ensuring that every project not only works flawlessly but looks stunning too. I believe in writing clean, maintainable code and designing interfaces that users love.
                </p>
              </div>
            </div>

            {/* Currently Learning Section */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Currently Learning</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-600/20 border border-blue-500 text-blue-300 rounded-full text-sm font-medium">
                 DevOps & Cloud Basics
                </span>
                <span className="px-4 py-2 bg-blue-600/20 border border-blue-500 text-blue-300 rounded-full text-sm font-medium">
                 Databases & Data Flow
                </span>
                <span className="px-4 py-2 bg-blue-600/20 border border-blue-500 text-blue-300 rounded-full text-sm font-medium">
                  Three.js
                </span>
                <span className="px-4 py-2 bg-blue-600/20 border border-blue-500 text-blue-300 rounded-full text-sm font-medium">
                  AI Integration
                </span>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-white mb-1">0.5+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-white mb-1">5+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-white mb-1">∞</div>
                <div className="text-gray-400">Coffee Consumed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
