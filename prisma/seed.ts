import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("demo123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@timestation.com" },
    update: {},
    create: {
      name: "时光旅人",
      email: "demo@timestation.com",
      password: hashedPassword,
      bio: "在时光中漫步，记录每一段河流",
    },
  });

  const tagTravel = await prisma.tag.create({ data: { name: "旅行", userId: user.id } });
  const tagGraduate = await prisma.tag.create({ data: { name: "毕业", userId: user.id } });
  const tagWork = await prisma.tag.create({ data: { name: "工作", userId: user.id } });
  const tagLove = await prisma.tag.create({ data: { name: "爱情", userId: user.id } });
  const tagFamily = await prisma.tag.create({ data: { name: "家庭", userId: user.id } });

  const milestones = [
    {
      title: "呱呱坠地",
      content: "来到这个世界的第一天，一切故事从这里开始。",
      date: new Date("1998-06-15"),
      datePrecision: "day",
      category: "life",
      mood: 4,
      moodColor: "#ffd93d",
      locationName: "北京",
    },
    {
      title: "第一次远行",
      content: "跟着父母去了海边，那是第一次看见大海，浪花的声音至今还在耳边。",
      date: new Date("2005-08-20"),
      datePrecision: "day",
      category: "travel",
      mood: 5,
      moodColor: "#ff6b9d",
      locationName: "青岛",
    },
    {
      title: "考上大学",
      content: "收到录取通知书的那一刻，所有的努力都值得了。新的人生篇章即将开启。",
      date: new Date("2016-08-10"),
      datePrecision: "month",
      category: "education",
      mood: 5,
      moodColor: "#ff6b9d",
      locationName: "上海",
    },
    {
      title: "第一次独自旅行",
      content: "背着背包一个人去了云南，在洱海边发了一下午的呆。原来独处也可以这么美好。",
      date: new Date("2018-07-15"),
      datePrecision: "month",
      category: "travel",
      mood: 4,
      moodColor: "#ffd93d",
      locationName: "大理",
    },
    {
      title: "遇见你",
      content: "在那个普通的下午，命运安排了一场相遇。从此以后，所有的故事里都有你的名字。",
      date: new Date("2019-03-20"),
      datePrecision: "month",
      category: "relationship",
      mood: 5,
      moodColor: "#ff6b9d",
    },
    {
      title: "毕业典礼",
      content: "四年时光如白驹过隙，抛起学士帽的那一刻，青春有了最完美的句号。",
      date: new Date("2020-06-28"),
      datePrecision: "day",
      category: "education",
      mood: 4,
      moodColor: "#ffd93d",
      locationName: "上海",
    },
    {
      title: "入职第一天",
      content: "紧张又兴奋，穿上正装走进写字楼。职场新人的第一天，未来可期。",
      date: new Date("2020-09-01"),
      datePrecision: "day",
      category: "career",
      mood: 3,
      moodColor: "#a8d8ea",
      locationName: "深圳",
    },
    {
      title: "升职了",
      content: "两年的努力得到了认可，这是职业生涯的一个小里程碑。感恩所有帮助过我的人。",
      date: new Date("2022-12-01"),
      datePrecision: "month",
      category: "achievement",
      mood: 4,
      moodColor: "#ffd93d",
      locationName: "深圳",
    },
    {
      title: "环岛骑行",
      content: "和朋友一起骑行海南岛，7天400公里。大腿很酸，心很自由。",
      date: new Date("2023-04-05"),
      datePrecision: "day",
      category: "travel",
      mood: 5,
      moodColor: "#ff6b9d",
      locationName: "海南",
    },
    {
      title: "搬进新家",
      content: "终于有了自己的小窝，虽然不大，但每一个角落都是自己选的。这就是家的感觉。",
      date: new Date("2024-01-15"),
      datePrecision: "month",
      category: "life",
      mood: 4,
      moodColor: "#ffd93d",
      locationName: "深圳",
    },
  ];

  for (const m of milestones) {
    const tagIds: { id: string }[] = [];
    if (m.category === "travel") tagIds.push({ id: tagTravel.id });
    if (m.category === "education") tagIds.push({ id: tagGraduate.id });
    if (m.category === "career" || m.category === "achievement")
      tagIds.push({ id: tagWork.id });
    if (m.category === "relationship") tagIds.push({ id: tagLove.id });
    if (m.category === "life") tagIds.push({ id: tagFamily.id });

    await prisma.milestone.create({
      data: {
        userId: user.id,
        title: m.title,
        content: m.content,
        date: m.date,
        datePrecision: m.datePrecision,
        category: m.category,
        mood: m.mood,
        moodColor: m.moodColor,
        locationName: m.locationName,
        tags: { connect: tagIds },
      },
    });
  }

  console.log("🌱 种子数据已植入完成！");
  console.log(`📧 演示账号: demo@timestation.com / demo123`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
