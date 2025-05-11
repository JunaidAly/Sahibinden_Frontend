import React from 'react'
import PersonalInformationForm from './PersonalInformationForm'
import Email from './Email'
import MobilePhone from './MobilePhone'
import ChangePassword from './ChangePassword'
import AccountVerification from './AccountVerification'
import AccountCancellation from './AccountCancellation'
import TwoStepVerification from './TwoStepVerification'
import RecoveryEmail from './RecoveryEmail'
import SessionsAndDevices from './SessionsAndDevices'
import MySavedCards from './MySavedCards'
import AccountActivities from './AccountActivities'
import AccountHolder from './AccountHolder'
import NotificationPreferences from './NotificationPreferences'
import CommercialConsentComponent from './CommercialConsentComponent'
import MessageReadInfoComponent from './MessageReadInfoComponent'

function MyAccountContent({ activeComponent }) {
  return (
    <>
      {activeComponent === 'personalInfo' && <PersonalInformationForm />}
      {activeComponent === 'email' && <Email />}
      {activeComponent === 'mobilePhone' && <MobilePhone />}
      {activeComponent === 'passwordChange' && <ChangePassword />}
      {activeComponent === 'accountVerification' && <AccountVerification />}
      {activeComponent === 'accountCancellation' && <AccountCancellation />}
      {activeComponent === 'twoStepVerification' && <TwoStepVerification />}
      {activeComponent === 'recoveryemail' && <RecoveryEmail />}
      {activeComponent === 'sessiondevices' && <SessionsAndDevices />}
      {activeComponent === 'savedCards' && <MySavedCards />}
      {activeComponent === 'accountActivities' && <AccountActivities />}
      {activeComponent === 'accountHolders' && <AccountHolder />}
      {activeComponent === 'NotificationPreferences' && (
            <NotificationPreferences />
        )}
      {activeComponent === 'ElectronicMessage' && (
                <CommercialConsentComponent />
            )}
      {activeComponent === 'MessageReadInformation' && (
                    <MessageReadInfoComponent />
                )}
    </>
  )
}

export default MyAccountContent