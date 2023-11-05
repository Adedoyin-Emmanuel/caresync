
"use client"

import React from "react";

import { useRouter } from "next/navigation";

const page = ({ params }: { params: { messageId: string } }) => {

    return (
        <div>
            <h1>page works!</h1>
            <p>{params.messageId}</p>
        </div>
    );  
}

export default page;
    