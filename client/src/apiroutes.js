export const INIT = 'http://localhost:4000'
export const ENDPOINT = `${INIT}/akura`
export const PUBLIC_ENDPOINT = `${INIT}/public/akura`


export const CREATE_USER = `${ENDPOINT}/user`
export const USER_PROFILE = `${ENDPOINT}/user/profile`


//auth
export const LOGIN = `${PUBLIC_ENDPOINT}/login`



// admin
export const CREATE_CLASS = `${ENDPOINT}/class`
export const GET_ALL_INSTRUCTORS = `${ENDPOINT}/instructor`
export const GET_ALL_PARENTS = `${ENDPOINT}/parent`
export const GET_ALL_STUDENTS = `${ENDPOINT}/student`

// stm


// ins
export const GET_CLASSE_FOR_INSTRUCTOR = `${ENDPOINT}/getInstructorClasses`
export const GET_ALL_STUDENTS_OF_A_CLASS = `${ENDPOINT}/allStudents`
export const CLASS_FEES_INSTRUCTOR = `${ENDPOINT}/getClassFeesForInstructor`


// stu


// pa
export const GET_STUDENTS_OF_SINGLE_PARENT = `${ENDPOINT}/parent/students`

// cls
export const CLASS_PAYMENT = `${ENDPOINT}/payment`
export const STUDENT_MY_CLASSES = `${ENDPOINT}/allAddmissions`

// announcement + notification
export const NOTIFICATION = `${ENDPOINT}/notification/`
export const CREATE_NOTIFICATION = `${ENDPOINT}/instructor/notification/create/`
export const CREATE_EARLY_LEAVE_NOTIFICATION = `${ENDPOINT}/notification/create/`


//attendace
export const MARK_ATTENDANCE = `${ENDPOINT}/mark-attendance`
export const SHOW_ATTENDANCE = `${ENDPOINT}/show-attendance`
export const GET_ATTENDANCE = `${ENDPOINT}/getStudentAttendance`

//result
export const ADD_RESULT = `${ENDPOINT}/result`
export const GET_ALLEXAMS = `${ENDPOINT}/getAllAssignmentIdsOfClass`
export const GET_EXAMSRESULT = `${ENDPOINT}/getAllResultsOfAssignment`
export const GET_STUDENTRESULT = `${ENDPOINT}/getAllResultsOfAssignmentForParentView`

//payments
export const GET_INSTITUTE_INSTRUCTOR_PAYMENTS = `${ENDPOINT}/instructor/institute-payments`