import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from "@clerk/nextjs";

export default function ViewEntry({data}){
	// const { isLoaded, userId, sessionId, getToken } = useAuth();
	console.log(data)
}