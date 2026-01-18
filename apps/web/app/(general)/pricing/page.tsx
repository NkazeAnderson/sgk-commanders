"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      id: "personal",
      name: "Personal",
      price: "3,500",
      currency: "XAF",
      period: "per month",
      description: "Perfect for individual users seeking personal safety",
      features: [
        "Rapid emergency intervention",
        "Real-time location tracking",
        "24/7 customer support",
        "Mobile app access",
        "SOS alert notifications",
      ],
      highlighted: false,
    },
    {
      id: "family",
      name: "Family",
      price: "7,000",
      currency: "XAF",
      period: "per month",
      description: "Protect your entire family with 5 sub-accounts",
      features: [
        "Rapid emergency intervention",
        "Real-time location tracking",
        "24/7 customer support",
        "Up to 5 sub-accounts",
        "Family group management",
        "Priority support",
        "SOS alert notifications",
      ],
      highlighted: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "2,500",
      currency: "XAF",
      period: "per sub-account/month",
      description: "Comprehensive solution for organizations and large groups",
      features: [
        "Rapid emergency intervention",
        "Real-time location tracking",
        "24/7 customer support",
        "Unlimited sub-accounts",
        "Admin dashboard access",
        "Advanced reporting & analytics",
        "Custom integrations",
        "Dedicated account manager",
      ],
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-blue-950 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-950 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-blue-200 sm:text-xl">
            Choose the plan that best fits your safety needs. All plans include our core emergency response features.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              {plan.highlighted && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="bg-blue-600 text-white px-4 py-1 text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card
                className={`h-full border transition-all ${
                  plan.highlighted
                    ? "border-blue-400 bg-blue-900 shadow-2xl shadow-blue-900/50"
                    : "border-blue-800 bg-blue-900/50 shadow-lg"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    {plan.name}
                  </CardTitle>
                  <p className="mt-2 text-sm text-gray-400">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-8">
                  {/* Pricing */}
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-400">{plan.currency}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      {plan.period}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-blue-200">
                      What&apos;s included:
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3"
                        >
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                          <span className="text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Everything you need to know about our pricing plans
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-blue-900/50 border border-blue-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-2">
              Can I upgrade or downgrade my plan?
            </h3>
            <p className="text-gray-400">
              Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>

          <div className="bg-blue-900/50 border border-blue-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-400">
              We accept all major payment methods including credit cards, mobile money, and bank transfers.
            </p>
          </div>

          <div className="bg-blue-900/50 border border-blue-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-2">
              Is there a free trial?
            </h3>
            <p className="text-gray-400">
              Yes! All new users get a 7-day free trial to explore our platform and experience the features firsthand.
            </p>
          </div>

          <div className="bg-blue-900/50 border border-blue-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-2">
              What if I have more than 5 family members?
            </h3>
            <p className="text-gray-400">
              If you need more than 5 sub-accounts, we recommend upgrading to our Enterprise plan for unlimited users.
            </p>
          </div>

          <div className="bg-blue-900/50 border border-blue-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-2">
              Do you offer discounts for annual billing?
            </h3>
            <p className="text-gray-400">
              Yes! Choose annual billing and save 20% on any plan. Contact our sales team for bulk pricing.
            </p>
          </div>

          <div className="bg-blue-900/50 border border-blue-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-2">
              Can I cancel my subscription anytime?
            </h3>
            <p className="text-gray-400">
              Absolutely. You can cancel your subscription anytime without any hidden fees or penalties. Your access continues until the end of your billing period.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 px-6 py-16 sm:py-20 border-t border-blue-800">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to protect your community?
          </h2>
          <p className="mb-8 text-lg text-blue-200">
            Start with our free 7-day trial. No credit card required.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-blue-950 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </div>
  )
}