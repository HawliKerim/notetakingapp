import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
export async function POST(req: Request) {
    const body = await req.json();

    const result = await db.notes.create({
        data:{
            ...body
        }
    })
    if (!result) return Response.json({message: "error", status: 500})
    return Response.json({message: "ok", status: 200, data: result})
}

export async function GET(req: Request) {
    const result = await db.notes.findMany()
    return Response.json({message: "ok", status: 200, data: result})
}