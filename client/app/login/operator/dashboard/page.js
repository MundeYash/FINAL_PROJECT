"use client"

import { useState } from 'react';

import Dashboard from '../../../components/dashBoard/OperatorDashboard'

import { buttonVariants } from '../../../components/ui/button';



export default function AdminDashboard(){


    const [mode , setMode ] = useState(0);

    
    return(
            <>
            
            <Dashboard/>
           
        

            </>
        );
}