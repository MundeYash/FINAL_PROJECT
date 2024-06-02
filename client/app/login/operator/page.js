"use client"

import { useState } from 'react';

import BatchEntryForm from '../../components/form/BatchEntryForm'
import EmployeeForm from '../../components/form/EmployeeForm'
import { buttonVariants } from '../../components/ui/button';

import OperatorSignIn from '../../components/login/OperatorSignIn'

export default function Operator(){


    const [mode , setMode ] = useState(0);

    
    return(
            <>
            
            {/* <BatchEntryForm/> */}
            {/* <EmployeeForm/> */}
            <OperatorSignIn/>

            </>
        );
}