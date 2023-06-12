const teachers = [
  {
    name: 'Карпова В.А.',
  },
  {
    name: 'Киляева А.Е.',
  },
  {
    name: 'Есенина О.Н.',
  },
  {
    name: 'Тимофеева Н.И.',
  },
  {
    name: 'Касагов А.Е.',
  },
  {
    name: 'Петров В.В.',
  },
];
const subjects = [
  {
    name: 'Математика',
  },
  {
    name: 'Биология',
  },
  {
    name: 'История',
  },
  {
    name: 'Русский язык',
  },
  {
    name: 'Физ-ра',
  },
  {
    name: 'Немецкий язык',
  },
];
const classes = [
  {
    number: '5А',
  },
  {
    number: '5Б',
  },
  {
    number: '5В',
  },
  {
    number: '5Г',
  },
  {
    number: '6А',
  },
  {
    number: '6Б',
  },
  {
    number: '6В',
  },
  {
    number: '6Г',
  },
  {
    number: '7А',
  },
  {
    number: '7Б',
  },
  {
    number: '7В',
  },
  {
    number: '7Г',
  },
];
const lessons = [
  {
    dayOfWeek: 'Понедельник',
    lessonNumber: 1,
    subjectId: 1,
    teacherId: 1,
    classId: 1,
    classroomId: 12,
  },
  {
    dayOfWeek: 'Понедельник',
    lessonNumber: 2,
    subjectId: 1,
    teacherId: 1,
    classId: 2,
    classroomId: 9,
  },
  {
    dayOfWeek: 'Понедельник',
    lessonNumber: 3,
    subjectId: 1,
    teacherId: 1,
    classId: 3,
    classroomId: 28,
  },
  {
    dayOfWeek: 'Понедельник',
    lessonNumber: 4,
    subjectId: 1,
    teacherId: 1,
    classId: 4,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Понедельник',
    lessonNumber: 5,
    subjectId: 1,
    teacherId: 1,
    classId: 5,
    classroomId: 32,
  },
  {
    dayOfWeek: 'Понедельник',
    lessonNumber: 6,
    subjectId: 1,
    teacherId: 1,
    classId: 6,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Понедельник',
    lessonNumber: 7,
    subjectId: 1,
    teacherId: 1,
    classId: 2,
    classroomId: 2,
  },
  //вторник
  {
    dayOfWeek: 'Вторник',
    lessonNumber: 1,
    subjectId: 1,
    teacherId: 1,
    classId: 1,
    classroomId: 12,
  },
  {
    dayOfWeek: 'Вторник',
    lessonNumber: 3,
    subjectId: 1,
    teacherId: 1,
    classId: 3,
    classroomId: 28,
  },
  {
    dayOfWeek: 'Вторник',
    lessonNumber: 4,
    subjectId: 1,
    teacherId: 1,
    classId: 4,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Вторник',
    lessonNumber: 5,
    subjectId: 1,
    teacherId: 1,
    classId: 5,
    classroomId: 32,
  },
  {
    dayOfWeek: 'Вторник',
    lessonNumber: 6,
    subjectId: 1,
    teacherId: 1,
    classId: 6,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Вторник',
    lessonNumber: 7,
    subjectId: 1,
    teacherId: 1,
    classId: 2,
    classroomId: 2,
  },
  {
    dayOfWeek: 'Среда',
    lessonNumber: 1,
    subjectId: 1,
    teacherId: 1,
    classId: 1,
    classroomId: 12,
  },
  {
    dayOfWeek: 'Среда',
    lessonNumber: 2,
    subjectId: 1,
    teacherId: 1,
    classId: 2,
    classroomId: 9,
  },
  {
    dayOfWeek: 'Среда',
    lessonNumber: 3,
    subjectId: 1,
    teacherId: 1,
    classId: 3,
    classroomId: 28,
  },
  {
    dayOfWeek: 'Среда',
    lessonNumber: 4,
    subjectId: 1,
    teacherId: 1,
    classId: 4,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Среда',
    lessonNumber: 5,
    subjectId: 1,
    teacherId: 1,
    classId: 5,
    classroomId: 32,
  },
  {
    dayOfWeek: 'Среда',
    lessonNumber: 6,
    subjectId: 1,
    teacherId: 1,
    classId: 6,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Среда',
    lessonNumber: 7,
    subjectId: 1,
    teacherId: 1,
    classId: 2,
    classroomId: 2,
  },
  {
    dayOfWeek: 'Четверг',
    lessonNumber: 1,
    subjectId: 1,
    teacherId: 1,
    classId: 1,
    classroomId: 12,
  },
  {
    dayOfWeek: 'Четверг',
    lessonNumber: 2,
    subjectId: 1,
    teacherId: 1,
    classId: 2,
    classroomId: 9,
  },
  {
    dayOfWeek: 'Четверг',
    lessonNumber: 3,
    subjectId: 1,
    teacherId: 1,
    classId: 3,
    classroomId: 28,
  },
  {
    dayOfWeek: 'Четверг',
    lessonNumber: 4,
    subjectId: 1,
    teacherId: 1,
    classId: 4,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Четверг',
    lessonNumber: 5,
    subjectId: 1,
    teacherId: 1,
    classId: 5,
    classroomId: 32,
  },
  {
    dayOfWeek: 'Четверг',
    lessonNumber: 6,
    subjectId: 1,
    teacherId: 1,
    classId: 6,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Четверг',
    lessonNumber: 7,
    subjectId: 1,
    teacherId: 1,
    classId: 2,
    classroomId: 2,
  },
  {
    dayOfWeek: 'Пятница',
    lessonNumber: 1,
    subjectId: 1,
    teacherId: 1,
    classId: 1,
    classroomId: 12,
  },
  {
    dayOfWeek: 'Пятница',
    lessonNumber: 2,
    subjectId: 1,
    teacherId: 1,
    classId: 2,
    classroomId: 9,
  },
  {
    dayOfWeek: 'Пятница',
    lessonNumber: 3,
    subjectId: 1,
    teacherId: 1,
    classId: 3,
    classroomId: 28,
  },
  {
    dayOfWeek: 'Пятница',
    lessonNumber: 4,
    subjectId: 1,
    teacherId: 1,
    classId: 4,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Пятница',
    lessonNumber: 5,
    subjectId: 1,
    teacherId: 1,
    classId: 5,
    classroomId: 32,
  },
  {
    dayOfWeek: 'Пятница',
    lessonNumber: 6,
    subjectId: 1,
    teacherId: 1,
    classId: 6,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Пятница',
    lessonNumber: 7,
    subjectId: 1,
    teacherId: 1,
    classId: 2,
    classroomId: 2,
  },
  {
    dayOfWeek: 'Суббота',
    lessonNumber: 1,
    subjectId: 1,
    teacherId: 1,
    classId: 1,
    classroomId: 12,
  },
  {
    dayOfWeek: 'Суббота',
    lessonNumber: 2,
    subjectId: 1,
    teacherId: 1,
    classId: 2,
    classroomId: 9,
  },
  {
    dayOfWeek: 'Суббота',
    lessonNumber: 3,
    subjectId: 1,
    teacherId: 1,
    classId: 3,
    classroomId: 28,
  },
  {
    dayOfWeek: 'Суббота',
    lessonNumber: 4,
    subjectId: 1,
    teacherId: 1,
    classId: 4,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Суббота',
    lessonNumber: 5,
    subjectId: 1,
    teacherId: 1,
    classId: 5,
    classroomId: 32,
  },
  {
    dayOfWeek: 'Суббота',
    lessonNumber: 6,
    subjectId: 1,
    teacherId: 1,
    classId: 6,
    classroomId: 18,
  },
  {
    dayOfWeek: 'Суббота',
    lessonNumber: 7,
    subjectId: 1,
    teacherId: 1,
    classId: 2,
    classroomId: 2,
  },
];
module.exports = { teachers, subjects, classes, lessons };
