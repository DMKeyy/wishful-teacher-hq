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

export const classes = [
  {
    id: 1,
    name: "Class A-101",
    capacity: 30
  },
  {
    id: 2,
    name: "Class B-202",
    capacity: 25
  },
  {
    id: 3,
    name: "Class C-303",
    capacity: 40
  },
  {
    id: 4,
    name: "Class D-404",
    capacity: 35
  },
  {
    id: 5,
    name: "Class E-505",
    capacity: 50
  }
];

export const wishes = [
  {
    id: 1,
    teacherId: 1,
    title: "Mathematics Teaching Preferences",
    description: "My teaching preferences for the upcoming semester.",
    status: "pending",
    priority: "high",
    category: "Teaching Assignment",
    dateCreated: "2024-02-15",
    estimatedCost: 0,
    preferredCourses: [1, 3, 5],
    preferredClasses: [1, 3, 2],
    teachingHours: {
      total: 12,
      lecture: 6,
      tutorial: 4,
      practical: 2,
      additional: 2
    }
  },
  {
    id: 2,
    teacherId: 2,
    title: "History Teaching Preferences",
    description: "Preferred teaching assignments for next semester.",
    status: "approved",
    priority: "medium",
    category: "Teaching Assignment",
    dateCreated: "2024-01-20",
    estimatedCost: 0,
    preferredCourses: [2, 5, 4],
    preferredClasses: [2, 4, 5],
    teachingHours: {
      total: 12,
      lecture: 8,
      tutorial: 4,
      practical: 0,
      additional: 0
    }
  },
  {
    id: 3,
    teacherId: 3,
    title: "Literature Teaching Assignments",
    description: "Request for specific teaching assignments.",
    status: "completed",
    priority: "medium",
    category: "Teaching Assignment",
    dateCreated: "2023-11-05",
    estimatedCost: 0,
    preferredCourses: [4, 2, 5],
    preferredClasses: [3, 1, 4],
    teachingHours: {
      total: 12,
      lecture: 6,
      tutorial: 3,
      practical: 3,
      additional: 1
    }
  },
  {
    id: 4,
    teacherId: 4,
    title: "Physics Teaching Preferences",
    description: "Teaching preferences for physics department.",
    status: "approved",
    priority: "high",
    category: "Teaching Assignment",
    dateCreated: "2024-02-01",
    estimatedCost: 0,
    preferredCourses: [1, 5, 3],
    preferredClasses: [5, 2, 1],
    teachingHours: {
      total: 12,
      lecture: 4,
      tutorial: 4,
      practical: 4,
      additional: 3
    }
  },
  {
    id: 5,
    teacherId: 5,
    title: "Computer Science Teaching Request",
    description: "Preferences for CS courses and labs.",
    status: "pending",
    priority: "high",
    category: "Teaching Assignment",
    dateCreated: "2024-03-10",
    estimatedCost: 0,
    preferredCourses: [3, 1, 5],
    preferredClasses: [4, 2, 3],
    teachingHours: {
      total: 12,
      lecture: 5,
      tutorial: 3,
      practical: 4,
      additional: 2
    }
  }
];

export type Teacher = typeof teachers[0];
export type Wish = typeof wishes[0];
export type Course = typeof courses[0];
export type Class = typeof classes[0];

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
    if (wish.preferredCourses && wish.preferredCourses.length > 0) {
      wish.preferredCourses.forEach(courseId => {
        const courseIdKey = courseId.toString();
        if (courseWishes[courseIdKey]) {
          courseWishes[courseIdKey]++;
        } else {
          courseWishes[courseIdKey] = 1;
        }
      });
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

export const getClassById = (id: number) => {
  return classes.find(cls => cls.id === id);
};
