"use client"

import { useState } from 'react';

import BatchEntryForm from '../../../components/form/BatchEntryForm'

import { buttonVariants } from '../../../components/ui/button';



export default function OperatorBatchEntry(){


    const [mode , setMode ] = useState(0);

    
    return(
            <>
            
            <BatchEntryForm/>
           
        

            </>
        );
}