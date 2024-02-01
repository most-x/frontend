import { NextResponse } from "next/server";

export async function getDate() {
    const res = await fetch(`http://31.152.254.254:3000/scripts/brand/list`);

    if(!res.ok) {
        throw new Error('Failed to featch data');
    }

    console.log("========")
    console.log(res)

    return NextResponse.json(res)
}