import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb";
import { Store } from "lucide-react";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name } = body
        if (!userId) {
            return new NextResponse("unauthrized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 })
        }
        //@ts-ignore
        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }

        });
        return NextResponse.json(Store)
    } catch (e) {
        console.log('[stores_post]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}