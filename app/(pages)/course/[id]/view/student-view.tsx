"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { extractYouTubeId } from "@/lib/youtube"
import { Prisma } from "@prisma/client"

type CourseWithChaptersAndLessons = Prisma.CourseGetPayload<{
  include: {
    chapters: {
      include: {
        lessons: true
      }
    }
  }
}>

// Serialized version with price as string instead of Decimal
type SerializedCourse = Omit<CourseWithChaptersAndLessons, 'price'> & {
  price: string
}

export function StudentView({ course }: { course: SerializedCourse }) {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([
    course.chapters[0]?.id || ""
  ])
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    course.chapters[0]?.lessons[0]?.id || ""
  )

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  const selectedLesson = course.chapters
    .flatMap((ch) => ch.lessons)
    .find((l) => l.id === selectedLessonId)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const videoId = selectedLesson?.youtubeVideoId
    ? extractYouTubeId(selectedLesson.youtubeVideoId)
    : null
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-card border border-border rounded-lg shadow-lg"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static
        top-[73px] lg:top-0
        left-0 right-0 lg:right-auto
        w-full lg:w-80
        h-[calc(100vh-73px)] lg:h-screen
        border-r border-border bg-card overflow-y-auto
        z-40
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
      `}>
        <div className="p-4 lg:p-6 border-b border-border">
          <h2 className="text-lg lg:text-xl font-bold">{course.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {course.chapters.length} chapters
          </p>
        </div>

        <div className="p-4">
          {course.chapters.map((chapter) => (
            <div key={chapter.id} className="mb-2">
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-accent text-left"
              >
                {expandedChapters.includes(chapter.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
                <span className="font-medium text-sm">{chapter.title}</span>
              </button>

              {expandedChapters.includes(chapter.id) && (
                <div className="ml-4 mt-2 space-y-1">
                  {chapter.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setSelectedLessonId(lesson.id)
                        setSidebarOpen(false) // Close sidebar on mobile after selecting
                      }}
                      className={`w-full text-left p-2 rounded text-sm ${selectedLessonId === lesson.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                        }`}
                    >
                      {lesson.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="border-b border-border p-4 lg:p-6">
          <h1 className="text-xl lg:text-2xl font-bold">{selectedLesson?.title}</h1>
          <p className="text-muted-foreground mt-2 text-sm lg:text-base">{selectedLesson?.description}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              {videoId ? (
                <div className="aspect-video rounded-lg overflow-hidden bg-black mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center mb-4">
                  <p className="text-muted-foreground">No video available</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="lg:col-span-1 bg-card rounded-lg p-4 border border-border">
              <h3 className="font-semibold mb-3">About this lesson</h3>
              <p className="text-sm text-muted-foreground">
                {selectedLesson?.description || "No description available"}
                {selectedLesson?.youtubeVideoId && (
                  <span className="block mt-2 text-xs break-all">
                    {selectedLesson.youtubeVideoId}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}