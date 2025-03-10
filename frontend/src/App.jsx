import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Banner from './components/Banner';
// import { StoreProvider } from './context/Store';
import Personalized from './components/Personalized';
import "./App.css";
import Footer from './components/Footer';
import Popup from './components/Popup';
import Courses from './components/Courses';
import About from './components/About';
import AuthPage from './components/AuthPage';
import MockTests from './components/MockTests';
import TestPage from './components/TestPage';
import OnlineCourses from './components/OnlineCourses';
import OfflineCourses from './components/OfflineCourses';
import CourseDetail from './components/CourseDetail';
import DailyStudy from './components/DailyStudy';
import MyCourses from './components/MyCourses';
import TodayLiveClasses from './components/TodayLiveClasses';
import LiveCourses from './components/LiveCourses';
import RecordedCourses from './components/RecordedCourses';
import AllCourses from './components/AllCourses';
import MocktestForm from './components/MocktestForm';

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
      <Routes>
        <Route path="/" element={isAuthenticated ? <LoggedInHome /> : <Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/testseries/:subCategoryId" element={<MockTests />} />
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="/online-courses" element={<OnlineCourses />} />
        <Route path="/offline-courses" element={<OfflineCourses />} />
        <Route path="/course/:type/:courseId" element={<CourseDetail />} />
        <Route path="/daily-study/:date" element={<DailyStudy />} />
        <Route path="/my-courses" element={isAuthenticated ? <MyCourses /> : <Navigate to="/auth" />} />
        <Route path="/today-live-classes" element={isAuthenticated ? <TodayLiveClasses /> : <Navigate to="/auth" />} />
        <Route path="/live-courses" element={isAuthenticated ? <LiveCourses /> : <Navigate to="/auth" />} />
        <Route path="/recorded-courses" element={isAuthenticated ? <RecordedCourses /> : <Navigate to="/auth" />} />
        <Route path="/all-courses" element={isAuthenticated ? <AllCourses /> : <Navigate to="/auth" />} />
        <Route path="/mocktestForm" element={isAuthenticated ? <MocktestForm /> : <Navigate to="/auth" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;