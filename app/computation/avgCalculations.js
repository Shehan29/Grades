import { AsyncStorage } from 'react-native';

export const computeAssessmentAvg = (pCourse, pName) => {
	AsyncStorage.getItem('Courses', (err, result) => {
		const courses = result ? JSON.parse(result) : [];
		const index = courses.findIndex(course => course.name === pCourse);
		let assessments = [];
		if (index > -1) {
			assessments = courses[index].assessments;
			const index2 = assessments.findIndex(assessment => assessment.name === pName);
			if (index2 > -1) {
				const assessmentList = courses[index].assessments[index2].assessmentList;
				let total = 0;
				const numItems = assessmentList.length;
				for (var i = 0; i < numItems; i++) {
					total += parseFloat(assessmentList[i].mark);
				}
				courses[index].assessments[index2].mark = total/numItems || 0;
				computeCourseAvg(courses, pCourse);
			}
		}
	});
}

const computeCourseAvg = (courses, pCourse) => {
	const index = courses.findIndex(course => course.name === pCourse);
	let assessments = [];
	if (index > -1) {
		assessments = courses[index].assessments;
		let total = 0;
		const numItems = assessments.length;
		for (var i = 0; i < numItems; i++) {
			total += parseFloat(assessments[i].mark) || 0;
		}
		courses[index].mark = total/numItems || 0;
		AsyncStorage.setItem('Courses', JSON.stringify(courses), computePeronalAvg(courses));
	}
}

const computePeronalAvg = (courses) => {
		let fullTotal = 0;
		const numCourses = courses.length;
		for (var i = 0; i < numCourses; i++) {
			fullTotal += parseFloat(courses[i].mark) || 0;
		}
		const personalAvg = fullTotal/numCourses;
		AsyncStorage.setItem('PersonalAvg', JSON.stringify(personalAvg));
}