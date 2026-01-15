# Privacy Policy - SDG Commanders Mobile App

**Last Updated:** January 15, 2026

## Introduction

SDG Commanders ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how our mobile application collects, uses, discloses, and safeguards your information when you use our application.

Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our app.

---

## 1. Information We Collect

### 1.1 Information You Provide Directly

- **User Account Information:** Name, email address, phone number, and authentication credentials
- **Profile Information:** Profile picture, bio, location preferences, and group affiliations
- **Emergency Contact Information:** Names, phone numbers, and relationships of emergency contacts
- **SOS Reports:** Incident descriptions, photos, and associated metadata

### 1.2 Information Collected Automatically Through Device APIs

We collect certain information automatically through the device APIs described below:

---

## 2. Device APIs and How We Use Them

### 2.1 Location Services (expo-location)

**What we collect:** 
- Your precise geographic coordinates (latitude and longitude)
- Altitude and accuracy information
- Timestamp of location capture

**How we use it:**
- Display your position on maps within the app
- Enable group members to find you in emergency situations
- Calculate distances between users for navigation purposes
- Power the SOS (Distress Signal) feature to alert nearby responders of your location
- Show directions to other group members using Google Maps integration

**Permission:** The app requests "Access Location" permission. You can grant this as:
- "While Using the App" (foreground only)
- "Always" (foreground and background)

**Data Storage:** Location data is transmitted to our Supabase backend and may be stored temporarily during active SOS responses or group activities.

**Your Control:** You can revoke location permission at any time through your device settings. When permission is denied, location-dependent features will not function.

---

### 2.2 Camera and Photo Library Access (expo-image-picker)

**What we collect:**
- Images and videos you select from your device's photo library
- Camera footage you capture using the app's camera feature
- Metadata associated with images (size, format, timestamp)

**How we use it:**
- Allow you to upload a profile picture for your user account
- Enable you to attach photos to SOS emergency reports
- Facilitate group member identification through profile pictures
- Store images in our cloud storage system for display within the app

**Permissions Requested:**
- "Camera" - Access to capture photos directly
- "Photo Library" - Access to select existing photos from your device

**Data Storage:** Images are uploaded to Supabase storage and can be accessed by relevant group members and emergency responders.

**Your Control:** You can deny camera or photo library access in your device settings. This will prevent you from adding profile pictures or attaching images to reports, but the app will continue to function for other features.

---

### 2.3 Push Notifications (expo-notifications)

**What we collect:**
- Device notification tokens
- Notification interaction history (opened, dismissed)
- Device information required for push notification delivery

**How we use it:**
- Send you emergency alerts and SOS updates
- Notify you when group members request assistance
- Inform you of group activity and messages
- Alert you about important app updates and system notices

**Permission:** You're prompted to allow "Notifications" when first using the app.

**Data Storage:** Device tokens are stored on our servers and associated with your user account for push delivery purposes.

**Your Control:** You can disable notifications in your device settings. You can also manage notification preferences within the app.

---

### 2.4 Device Information (expo-device)

**What we collect:**
- Device model and manufacturer
- Operating system version
- Device unique identifiers

**How we use it:**
- Ensure app compatibility and functionality
- Debug technical issues
- Analyze crash reports and performance metrics
- Personalize your experience based on device capabilities

**Data Storage:** Device information is logged with analytics data and error reports.

**Your Control:** This collection is automatic and cannot be disabled without uninstalling the app. However, no personally identifying information is stored with this data.

---

### 2.5 Maps and Navigation (react-native-maps & react-native-maps-directions)

**What we collect:**
- Map view interactions and zoom levels
- Route requests between locations
- Start and end points for directions

**How we use it:**
- Display interactive maps showing group member locations
- Provide turn-by-turn navigation directions
- Integrate with Google Maps for route planning
- Calculate distances between users

**Third-Party Services:** Google Maps integration requires sharing coordinates with Google's services to generate directions and map tiles.

**Your Control:** Map features are optional. You can view group member locations without requesting directions.

---

### 2.6 Local Device Storage (AsyncStorage)

