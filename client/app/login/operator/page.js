"use client"

import { useState } from 'react';


import { buttonVariants } from '../../components/ui/button';

import OperatorSignIn from '../../components/login/OperatorSignIn'

export default function Operator(){


    const [mode , setMode ] = useState(0);

    
    return(
            <>
            
          
            <OperatorSignIn/>

            </>
        );
}