import prisma from "@/prisma/client";
import { JobItem } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const jobItems = await prisma.jobItem.findMany({});
  if (search) {
    const searchItems: JobItem[] = [];
    jobItems.forEach((jobItem) => {
      for (let i = 0; i < jobItem.qualifications.length; i++) {
        if (
          jobItem.qualifications[i].toLowerCase().includes(search.toLowerCase())
        ) {
          searchItems.push(jobItem);
          break;
        }
      }
    });
    return NextResponse.json(searchItems);
  } else {
    return NextResponse.json(jobItems);
  }
}