**What we collect:**
- User authentication tokens
- Cached user data and group information
- App preferences and settings
- Temporary offline data

**How we use it:**
- Maintain your login session
- Allow offline functionality
- Improve app performance through caching
- Remember your preferences

**Data Storage:** Information is stored locally on your device and encrypted by your device's security mechanisms.

**Your Control:** You can clear local data by uninstalling the app or through device settings.

---

## 3. Supabase Backend Integration

Our app uses **Supabase** as its primary backend service. The following data is transmitted to and stored on Supabase servers:

- User authentication data (email, password hash)
- User profile information
- Location coordinates during active sessions
- SOS reports and associated metadata
- Group membership and relationships
- Uploaded images and media files
- Push notification tokens

**Supabase Privacy:** Supabase implements industry-standard security practices. For more information, visit [Supabase Privacy Policy](https://supabase.com/privacy).

---

## 4. Data Sharing and Third Parties

We share your information only in the following circumstances:

### 4.1 With Group Members
- Group members can see your location when you're part of an active group
- Your profile information is visible to other group members
- Emergency contact information may be visible during SOS activation

### 4.2 With Emergency Services
- During an active SOS, your location and incident details may be shared with authorized emergency responders and group coordinators

### 4.3 Third-Party Services
We integrate with:
- **Google Maps** - For map display and directions (shares coordinates)
- **Supabase** - For backend services and data storage
- **Expo** - For app updates and crash reporting

### 4.4 Legal Requirements
We may disclose your information if required by law, court order, or government request.

---

## 5. Data Security

We implement the following security measures:

- **Encryption in Transit:** All data transmitted between the app and our servers uses HTTPS/TLS encryption
- **Secure Authentication:** JWT tokens and Supabase authentication mechanisms
- **Access Controls:** Only authorized personnel can access stored data
- **Regular Audits:** We conduct security reviews of our systems

**Limitations:** No security system is impenetrable. While we strive to protect your data, we cannot guarantee absolute security.

---

## 6. Data Retention

We retain your data as follows:

- **Active Account:** Data is retained while your account is active
- **After Account Deletion:** Account data is deleted within 30 days. However, cached data in backups may be retained for up to 90 days
- **SOS Records:** Incident reports may be retained for legal and operational purposes
- **Location History:** Real-time location data is not permanently stored; it's updated as you move

---

## 7. Your Privacy Rights

### 7.1 Access
You can request access to the personal data we hold about you.

### 7.2 Correction
You can update your profile information directly within the app.

### 7.3 Deletion
You can request deletion of your account and associated data. Certain data may be retained for legal compliance.

### 7.4 Opt-Out
You can:
- Disable location services in device settings
- Disable camera and photo library access
- Disable push notifications
- Revoke app permissions at any time

**Note:** Disabling certain permissions may limit app functionality.

---

## 8. Children's Privacy

This app is not intended for children under 13 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect information from children under 13. If we become aware that we've collected data from a child under 13, we will delete such data immediately.

---

## 9. International Data Transfers

Your data may be stored and processed in countries other than your country of residence. By using this app, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection rules.

---

## 10. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy in the app and updating the "Last Updated" date. Your continued use of the app following changes constitutes your acceptance of the updated Privacy Policy.

---

## 11. Contact Us

If you have questions about this Privacy Policy or our privacy practices, please contact us at:

**SDG Commanders Support**
- Email: privacy@sdgcommanders.com
- Address: [Company Address]
- Phone: [Support Phone Number]

---

## 12. Additional Notices

### Android-Specific Information
- The app requests the following Android permissions: ACCESS_FINE_LOCATION, CAMERA, READ_MEDIA_IMAGES, POST_NOTIFICATIONS
- You can manage these permissions in Settings > Apps > SDG Commanders > Permissions

### iOS-Specific Information
- The app requests the following iOS permissions: Location, Photos/Camera, Notifications
- You can manage these permissions in Settings > Privacy > [Permission Type]

---

**End of Privacy Policy**

This policy should be reviewed regularly and updated as new features or data practices are introduced to the app.
