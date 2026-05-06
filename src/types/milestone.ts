export interface Milestone {
  id: string;
  userId: string;
  title: string;
  content: string | null;
  date: string;
  datePrecision: "year" | "month" | "day";
  category: MilestoneCategory;
  mood: number | null;
  moodColor: string | null;
  isPrivate: boolean;
  latitude: number | null;
  longitude: number | null;
  locationName: string | null;
  coverImage: string | null;
  media: Media[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export type MilestoneCategory =
  | "life"
  | "career"
  | "education"
  | "travel"
  | "relationship"
  | "achievement"
  | "health"
  | "creative";

export interface Media {
  id: string;
  type: "image" | "video" | "audio";
  url: string;
  caption: string | null;
  order: number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface MilestoneFormData {
  title: string;
  content?: string;
  date: string;
  datePrecision?: "year" | "month" | "day";
  category?: MilestoneCategory;
  mood?: number;
  moodColor?: string;
  isPrivate?: boolean;
  latitude?: number;
  longitude?: number;
  locationName?: string;
  coverImage?: string;
  tagNames?: string[];
}

export const CATEGORY_CONFIG: Record<
  MilestoneCategory,
  { label: string; icon: string; color: string }
> = {
  life: { label: "生活", icon: "☀️", color: "river" },
  career: { label: "事业", icon: "💼", color: "memory" },
  education: { label: "学业", icon: "📚", color: "river" },
  travel: { label: "旅行", icon: "✈️", color: "mood-love" },
  relationship: { label: "情感", icon: "💕", color: "mood-love" },
  achievement: { label: "成就", icon: "🏆", color: "memory" },
  health: { label: "健康", icon: "🌿", color: "river" },
  creative: { label: "创作", icon: "🎨", color: "mood-love" },
};

export const MOOD_OPTIONS = [
  { value: 1, label: "低落", color: "#7c9cbf" },
  { value: 2, label: "平静", color: "#4ecdc4" },
  { value: 3, label: "一般", color: "#a8d8ea" },
  { value: 4, label: "愉快", color: "#ffd93d" },
  { value: 5, label: "兴奋", color: "#ff6b9d" },
];
