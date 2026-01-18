export const metadata = {
  title: 'About Us - SGK Commanders',
  description: 'Learn about SGK Commanders mission to enhance public safety through rapid emergency response and community protection in Cameroon.',
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-blue-950 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-950 text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">About SGK Commanders</h1>
          <p className="text-xl sm:text-2xl text-blue-200">Empowering Communities Through Rapid Emergency Response</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Problem Statement Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">The Problem We&rsquo;re Solving</h2>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Crime remains a critical challenge in major cities across Cameroon. High crime rates in urban centers like Yaound&eacute;, Douala, and other metropolitan areas create an environment of fear and insecurity for residents and businesses alike.
              </p>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Traditional emergency response systems often suffer from slow communication, unclear victim locations, and delayed assistance. When seconds matter, these delays can have devastating consequences. Communities need a faster, more reliable way to get help when they need it most.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                <strong className="text-white">SGK Commanders was created to bridge this critical gap.</strong> We believe that everyone deserves access to rapid emergency response, regardless of their socioeconomic status.
              </p>
            </div>
            <div className="bg-blue-900/50 border border-blue-800 p-8 rounded-lg border-l-4 border-l-red-500">
              <h3 className="text-2xl font-bold text-white mb-4">Crisis Facts</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 font-bold mr-3">•</span>
                  <span>High urban crime rates threaten community safety</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 font-bold mr-3">•</span>
                  <span>Emergency response times are inconsistent</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 font-bold mr-3">•</span>
                  <span>Location identification is often unclear during emergencies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 font-bold mr-3">•</span>
                  <span>Vulnerable populations lack accessible safety solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20 bg-blue-900/50 border border-blue-800 p-12 rounded-lg">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Our Mission</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-200 leading-relaxed mb-6 text-center font-semibold">
              To revolutionize emergency response in Cameroon by providing instant, location-tracked assistance that connects people in distress with rapid responders.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {/* How it works card 1 */}
              <div className="bg-blue-800/50 border border-blue-700 p-6 rounded-lg border-t-4 border-t-blue-400">
                <div className="text-4xl font-bold text-blue-300 mb-4">1</div>
                <h3 className="text-xl font-bold text-white mb-3">Send SOS Alert</h3>
                <p className="text-gray-300">
                  Users in distress instantly activate the SOS feature with a single tap in the SGK Commanders app.
                </p>
              </div>

              {/* How it works card 2 */}
              <div className="bg-blue-800/50 border border-blue-700 p-6 rounded-lg border-t-4 border-t-green-400">
                <div className="text-4xl font-bold text-green-400 mb-4">2</div>
                <h3 className="text-xl font-bold text-white mb-3">Location Tracked</h3>
                <p className="text-gray-300">
                  Real-time GPS tracking immediately shares the victim&rsquo;s precise location with emergency responders and designated group members.
                </p>
              </div>

              {/* How it works card 3 */}
              <div className="bg-blue-800/50 border border-blue-700 p-6 rounded-lg border-t-4 border-t-red-400">
                <div className="text-4xl font-bold text-red-400 mb-4">3</div>
                <h3 className="text-xl font-bold text-white mb-3">Rapid Rescue</h3>
                <p className="text-gray-300">
                  Trained agents and emergency responders arrive quickly with accurate location data to provide immediate assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why SGK Commanders</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Instant Notifications</h3>
                <p className="text-gray-300">
                  Emergency alerts are sent instantly to responders and designated group members, eliminating critical delays.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Real-Time Location Tracking</h3>
                <p className="text-gray-300">
                  Precise GPS coordinates ensure responders can locate victims quickly and accurately, even in unfamiliar areas.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Community Protection</h3>
                <p className="text-gray-300">
                  Build trusted groups with family, friends, and colleagues who can respond quickly and provide mutual support.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-600 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Affordable Access</h3>
                <p className="text-gray-300">
                  Pay-as-you-go pricing model ensures security is accessible to everyone, regardless of income level.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="mb-20 bg-blue-900/50 border border-blue-800 p-12 rounded-lg">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Founder & Vision</h2>
          
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Founder Image/Icon */}
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Founder Info */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold text-white mb-2">Steeve Kenfack</h3>
              <p className="text-lg text-blue-300 font-semibold mb-4">Founder & Vision Leader</p>
              
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Steeve Kenfack envisioned a world where security is not a luxury, but a fundamental right accessible to every person in Cameroon. Witnessing the impact of crime on communities and the gaps in traditional emergency response systems, he founded SGK Commanders in 2025 with a singular mission: to democratize personal safety.
              </p>

              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                With a passion for technology-driven solutions and a deep commitment to community welfare, Steeve has been tirelessly working to build a platform that combines innovation with practicality. His vision is grounded in the belief that everyone deserves the ability to call for help and receive it within seconds, regardless of their financial status.
              </p>

              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Under Steeve&rsquo;s leadership, SGK Commanders is revolutionizing emergency response in Cameroon through rapid SOS notifications, real-time location tracking, and a pay-as-you-go model that ensures affordability. His dedication continues to drive the platform&rsquo;s mission to save lives and protect communities across the nation.
              </p>

              {/* Contact Links */}
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Connect with Steeve</p>
                  <div className="flex gap-4">
                    <a href="https://facebook.com/steevekenfack" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </a>
                    <a href="mailto:steeve@sdgcommanders.com" className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="mt-12 bg-blue-800/50 border border-blue-700 p-8 rounded-lg border-l-4 border-l-blue-400">
            <h4 className="text-2xl font-bold text-white mb-4">Steeve&rsquo;s Vision</h4>
            <p className="text-xl text-gray-200 italic leading-relaxed">
              &quot;Security should not be determined by wealth or social status. Through technology and community collaboration, we can create a Cameroon where every person has immediate access to help in their darkest hours. SGK Commanders is just the beginning of a movement to make our cities safer for everyone.&quot;
            </p>
          </div>
        </section>

        {/* Journey Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Journey</h2>
          
          <div className="relative">
            {/* Timeline */}
            <div className="space-y-8">
              
              {/* 2025 Launch */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
                  <div className="w-1 h-20 bg-blue-600 mt-4"></div>
                </div>
                <div className="pt-2">
                  <h4 className="text-xl font-bold text-white">2025 - Launch & Foundation</h4>
                  <p className="text-gray-300 mt-2">
                    SGK Commanders was founded with the core mission to address the emergency response crisis in Cameroon. The platform begins development with a focus on rapid SOS notifications and real-time location tracking.
                  </p>
                </div>
              </div>

              {/* Growing Adoption */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
                  <div className="w-1 h-20 bg-blue-600 mt-4"></div>
                </div>
                <div className="pt-2">
                  <h4 className="text-xl font-bold text-white">Early Adoption</h4>
                  <p className="text-gray-300 mt-2">
                    The platform gains traction in major cities across Cameroon as users recognize the value of instant emergency response. Communities begin forming protective groups within the app.
                  </p>
                </div>
              </div>

              {/* Expansion */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
                </div>
                <div className="pt-2">
                  <h4 className="text-xl font-bold text-white">Present & Future</h4>
                  <p className="text-gray-300 mt-2">
                    SGK Commanders continues to expand its network of responders and communities, working toward making rapid emergency response accessible to everyone on a pay-as-you-go basis. The vision is to save lives and build safer communities across Cameroon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-12 px-8 rounded-lg text-center border border-blue-800">
          <h2 className="text-3xl font-bold mb-4 text-white">Join the Movement for Safer Communities</h2>
          <p className="text-xl text-blue-200 mb-6">
            Be part of a revolution in emergency response. Download SGK Commanders today and help protect your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-950 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition">
              Download App
            </button>
            <button className="border-2 border-blue-300 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition">
              Learn More
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}