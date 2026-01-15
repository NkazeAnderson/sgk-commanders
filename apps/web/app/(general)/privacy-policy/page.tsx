
export const metadata = {
  title: 'Privacy Policy - SDG Commanders',
  description: 'Read our comprehensive privacy policy for the SDG Commanders mobile and web applications.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-blue-100">Last Updated: January 15, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            SDG Commanders ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how our mobile application collects, uses, discloses, and safeguards your information when you use our application.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg font-semibold text-red-600">
            Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our app.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            1. Information We Collect
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">1.1 Information You Provide Directly</h3>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700"><strong>User Account Information:</strong> Name, email address, phone number, and authentication credentials</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700"><strong>Profile Information:</strong> Profile picture, bio, location preferences, and group affiliations</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700"><strong>Emergency Contact Information:</strong> Names, phone numbers, and relationships of emergency contacts</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700"><strong>SOS Reports:</strong> Incident descriptions, photos, and associated metadata</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">1.2 Information Collected Automatically Through Device APIs</h3>
            <p className="text-gray-700">We collect certain information automatically through the device APIs described below.</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            2. Device APIs and How We Use Them
          </h2>

          {/* 2.1 Location Services */}
          <div className="mb-10 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2.1 Location Services (expo-location)</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">What we collect:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Your precise geographic coordinates (latitude and longitude)</li>
                <li className="text-gray-700">• Altitude and accuracy information</li>
                <li className="text-gray-700">• Timestamp of location capture</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">How we use it:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Display your position on maps within the app</li>
                <li className="text-gray-700">• Enable group members to find you in emergency situations</li>
                <li className="text-gray-700">• Calculate distances between users for navigation purposes</li>
                <li className="text-gray-700">• Power the SOS (Distress Signal) feature to alert nearby responders of your location</li>
                <li className="text-gray-700">• Show directions to other group members using Google Maps integration</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Permission:</h4>
              <p className="text-gray-700 mb-2">The app requests "Access Location" permission. You can grant this as:</p>
              <ul className="ml-4 space-y-1">
                <li className="text-gray-700">• "While Using the App" (foreground only)</li>
                <li className="text-gray-700">• "Always" (foreground and background)</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Data Storage:</h4>
              <p className="text-gray-700">Location data is transmitted to our Supabase backend and may be stored temporarily during active SOS responses or group activities.</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Your Control:</h4>
              <p className="text-gray-700">You can revoke location permission at any time through your device settings. When permission is denied, location-dependent features will not function.</p>
            </div>
          </div>

          {/* 2.2 Camera and Photo Library */}
          <div className="mb-10 bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2.2 Camera and Photo Library Access (expo-image-picker)</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">What we collect:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Images and videos you select from your device's photo library</li>
                <li className="text-gray-700">• Camera footage you capture using the app's camera feature</li>
                <li className="text-gray-700">• Metadata associated with images (size, format, timestamp)</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">How we use it:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Allow you to upload a profile picture for your user account</li>
                <li className="text-gray-700">• Enable you to attach photos to SOS emergency reports</li>
                <li className="text-gray-700">• Facilitate group member identification through profile pictures</li>
                <li className="text-gray-700">• Store images in our cloud storage system for display within the app</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Permissions Requested:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• "Camera" - Access to capture photos directly</li>
                <li className="text-gray-700">• "Photo Library" - Access to select existing photos from your device</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Data Storage:</h4>
              <p className="text-gray-700">Images are uploaded to Supabase storage and can be accessed by relevant group members and emergency responders.</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Your Control:</h4>
              <p className="text-gray-700">You can deny camera or photo library access in your device settings. This will prevent you from adding profile pictures or attaching images to reports, but the app will continue to function for other features.</p>
            </div>
          </div>

          {/* 2.3 Push Notifications */}
          <div className="mb-10 bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2.3 Push Notifications (expo-notifications)</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">What we collect:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Device notification tokens</li>
                <li className="text-gray-700">• Notification interaction history (opened, dismissed)</li>
                <li className="text-gray-700">• Device information required for push notification delivery</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">How we use it:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Send you emergency alerts and SOS updates</li>
                <li className="text-gray-700">• Notify you when group members request assistance</li>
                <li className="text-gray-700">• Inform you of group activity and messages</li>
                <li className="text-gray-700">• Alert you about important app updates and system notices</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Permission:</h4>
              <p className="text-gray-700">You're prompted to allow "Notifications" when first using the app.</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Data Storage:</h4>
              <p className="text-gray-700">Device tokens are stored on our servers and associated with your user account for push delivery purposes.</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Your Control:</h4>
              <p className="text-gray-700">You can disable notifications in your device settings. You can also manage notification preferences within the app.</p>
            </div>
          </div>

          {/* 2.4 Device Information */}
          <div className="mb-10 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2.4 Device Information (expo-device)</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">What we collect:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Device model and manufacturer</li>
                <li className="text-gray-700">• Operating system version</li>
                <li className="text-gray-700">• Device unique identifiers</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">How we use it:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Ensure app compatibility and functionality</li>
                <li className="text-gray-700">• Debug technical issues</li>
                <li className="text-gray-700">• Analyze crash reports and performance metrics</li>
                <li className="text-gray-700">• Personalize your experience based on device capabilities</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Data Storage:</h4>
              <p className="text-gray-700">Device information is logged with analytics data and error reports.</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Your Control:</h4>
              <p className="text-gray-700">This collection is automatic and cannot be disabled without uninstalling the app. However, no personally identifying information is stored with this data.</p>
            </div>
          </div>

          {/* 2.5 Maps and Navigation */}
          <div className="mb-10 bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2.5 Maps and Navigation (react-native-maps & react-native-maps-directions)</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">What we collect:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Map view interactions and zoom levels</li>
                <li className="text-gray-700">• Route requests between locations</li>
                <li className="text-gray-700">• Start and end points for directions</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">How we use it:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Display interactive maps showing group member locations</li>
                <li className="text-gray-700">• Provide turn-by-turn navigation directions</li>
                <li className="text-gray-700">• Integrate with Google Maps for route planning</li>
                <li className="text-gray-700">• Calculate distances between users</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Third-Party Services:</h4>
              <p className="text-gray-700">Google Maps integration requires sharing coordinates with Google's services to generate directions and map tiles.</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Your Control:</h4>
              <p className="text-gray-700">Map features are optional. You can view group member locations without requesting directions.</p>
            </div>
          </div>

          {/* 2.6 Local Device Storage */}
          <div className="mb-10 bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2.6 Local Device Storage (AsyncStorage)</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">What we collect:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• User authentication tokens</li>
                <li className="text-gray-700">• Cached user data and group information</li>
                <li className="text-gray-700">• App preferences and settings</li>
                <li className="text-gray-700">• Temporary offline data</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">How we use it:</h4>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Maintain your login session</li>
                <li className="text-gray-700">• Allow offline functionality</li>
                <li className="text-gray-700">• Improve app performance through caching</li>
                <li className="text-gray-700">• Remember your preferences</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Data Storage:</h4>
              <p className="text-gray-700">Information is stored locally on your device and encrypted by your device's security mechanisms.</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Your Control:</h4>
              <p className="text-gray-700">You can clear local data by uninstalling the app or through device settings.</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            3. Supabase Backend Integration
          </h2>
          <p className="text-gray-700 mb-4">
            Our app uses <strong>Supabase</strong> as its primary backend service. The following data is transmitted to and stored on Supabase servers:
          </p>
          <ul className="ml-4 space-y-2 mb-6">
            <li className="text-gray-700">• User authentication data (email, password hash)</li>
            <li className="text-gray-700">• User profile information</li>
            <li className="text-gray-700">• Location coordinates during active sessions</li>
            <li className="text-gray-700">• SOS reports and associated metadata</li>
            <li className="text-gray-700">• Group membership and relationships</li>
            <li className="text-gray-700">• Uploaded images and media files</li>
            <li className="text-gray-700">• Push notification tokens</li>
          </ul>
          <p className="text-gray-700">
            <strong>Supabase Privacy:</strong> Supabase implements industry-standard security practices. For more information, visit <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Supabase Privacy Policy</a>.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            4. Data Sharing and Third Parties
          </h2>
          <p className="text-gray-700 mb-6">We share your information only in the following circumstances:</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 With Group Members</h3>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• Group members can see your location when you're part of an active group</li>
                <li className="text-gray-700">• Your profile information is visible to other group members</li>
                <li className="text-gray-700">• Emergency contact information may be visible during SOS activation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 With Emergency Services</h3>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• During an active SOS, your location and incident details may be shared with authorized emergency responders and group coordinators</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Third-Party Services</h3>
              <p className="text-gray-700 mb-2">We integrate with:</p>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• <strong>Google Maps</strong> - For map display and directions (shares coordinates)</li>
                <li className="text-gray-700">• <strong>Supabase</strong> - For backend services and data storage</li>
                <li className="text-gray-700">• <strong>Expo</strong> - For app updates and crash reporting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.4 Legal Requirements</h3>
              <p className="text-gray-700">We may disclose your information if required by law, court order, or government request.</p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            5. Data Security
          </h2>
          <p className="text-gray-700 mb-4">We implement the following security measures:</p>
          <ul className="ml-4 space-y-2 mb-6">
            <li className="text-gray-700"><strong>Encryption in Transit:</strong> All data transmitted between the app and our servers uses HTTPS/TLS encryption</li>
            <li className="text-gray-700"><strong>Secure Authentication:</strong> JWT tokens and Supabase authentication mechanisms</li>
            <li className="text-gray-700"><strong>Access Controls:</strong> Only authorized personnel can access stored data</li>
            <li className="text-gray-700"><strong>Regular Audits:</strong> We conduct security reviews of our systems</li>
          </ul>
          <p className="text-gray-700 bg-orange-50 p-4 rounded border-l-4 border-orange-600">
            <strong>Limitations:</strong> No security system is impenetrable. While we strive to protect your data, we cannot guarantee absolute security.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            6. Data Retention
          </h2>
          <p className="text-gray-700 mb-4">We retain your data as follows:</p>
          <ul className="ml-4 space-y-2">
            <li className="text-gray-700"><strong>Active Account:</strong> Data is retained while your account is active</li>
            <li className="text-gray-700"><strong>After Account Deletion:</strong> Account data is deleted within 30 days. However, cached data in backups may be retained for up to 90 days</li>
            <li className="text-gray-700"><strong>SOS Records:</strong> Incident reports may be retained for legal and operational purposes</li>
            <li className="text-gray-700"><strong>Location History:</strong> Real-time location data is not permanently stored; it's updated as you move</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            7. Your Privacy Rights
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">7.1 Access</h3>
              <p className="text-gray-700">You can request access to the personal data we hold about you.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">7.2 Correction</h3>
              <p className="text-gray-700">You can update your profile information directly within the app.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">7.3 Deletion</h3>
              <p className="text-gray-700">You can request deletion of your account and associated data. Certain data may be retained for legal compliance.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">7.4 Opt-Out</h3>
              <p className="text-gray-700 mb-2">You can:</p>
              <ul className="ml-4 space-y-1">
                <li className="text-gray-700">• Disable location services in device settings</li>
                <li className="text-gray-700">• Disable camera and photo library access</li>
                <li className="text-gray-700">• Disable push notifications</li>
                <li className="text-gray-700">• Revoke app permissions at any time</li>
              </ul>
              <p className="text-gray-700 mt-3 font-semibold text-red-600">Note: Disabling certain permissions may limit app functionality.</p>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            8. Children's Privacy
          </h2>
          <p className="text-gray-700">
            This app is not intended for children under 13 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect information from children under 13. If we become aware that we've collected data from a child under 13, we will delete such data immediately.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            9. International Data Transfers
          </h2>
          <p className="text-gray-700">
            Your data may be stored and processed in countries other than your country of residence. By using this app, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection rules.
          </p>
        </section>

        {/* Section 10 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            10. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy in the app and updating the "Last Updated" date. Your continued use of the app following changes constitutes your acceptance of the updated Privacy Policy.
          </p>
        </section>

        {/* Section 11 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            11. Contact Us
          </h2>
          <p className="text-gray-700 mb-4">If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="font-semibold text-gray-900 mb-3">SDG Commanders Support</p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Email:</strong> <a href="mailto:privacy@sdgcommanders.com" className="text-blue-600 hover:text-blue-800">privacy@sdgcommanders.com</a></li>
              <li><strong>Address:</strong> [Company Address]</li>
              <li><strong>Phone:</strong> [Support Phone Number]</li>
            </ul>
          </div>
        </section>

        {/* Section 12 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            12. Additional Notices
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Android-Specific Information</h3>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• The app requests the following Android permissions: ACCESS_FINE_LOCATION, CAMERA, READ_MEDIA_IMAGES, POST_NOTIFICATIONS</li>
                <li className="text-gray-700">• You can manage these permissions in Settings &gt; Apps &gt; SDG Commanders &gt; Permissions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">iOS-Specific Information</h3>
              <ul className="ml-4 space-y-2">
                <li className="text-gray-700">• The app requests the following iOS permissions: Location, Photos/Camera, Notifications</li>
                <li className="text-gray-700">• You can manage these permissions in Settings &gt; Privacy &gt; [Permission Type]</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t-2 border-gray-200 pt-8 text-center text-gray-600">
          <p className="font-semibold mb-2">End of Privacy Policy</p>
          <p className="text-sm">This policy should be reviewed regularly and updated as new features or data practices are introduced to the app.</p>
        </div>
      </div>
    </div>
  );
}