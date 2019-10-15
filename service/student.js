import request from './network.js'

//获取课程班级列表
export function getCourseClassList({ uid }) {
    return request({
        url: `api/Student/CourseClass.ashx?action=getList&uid=${uid}`
    })
}

//获取试卷列表
export function getExamList(data) {
    return request({
        url: "api/Student/Exam.ashx?action=getList",
        method: "post",
        data: data
    })
}

// 校验试卷密码
export function checkExamPwd(data) {
    return request({
        url: "api/Student/Exam.ashx?action=checkCode",
        method: "post",
        data: data
    })
}

// 考试题目加载
export function getExamDetail({id}) {
    return request({
        url: `api/Student/Exam.ashx?action=getOne&id=${id}`
    })
}

// 考试结果提交
export function submitExam(data) {
    return request({
        url: `api/Student/Exam.ashx?action=submit`,
        method: 'post',
        data: data
    })
}

// 考试操作记录
export function recordExam(data) {
    return request({
        url: `api/Student/Exam.ashx?action=record`,
        method: 'post',
        data: data
    })
}

// 获取考试成绩详情
export function getScore(data) {
    return request({
        url: `api/Student/Exam.ashx?action=getScore`,
        method: 'post',
        data: data
    })
}

// 修改个人信息
export function updateInfo(data) {
    return request({
        url: `api/Student/Users.ashx?action=update`,
        method: 'post',
        data: data
    })
}
