"use client";
import AdminSignIn from "../../components/login/AdminSignIn";
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "../../components/login/AdminSignIn";
import SignUp from "../../components/login/AdminSignUp";
import Dashboard from '../../components/dashBoard/MainAdminDashboard'

export default function admin() {
  return (
    <div>
      <AdminSignIn />
    </div>

   
  );
}
