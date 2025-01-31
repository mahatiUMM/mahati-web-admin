"use client"

import { DashboardStats } from "./_components/dashboard-stats";
import { DashboardBarChart } from "./_components/dashboard-bar-chart";
import { DashboardPieChart } from "./_components/dashboard-pie-chart";
import { DashboardLineChart } from "./_components/dashboard-line-chart";

import CustomBreadcrumb from "@/components/layout/custom-breadcrumb";
import { useGetBloodPressures } from "@/lib/hooks/useBloodPressures";
import { useGetBookmark } from "@/lib/hooks/useBookmarks";
import { useGetBrochures } from "@/lib/hooks/useBrochure";
import { useGetQuestionnaires } from "@/lib/hooks/useQuestionnaire";
import { useGetReminders } from "@/lib/hooks/useReminder";
import { useGetSchedules } from "@/lib/hooks/useSchedule";
import { useGetVideos } from "@/lib/hooks/useVideo";
import { useGetAllUsers } from "@/lib/hooks/useUsers";
import { useGetQuestionnaireQuestions } from "@/lib/hooks/useQuestionnaireQuestion";
import { useGetQuestionnaireHistories } from "@/lib/hooks/useQuestionnaireHistories";
import { useGetQuestionnaireAnswer } from "@/lib/hooks/useQuestionnaireAnswer";

export default function AdminDashboardPage() {
  const { data: pressures } = useGetBloodPressures();
  const { data: bookmarks } = useGetBookmark();
  const { data: brochures } = useGetBrochures();
  const { data: questionnaires } = useGetQuestionnaires();
  const { data: reminders } = useGetReminders();
  const { data: schedules } = useGetSchedules();
  const { data: users } = useGetAllUsers();
  const { data: videos } = useGetVideos();
  const { data: questionnaireQuestions } = useGetQuestionnaireQuestions();
  const { data: questionnaireHistories } = useGetQuestionnaireHistories();
  const { data: questionnaireAnswers } = useGetQuestionnaireAnswer();

  const allPressures = pressures?.data?.data?.length
  const allBookmarks = bookmarks?.data?.length
  const allBrochures = brochures?.data?.length
  const allQuestionnaires = questionnaires?.data?.length
  const allReminders = reminders?.data?.length
  const allSchedules = schedules?.data?.length
  const allVideos = videos?.data?.length
  const allUsers = users?.data?.length
  const allQuestionnaireQuestions = questionnaireQuestions?.data?.length
  const allQuestionnaireHistories = questionnaireHistories?.data?.length

  const calculateAnswerTextLengths = (answers: any) => {
    const allLengths = (answers || []).flat().map((answer: { answer_text: string | any[]; }) => answer.answer_text.length);

    const totalAnswers = allLengths.length;
    const uniqueLengths = [...new Set(allLengths)];
    const lengthCounts = allLengths.reduce((acc: { [x: string]: any; }, len: string | number) => {
      acc[len] = (acc[len] || 0) + 1;
      return acc;
    }, {});

    return {
      allLengths,
      totalAnswers,
      uniqueLengths,
      lengthCounts
    };
  };

  const allQuestionnaireAnswer = calculateAnswerTextLengths(questionnaireAnswers?.data.map((v: { available_answers: any; }) => v.available_answers));

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "Dashboard" },
        ]}
      />
      <DashboardStats
        users={allUsers}
        pressures={allPressures}
        bookmarks={allBookmarks}
        brochures={allBrochures}
        questionnaires={allQuestionnaires}
        questionniare_questions={allQuestionnaireQuestions}
        questionniare_answers={allQuestionnaireAnswer.totalAnswers}
        questionniare_histories={allQuestionnaireHistories}
        reminders={allReminders}
        schedules={allSchedules}
        videos={allVideos}
      />
      <div className="grid grid-cols-3 space-x-4 max-[1400px]:grid-cols-1 max-[1400px]:space-y-4 max-[1200px]:space-x-0">
        <DashboardBarChart users={users} />
        <DashboardPieChart medicineTaken={schedules} />
        <DashboardLineChart questionnaireHistories={questionnaireHistories} />
      </div>
    </div>
  );
}