<ins>**all routes in project:**</ins>

<ins>USERS</ins>:

GET:

- getAllUsers()

POST:

- createUser(CreateUserDto)

PUT:

- updateUser(userId,CreateUserDto)

DELETE:

- deleteUser(userId)

---

<ins>TOASTS:</ins>

GET:

- getAllToasts()
- getPastToastForUser(userId)
- getAllPastToast()
- getAllFutureToasts()
- getAmountToastsForCurrentPeriod()
- getAllTimeRecord()
- getAmountOfToastCurrentPeriodPerUser()

POST:

- createToast(createToastDto)

PUT:

- updateToast(toastId, createToastDto)

DELETE:

- deleteToast(toastId)

---

<ins>CRIMINALS:</ins>

GET:

- getAllCriminals()

POST:

- createCriminal(CreateCriminalDto)

PUT:

- updateCriminal(criminalId,createCriminalDto)

DELETE:

- deleteCriminal(criminalId)

---

<ins>TOAST-PARTICIPANTS:</ins>

GET:

- getAllParticipantsForToast()

POST:

- createToastParticipant(createToastParticipantDto)

DELETE:

- deleteToastParticipant(toastParticipantId)
