import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { authOptions } from "@/lib/auth/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const year = searchParams.get("year");
  const tag = searchParams.get("tag");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { userId: session.user.id };
  if (category) where.category = category;
  if (year) {
    const start = new Date(parseInt(year), 0, 1);
    const end = new Date(parseInt(year), 11, 31, 23, 59, 59);
    where.date = { gte: start, lte: end };
  }
  if (tag) {
    where.tags = { some: { name: tag } };
  }

  const milestones = await prisma.milestone.findMany({
    where,
    include: { media: true, tags: true },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(milestones);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    content,
    date,
    datePrecision = "day",
    category = "life",
    mood,
    moodColor,
    isPrivate = false,
    latitude,
    longitude,
    locationName,
    coverImage,
    tagNames = [],
  } = body;

  if (!title || !date) {
    return NextResponse.json(
      { error: "标题和日期为必填项" },
      { status: 400 }
    );
  }

  const tagRecords = [];
  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { name_userId: { name, userId: session.user.id } },
      update: {},
      create: { name, userId: session.user.id },
    });
    tagRecords.push({ id: tag.id });
  }

  const milestone = await prisma.milestone.create({
    data: {
      userId: session.user.id,
      title,
      content,
      date: new Date(date),
      datePrecision,
      category,
      mood,
      moodColor,
      isPrivate,
      latitude,
      longitude,
      locationName,
      coverImage,
      tags: { connect: tagRecords },
    },
    include: { media: true, tags: true },
  });

  return NextResponse.json(milestone, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: "缺少里程碑ID" }, { status: 400 });
  }

  const existing = await prisma.milestone.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = { ...data };
  if (data.date) updateData.date = new Date(data.date);

  if (data.tagNames) {
    const tagRecords = [];
    for (const name of data.tagNames) {
      const tag = await prisma.tag.upsert({
        where: { name_userId: { name, userId: session.user.id } },
        update: {},
        create: { name, userId: session.user.id },
      });
      tagRecords.push({ id: tag.id });
    }
    updateData.tags = { set: tagRecords };
    delete updateData.tagNames;
  }

  const milestone = await prisma.milestone.update({
    where: { id },
    data: updateData,
    include: { media: true, tags: true },
  });

  return NextResponse.json(milestone);
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "缺少里程碑ID" }, { status: 400 });
  }

  const existing = await prisma.milestone.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  await prisma.milestone.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
