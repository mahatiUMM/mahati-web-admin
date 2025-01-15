import {
  Users,
  HeartPulse,
  Album,
  BookImage,
  FileQuestion,
  CircleHelp,
  MessageCircleQuestion,
  BellRing,
  CalendarCheck,
  FileVideo,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardStats = ({
  users,
  pressures,
  bookmarks,
  brochures,
  questionnaires,
  questionniare_questions,
  questionniare_answers,
  reminders,
  schedules,
  videos,
}: Readonly<{
  users: number;
  pressures: number;
  bookmarks: number;
  brochures: number;
  questionnaires: number;
  questionniare_questions: number;
  questionniare_answers: number;
  reminders: number;
  schedules: number;
  videos: number;
}>) => {
  const stats = [
    { title: "Total Users", value: users, icon: Users },
    { title: "Blood Pressures", value: pressures, icon: HeartPulse },
    { title: "Bookmarks", value: bookmarks, icon: Album },
    { title: "Brochures", value: brochures, icon: BookImage },
    { title: "Questionnaire", value: questionnaires, icon: FileQuestion },
    { title: "Questionnaire Questions", value: questionniare_questions, icon: CircleHelp },
    { title: "Questionnaire Answers", value: questionniare_answers, icon: MessageCircleQuestion },
    { title: "Reminders", value: reminders, icon: BellRing },
    { title: "Schedules", value: schedules, icon: CalendarCheck },
    { title: "Videos", value: videos, icon: FileVideo },
  ];

  return (
    <div className="grid gap-2 md:grid-cols-2 md:gap-2 lg:grid-cols-4 my-4 lg:my-0 max-[766px]:grid-cols-2">
      {stats.map((stat, index) => (
        <Card key={stat.title + index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value} Records</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export {
  DashboardStats,
}