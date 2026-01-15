import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-950 text-white">
      {/* Hero Section */}
      <section className="w-full px-6 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
            {/* Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-2 sm:space-y-4">
                <p className="text-sm sm:text-base text-blue-300 font-semibold uppercase tracking-widest">
                  Emergency Response
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                  One Tap. Rapid Response.
                </h1>
                <p className="text-base sm:text-lg text-blue-200">
                  SGK Commanders
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h5 className="text-lg sm:text-xl text-gray-200 font-semibold">
                  Cameroon&apos;s first rapid security intervention mobile app
                </h5>
                <p className="text-gray-400 italic text-base sm:text-lg leading-relaxed">
                  Put your personal security at your fingertips. One click and we are there to intervene.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm sm:text-base">Send instant SOS alerts</p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm sm:text-base">
                    Get elite security intervention at your exact location
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm sm:text-base">Get help as soon as you need it</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <p className="text-blue-200 font-semibold text-sm sm:text-base">Download mobile app</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    <Image
                      src={"/icons8-android-logo.svg"}
                      width={20}
                      height={20}
                      alt="Android logo"
                    />
                    Android Play Store
                  </Button>
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    <Image
                      src={"/icons8-app-store.svg"}
                      width={20}
                      height={20}
                      alt="Apple App Store logo"
                    />
                    Apple App Store
                  </Button>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full max-w-sm aspect-square relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-900 rounded-full opacity-50 blur-3xl"></div>
                <Image
                  fill
                  className="w-full h-full object-contain relative z-10"
                  sizes="100vw"
                  src={"/heroImage.png"}
                  alt="Hero image"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="w-full px-6 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Why Choose SGK Commanders?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              In a world where safety is paramount, SGK Commanders stands out as
              the premier choice for rapid security intervention. Our app is
              designed to provide immediate assistance at the tap of a button,
              ensuring that help is always within reach. With a network of elite
              security professionals ready to respond, we prioritize your safety
              above all else. Choose SGK Commanders for peace of mind, knowing
              that expert help is just a click away.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full px-6 py-12 sm:py-16 lg:py-20 bg-blue-950 border-t border-blue-800">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our Partners
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              We collaborate with top security firms and local authorities to
              ensure rapid and effective response times.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center justify-center">
            {/* Partner 1 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-16 sm:w-40 sm:h-20">
                <Image
                  src={"/partner1.jpg"}
                  fill
                  alt="DAK Security logo"
                  className="object-contain"
                />
              </div>
              <p className="text-center text-blue-300 font-semibold text-sm sm:text-base">
                DAK Security
              </p>
            </div>

            {/* Partner 2 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-16 sm:w-40 sm:h-20">
                <Image
                  src={"/partner2.png"}
                  fill
                  alt="Gendarmerie logo"
                  className="object-contain"
                />
              </div>
              <p className="text-center text-blue-300 font-semibold text-sm sm:text-base">
                Gendarmerie
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
