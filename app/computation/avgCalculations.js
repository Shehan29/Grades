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

export const computeCourseAvg = (courses, pCourse, stop) => {
	const index = courses.findIndex(course => course.name === pCourse);
	let assessments = [];
	if (index > -1) {
		assessments = courses[index].assessments;
		let total = 0;
		const numItems = assessments.length;
		let value = 0;
		for (var i = 0; i < numItems; i++) {
			let val = parseFloat(assessments[i].value) || 0;
			value += val;
			total += parseFloat(assessments[i].mark)*val || 0;
		}
		courses[index].mark = total/value || 0;
		console.log(courses[index].mark);
		AsyncStorage.setItem('Courses', JSON.stringify(courses), () => {
			if (!stop) {
				computePeronalAvg(courses);
			}
		});
	}
}

export const computePeronalAvg = (courses) => {
	let fullTotal = 0;
	const numCourses = courses.length;
	for (let i = 0; i < numCourses; i++) {
		fullTotal += parseFloat(courses[i].mark) || 0;
	}
	const personalAvg = fullTotal/numCourses;
	AsyncStorage.setItem('PersonalAvg', JSON.stringify(personalAvg));
}

export const refreshData = async () => {
	AsyncStorage.getItem('Courses', (err, result) => {
		const courses = result ? JSON.parse(result) : [];
		for (let i = 0; i < courses.length; i++) {
			for (let j = 0; courses[i].assessments && j < courses[i].assessments.length; j++) {
				const assessmentList = courses[i].assessments[j].assessmentList;
				let total = 0;
				const numItems = assessmentList.length;
				for (let k = 0; k < numItems; k++) {
					total += parseFloat(assessmentList[k].mark);
				}
				courses[i].assessments[j].mark = total/numItems || 0;
			}
			computeCourseAvg(courses, courses[i].name, true);
		}
		computePeronalAvg(courses);
	});
}