-- 插入演示用户（密码: demo123，bcrypt hash）
INSERT INTO "User" ("id", "name", "email", "password", "bio", "created_at", "updated_at")
VALUES ('demo-user-001', '时光旅人', 'demo@timestation.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJt5aIq5aOe', '在时光中漫步，记录每一段河流', NOW(), NOW());

-- 插入标签
INSERT INTO "Tag" ("id", "name", "userId") VALUES ('tag-travel', '旅行', 'demo-user-001');
INSERT INTO "Tag" ("id", "name", "userId") VALUES ('tag-graduate', '毕业', 'demo-user-001');
INSERT INTO "Tag" ("id", "name", "userId") VALUES ('tag-work', '工作', 'demo-user-001');
INSERT INTO "Tag" ("id", "name", "userId") VALUES ('tag-love', '爱情', 'demo-user-001');
INSERT INTO "Tag" ("id", "name", "userId") VALUES ('tag-family', '家庭', 'demo-user-001');

-- 插入里程碑
INSERT INTO "Milestone" ("id", "userId", "title", "content", "date", "datePrecision", "category", "mood", "moodColor", "locationName", "createdAt", "updatedAt")
VALUES ('ms-01', 'demo-user-001', '呱呱坠地', '来到这个世界的第一天，一切故事从这里开始。', '1998-06-15', 'day', 'life', 4, '#ffd93d', '北京', NOW(), NOW());

INSERT INTO "Milestone" ("id", "userId", "title", "content", "date", "datePrecision", "category", "mood", "moodColor", "locationName", "createdAt", "updatedAt")
VALUES ('ms-02', 'demo-user-001', '第一次远行', '跟着父母去了海边，那是第一次看见大海，浪花的声音至今还在耳边。', '2005-08-20', 'day', 'travel', 5, '#ff6b9d', '青岛', NOW(), NOW());

INSERT INTO "Milestone" ("id", "userId", "title", "content", "date", "datePrecision", "category", "mood", "moodColor", "locationName", "createdAt", "updatedAt")
VALUES ('ms-03', 'demo-user-001', '考上大学', '收到录取通知书的那一刻，所有的努力都值得了。新的人生篇章即将开启。', '2016-08-10', 'month', 'education', 5, '#ff6b9d', '上海', NOW(), NOW());

INSERT INTO "Milestone" ("id", "userId", "title", "content", "date", "datePrecision", "category", "mood", "moodColor", "locationName", "createdAt", "updatedAt")
VALUES ('ms-04', 'demo-user-001', '第一次独自旅行', '背着背包一个人去了云南，在洱海边发了一下午的呆。原来独处也可以这么美好。', '2018-07-15', 'month', 'travel', 4, '#ffd93d', '大理', NOW(), NOW());

INSERT INTO "Milestone" ("id", "userId", "title", "content", "date", "datePrecision", "category", "mood", "moodColor", "locationName", "createdAt", "updatedAt")
VALUES ('ms-05', 'demo-user-001', '遇见你', '在那个普通的下午，命运安排了一场相遇。从此以后，所有的故事里都有你的名字。', '2019-03-20', 'month', 'relationship', 5, '#ff6b9d', NULL, NOW(), NOW());

INSERT INTO "Milestone" ("id", "userId", "title", "content", "date", "datePrecision", "category", "mood", "moodColor", "locationName", "createdAt", "updatedAt")
VALUES ('ms-06', 'demo-user-001', '毕业典礼', '四年时光如白驹过隙，抛起学士帽的那一刻，青春有了最完美的句号。', '2020-06-28', 'day', 'education', 4, '#ffd93d', '上海', NOW(), NOW());

INSERT INTO "Milestone" ("id", "userId", "title", "content", "date", "datePrecision", "category", "mood", "moodColor", "locationName", "createdAt", "updatedAt")
VALUES ('ms-07', 'demo-user-001', '入职第一天', '紧张又兴奋，穿上正装走进写字楼。职场新人的第一天，未来可期。', '2020-09-01', 'day', 'career', 3, '#a8d8ea', '深圳', NOW(), NOW());

INSERT INTO "Milestone" ("id", "userId", "title", "content", "date", "datePrecision", "category", "mood", "moodColor", "locationName", "createdAt", "updatedAt")
VALUES ('ms-08', 'demo-user-001', '升职了', '两年的努力得到了认可，这是职业生涯的一个小里程碑。感恩所有帮助过我的人。', '2022-12-01', 'month', 'achievement', 4, '#ffd93d', '深圳', NOW(), NOW());

INSERT INTO "Milestone" ("id", "userId", "title", "content", "date", "datePrecision", "category", "mood", "moodColor", "locationName", "createdAt", "updatedAt")
VALUES ('ms-09', 'demo-user-001', '环岛骑行', '和朋友一起骑行海南岛，7天400公里。大腿很酸，心很自由。', '2023-04-05', 'day', 'travel', 5, '#ff6b9d', '海南', NOW(), NOW());

INSERT INTO "Milestone" ("id", "userId", "title", "content", "date", "datePrecision", "category", "mood", "moodColor", "locationName", "createdAt", "updatedAt")
VALUES ('ms-10', 'demo-user-001', '搬进新家', '终于有了自己的小窝，虽然不大，但每一个角落都是自己选的。这就是家的感觉。', '2024-01-15', 'month', 'life', 4, '#ffd93d', '深圳', NOW(), NOW());

-- 关联标签到里程碑
INSERT INTO "_MilestoneToTag" ("A", "B") VALUES ('ms-01', 'tag-family');
INSERT INTO "_MilestoneToTag" ("A", "B") VALUES ('ms-02', 'tag-travel');
INSERT INTO "_MilestoneToTag" ("A", "B") VALUES ('ms-03', 'tag-graduate');
INSERT INTO "_MilestoneToTag" ("A", "B") VALUES ('ms-04', 'tag-travel');
INSERT INTO "_MilestoneToTag" ("A", "B") VALUES ('ms-05', 'tag-love');
INSERT INTO "_MilestoneToTag" ("A", "B") VALUES ('ms-06', 'tag-graduate');
INSERT INTO "_MilestoneToTag" ("A", "B") VALUES ('ms-07', 'tag-work');
INSERT INTO "_MilestoneToTag" ("A", "B") VALUES ('ms-08', 'tag-work');
INSERT INTO "_MilestoneToTag" ("A", "B") VALUES ('ms-09', 'tag-travel');
INSERT INTO "_MilestoneToTag" ("A", "B") VALUES ('ms-10', 'tag-family');
