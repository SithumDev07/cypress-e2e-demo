import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import { Provider } from 'react-redux';
// import store from './store';

import Navbar from './components/Navbar/Navbar'
import RegisterStudent from './views/Register/RegisterStudent'
import RegisterInstructor from './views/Register/RegisterInstructor'
import RegisterParent from './views/Register/RegisterParent'
import QRGenerator from './components/QR/QRgenerator'
import QRgenerator1 from './components/QRGenerator'
import QRscanner from './components/QR/QRscanner'
import Login from './views/Login/Login'
import Announcement from './views/Instructor/Announcement';
import Classes from './views/PublicPages/Classes';
import Notification from './views/Student/NotificationView';
import ClassDashboard from './views/Student/ClassDashboard/ClassDashboard';
import CreateClass from './views/Admin/CreateClass';
import MyClasses from './views/Instructor/MyClasses';
import GetAllInstructors from './views/Admin/GetAllInstructors';
import GetAllStudents from './views/Admin/GetAllStudents';
import GetAllParents from './views/Admin/GetAllParents';
import MyStudentClasses from './views/Parent/MyStudentClasses';
import { useEffect, useState } from 'react';
import LocalStorageServices from './services/LocalStorageServices';
import MarkAttendance from './views/Attendance/MarkAttendance';
import CheckAttendance from './views/Attendance/CheckAttendance';
import MyStudents from './views/Parent/MyStudents';
import StudentMonthlyPayment from './views/Parent/StudentMonthlyPayment';
import MyClassStudents from './views/Instructor/MyClassStudents';
import EarlyLeave from './views/StaffMember/EarlyLeave';
import UploadResult from './views/Instructor/UploadResult';
import ViewAllExams from './views/Instructor/ViewAllExams';
import StudentResults from './views/Parent/StudentResults';
import StudentMyClasses from './views/Student/ClassDashboard/StudentMyClasses';
import AttendanceView from './views/Parent/AttendanceView';
import Profile from './views/Profile';
import ClassFeesPaidMonthly from './views/Instructor/ClassFeesPaid';
import InstructorPayments from './views/Admin/InstructorPayments'
import UploadClassContent from './views/Instructor/UploadClassContent'



function App() {
  const [loaded, setLoaded] = useState(false);
  let user = LocalStorageServices.getItem('user')
  console.log("TOKEN", user)
  useEffect(()=>{
    if (user != null){
      setLoaded(true)
    }else{
      setLoaded(false)
    }
  },[user])


  return (
    <div className="App">
        <BrowserRouter>

            {/* //* load navbar if only the user is registered */}
            {loaded ? 
                <Navbar/>
              : null
            }

          <Routes>
            
            
            {/* //! public routes */}
            <Route
              path='/'
              element={<Login/>}
            />
            <Route
              path='/register/student'
              element={<RegisterStudent/>}
            />
            <Route
              path='/register/parent'
              element={<RegisterParent/>}
            />
            <Route
              path='/classes'
              element={<Classes/>}
            />



            {/* //! default route */}
            <Route 
              path="*" 
              element={<Navigate replace to="/profile" />} 
            />



            {/* //! protected routes */}
            <Route
              path='/profile'
              element={<Profile/>}
            />
            <Route
              path='/register/instructor'
              element={!loaded ? <Navigate replace to="/" /> : <RegisterInstructor/>}
            />

            <Route
              path='/notification/view'
              element={!loaded ? <Navigate replace to="/" /> : <Notification/>}
            />
            <Route
              path='/student/dashboard'
              element={!loaded ? <Navigate replace to="/" /> : <StudentMyClasses/>}
            />
            <Route
              path='/class/dashboard/:id'
              element={!loaded ? <Navigate replace to="/" /> : <ClassDashboard/>}
            />
            <Route
              path='/class/instructor/:id'
              element={!loaded ? <Navigate replace to="/" /> : <MyClasses/>}
            />
            <Route
              path='/class/students/:classID'
              element={!loaded ? <Navigate replace to="/" /> : <MyClassStudents/>}
            />
            <Route
              path='/class/create'
              element={!loaded ? <Navigate replace to="/" /> : <CreateClass/>}
            />


            
            
            
            <Route
              path='/instructor/all'
              element={!loaded ? <Navigate replace to="/" /> : <GetAllInstructors/>}
            />
            <Route
              path='/student/all'
              element={!loaded ? <Navigate replace to="/" /> : <GetAllStudents/>}
            />
            <Route
              path='/parent/all'
              element={!loaded ? <Navigate replace to="/" /> : <GetAllParents/>}
            />

            
            <Route
              path='/earlyleave'
              element={!loaded ? <Navigate replace to="/" /> : <EarlyLeave/>}
            />
            <Route
              path='/announcement/send'
              element={!loaded ? <Navigate replace to="/" /> : <Announcement/>}
            />
            <Route
              path='/qrgenerator'
              element={!loaded ? <Navigate replace to="/" /> : <QRGenerator/>}
            />
            <Route
              path='/qrscanner'
              element={!loaded ? <Navigate replace to="/" /> : <QRscanner/>}
            />

            {/*sample qr */}
            {/* <Route
              path='/1'
              element={<QRgenerator1/>}
            /> */}


            <Route
              path='/mark-attendance'
              element={!loaded ? <Navigate replace to="/" /> : <MarkAttendance/>}
            />
            <Route
              path='/check-attendance'
              element={!loaded ? <Navigate replace to="/" /> : <CheckAttendance/>}
            />

            <Route
              path='/show-paid-fees/:instructor_id'
              element={!loaded ? <Navigate replace to="/" /> : <ClassFeesPaidMonthly/>}
            />
            <Route
              path='/payments/instructor/:instructor_id'
              element={!loaded ? <Navigate replace to="/" /> : <InstructorPayments/>}
            />
            <Route
              path='/release-result'
              element={!loaded ? <Navigate replace to="/" /> : <UploadResult/>}
            />
            <Route
              path='/upload-class-content/:id'
              element={!loaded ? <Navigate replace to="/" /> : <UploadClassContent/>}
            />
            <Route
              path='/viewAllExams'
              element={!loaded ? <Navigate replace to="/" /> : <ViewAllExams/>}
            />



            <Route
              path='/results/:class_ID/:ST_ID'
              element={!loaded ? <Navigate replace to="/" /> : <StudentResults/>}
            />
            <Route
              path='/MyStudents'
              element={!loaded ? <Navigate replace to="/" /> : <MyStudents/>}
            />
            <Route
              path='/parent/dashboard'
              element={!loaded ? <Navigate replace to="/" /> : <MyStudentClasses/>}
            />
            <Route
              path='/parent/classPayments/:classId'
              element={!loaded ? <Navigate replace to="/" /> : <StudentMonthlyPayment/>}
            />
            <Route
              path='/StudentAttendance/:class_ID/:ST_ID'
              element={!loaded ? <Navigate replace to="/" /> : <AttendanceView/>}
            />


          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
