import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Personalized from './components/Personalized';
import "./App.css";
import Footer from './components/Footer';
import MyResults from "./components/MyResults";
import Popup from './components/Popup';
import Courses from './components/Courses';
import About from './components/About';
import AuthPage from './components/AuthPage';
import MockTests from './components/MockTests';
import MockTest from './components/MockTest';
import MockTestForm from './components/MockTestForm';
import TestPage from './components/TestPage';
import OnlineCourses from './components/OnlineCourses';
import OfflineCourses from './components/OfflineCourses';
import CourseDetail from './components/CourseDetail';
import MyCourses from './components/MyCourses';
import TodayLiveClasses from './components/TodayLiveClasses';
import LiveCourses from './components/LiveCourses';
import RecordedCourses from './components/RecordedCourses';
import AllCourses from './components/AllCourses';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Books from './components/Book';
import CurrentAffairs from './components/CurrentAffairs';
import DailyDose from './components/DailyDose';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import ErrorBoundary from './components/ErrorBoundary';
import UserProfile from './components/UserProfile';
import Enroll from './components/Enroll';


function Home() {
  return (
    <>
      <Banner />
      <Personalized />
      <Courses />
      <OnlineCourses />
      <OfflineCourses />
      <About />
    </>
  );
}

function LoggedInHome() {
  return (
    <>
      <Banner />
      <MyCourses />
      <TodayLiveClasses />
      <LiveCourses />
      <RecordedCourses />
      <AllCourses />
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Popup />
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={isAuthenticated ? <LoggedInHome /> : <Home />} />
          <Route path="/auth" element={<AuthPage />} />
         

          {/* ✅ Ensure Users Can See Mock Test Categories */}
          <Route path="/testseries/:subCategoryId" element={<MockTests />} />

          {/* ✅ Ensure Users Must Be Logged in Before Taking a Mock Test */}
          <Route path="/mocktest/:testId" element={isAuthenticated ? <MockTest /> : <Navigate to="/auth" />} />

          {/* ✅ Ensure Users Must Be Logged in Before Starting the Exam */}
          <Route path="/mocktestForm/:id" element={isAuthenticated ? <MockTestForm /> : <Navigate to="/auth" />} />

          <Route path="/test/:testId" element={<TestPage />} />
          <Route path="/online-courses" element={<OnlineCourses />} />
          <Route path="/offline-courses" element={<OfflineCourses />} />
          <Route path="/course/:type/:courseId" element={<CourseDetail />} />
          <Route path="/my-courses" element={isAuthenticated ? <MyCourses /> : <Navigate to="/auth" />} />
          <Route path="/today-live-classes" element={isAuthenticated ? <TodayLiveClasses /> : <Navigate to="/auth" />} />
          <Route path="/live-courses" element={isAuthenticated ? <LiveCourses /> : <Navigate to="/auth" />} />
          <Route path="/recorded-courses" element={isAuthenticated ? <RecordedCourses /> : <Navigate to="/auth" />} />
          <Route path="/all-courses" element={isAuthenticated ? <AllCourses /> : <Navigate to="/auth" />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/daily-study/books" element={<Books />} />
          <Route path="/daily-study/daily-dose" element={<DailyDose />} />
          <Route path="/daily-study/current-affairs" element={<CurrentAffairs />} />
          <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/auth" />} />
          <Route path="/change-password" element={isAuthenticated ? <ChangePassword /> : <Navigate to="/auth" />} />
          <Route path="/my-results" element={isAuthenticated ? <MyResults /> : <Navigate to="/auth" />} />
          <Route path="/enroll" element={<Enroll/>} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
}

export default App;
