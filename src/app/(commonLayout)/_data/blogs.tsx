import ioRedisPhoto from "@/assets/blogs/Ioredis.png";
import bullMqImage from "@/assets/blogs/bullMq.png";
import mongoDbImage from "@/assets/blogs/mongodb.png";

export const allBlogs = [
  {
    id: 1,
    title: "Handbook To IoRedis",
    description: "A comprehensive guide to IoRedis.",
    slug: "handbook-to-ioredis",
    image: ioRedisPhoto,
    fullBlog: "ioRedis.blog.md",
    publishDate: "2025-08-15",
  },
  {
    id: 2,
    title: "A Beginner's Guide to BullMQ",
    description: "Learn the basics of BullMQ, a powerful queue library for Node.js.",
    slug: "a-beginners-guide-to-bullmq",
    image: bullMqImage,
    fullBlog: "bullmq.blog.md",
    publishDate: "2025-08-025",
  },
  {
    id: 3,
    title: "A Beginner's Handbook to MongoDB Aggregation Pipeline",
    description: "Understand the MongoDB aggregation pipeline with this comprehensive guide.",
    slug: "a-beginners-handbook-to-mongodb-aggregation-pipeline",
    image: mongoDbImage,
    fullBlog: "mongodbPipeline.blog.md",
    publishDate: "2025-09-01",
  },
];
