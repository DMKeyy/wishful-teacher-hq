export const teachers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sjohnson@school.edu",
    subject: "Mathematics",
    department: "Science",
    avatar: "/placeholder.svg",
    joinDate: "2018-09-15",
    wishesCount: 4,
    completedWishesCount: 2,
    courses: [1, 3]
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "mchen@school.edu",
    subject: "History",
    department: "Humanities",
    avatar: "/placeholder.svg",
    joinDate: "2017-06-22",
    wishesCount: 6,
    completedWishesCount: 5,
    courses: [2, 5]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "erodriguez@school.edu",
    subject: "English Literature",
    department: "Language Arts",
    avatar: "/placeholder.svg",
    joinDate: "2020-01-10",
    wishesCount: 3,
    completedWishesCount: 1,
    courses: [4]
  },
  {
    id: 4,
    name: "David Kim",
    email: "dkim@school.edu",
    subject: "Physics",
    department: "Science",
    avatar: "/placeholder.svg",
    joinDate: "2019-08-05",
    wishesCount: 8,
    completedWishesCount: 6,
    courses: [1, 5]
  },
  {
    id: 5,
    name: "Lisa Patel",
    email: "lpatel@school.edu",
    subject: "Computer Science",
    department: "Technology",
    avatar: "/placeholder.svg",
    joinDate: "2021-03-18",
    wishesCount: 5,
    completedWishesCount: 2,
    courses: [3, 5]
  }
];

export const courses = [
  {
    id: 1,
    name: "Advanced Calculus",
    credits: 4
  },
  {
    id: 2,
    name: "World History",
    credits: 3
  },
  {
    id: 3,
    name: "Data Structures",
    credits: 4
  },
  {
    id: 4,
    name: "Literature Analysis",
    credits: 3
  },
  {
    id: 5,
    name: "Research Methods",
    credits: 2
  }
];

export const wishes = [
  {
    id: 1,
    teacherId: 1,
    title: "New graphing calculators",
    description: "Need 30 new TI-84 calculators for the advanced math classes.",
    status: "pending",
    priority: "high",
    category: "Equipment",
    dateCreated: "2024-02-15",
    estimatedCost: 3500,
    courseId: 1
  },
  {
    id: 2,
    teacherId: 1,
    title: "Math competition registration",
    description: "Registration fees for 10 students for state math competition.",
    status: "approved",
    priority: "medium",
    category: "Activities",
    dateCreated: "2024-01-20",
    estimatedCost: 500,
    courseId: 1
  },
  {
    id: 3,
    teacherId: 2,
    title: "History museum field trip",
    description: "Transportation and entry fees for 45 students to visit history museum.",
    status: "completed",
    priority: "medium",
    category: "Field Trip",
    dateCreated: "2023-11-05",
    estimatedCost: 1200,
    courseId: 2
  },
  {
    id: 4,
    teacherId: 3,
    title: "Class set of novels",
    description: "30 copies of 'To Kill a Mockingbird' for 10th grade curriculum.",
    status: "approved",
    priority: "high",
    category: "Books",
    dateCreated: "2024-02-01",
    estimatedCost: 600,
    courseId: 4
  },
  {
    id: 5,
    teacherId: 4,
    title: "Physics lab equipment upgrade",
    description: "New oscilloscopes and wave generators for physics experiments.",
    status: "pending",
    priority: "high",
    category: "Equipment",
    dateCreated: "2024-03-10",
    estimatedCost: 4500,
    courseId: 1
  },
  {
    id: 6,
    teacherId: 5,
    title: "Coding competition sponsorship",
    description: "Registration and travel for 5 students to attend national coding competition.",
    status: "declined",
    priority: "low",
    category: "Activities",
    dateCreated: "2024-01-15",
    estimatedCost: 2800,
    courseId: 3
  },
  {
    id: 7,
    teacherId: 5,
    title: "Classroom laptops",
    description: "15 laptops for computer science classroom for advanced programming projects.",
    status: "approved",
    priority: "high",
    category: "Equipment",
    dateCreated: "2023-12-08",
    estimatedCost: 12000,
    courseId: 3
  },
  {
    id: 8,
    teacherId: 2,
    title: "Historical document reproductions",
    description: "Set of reproduction historical documents for hands-on history lessons.",
    status: "completed",
    priority: "medium",
    category: "Teaching Materials",
    dateCreated: "2023-10-25",
    estimatedCost: 350,
    courseId: 2
  }
];

export type Teacher = typeof teachers[0];
export type Wish = typeof wishes[0];
export type Course = typeof courses[0];

export const getTeacherById = (id: number) => {
  return teachers.find(teacher => teacher.id === id);
};

export const getWishesByTeacherId = (teacherId: number) => {
  return wishes.filter(wish => wish.teacherId === teacherId);
};

export const getWishById = (id: number) => {
  return wishes.find(wish => wish.id === id);
};

export const getWishStatusCounts = () => {
  return {
    pending: wishes.filter(wish => wish.status === 'pending').length,
    approved: wishes.filter(wish => wish.status === 'approved').length,
    completed: wishes.filter(wish => wish.status === 'completed').length,
    declined: wishes.filter(wish => wish.status === 'declined').length,
  };
};

export const getDepartmentCounts = () => {
  const departments: Record<string, number> = {};
  
  teachers.forEach(teacher => {
    if (departments[teacher.department]) {
      departments[teacher.department]++;
    } else {
      departments[teacher.department] = 1;
    }
  });
  
  return departments;
};

export const getWishCategoryCounts = () => {
  const categories: Record<string, number> = {};
  
  wishes.forEach(wish => {
    if (categories[wish.category]) {
      categories[wish.category]++;
    } else {
      categories[wish.category] = 1;
    }
  });
  
  return categories;
};

export const getCourseWishCounts = () => {
  const courseWishes: Record<string, number> = {};
  
  wishes.forEach(wish => {
    if (wish.courseId) {
      if (courseWishes[wish.courseId]) {
        courseWishes[wish.courseId]++;
      } else {
        courseWishes[wish.courseId] = 1;
      }
    }
  });
  
  return courseWishes;
};

export const getTeachersByCourse = () => {
  const teacherCounts: Record<string, number> = {};
  
  teachers.forEach(teacher => {
    if (teacher.courses) {
      teacher.courses.forEach(courseId => {
        if (teacherCounts[courseId]) {
          teacherCounts[courseId]++;
        } else {
          teacherCounts[courseId] = 1;
        }
      });
    }
  });
  
  return teacherCounts;
};
