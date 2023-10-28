
"use client"

import React from "react";

import { useRouter } from "next/navigation";

const page = ({ params }: { params: { hospitalId: string } }) => {

    return (
        <div>
            <h1>page works!</h1>
            <p>{params.hospitalId}</p>
        </div>
    );  
}

export default page;
    