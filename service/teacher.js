import request from './network.js'

//获取课程班级列表
export function getClassList(data) {
    return request({
        url: `api/Teacher/CourseClass.ashx?action=getList&uid=${data.uid}&isLinear='${data.isLinear}`,
        method: "get",
        data: data
    })
}
//获取课程列表
export function postCourseList(data) {
    return request({
        url: `api/Teacher/Course.ashx?action=getList`,
        method: "post",
        data: data
    })
}
//获取题目详情
export function getQuesDetail(data){
    return request({
        url: `api/Teacher/Topic.ashx?action=getOne&id=${data.id}`,
        method: "get",
        data: data
    })
}
//添加题目
export function postAddTitle(json) {
    return request({
        url: 'api/Teacher/Topic.ashx?action=add',
        method: "post",
        data: json
    })
}
//获取题目列表
export function postTitleList(data) {
    return request({
        url: 'api/Teacher/Topic.ashx?action=getList',
        method: "post",
        data: data
    })
}
//删除题目
export function postDelectTitle(data) {
    return request({
        url: 'api/Teacher/Topic.ashx?action=delete',
        method: "post",
        data: data
    })
}
//添加试卷
export function postAddExam(data) {
    return request({
        url: 'api/Teacher/Exam.ashx?action=add',
        method: "post",
        data: data
    })
}
// 获取试卷列表
export function postExamList(data) {
    return request({
        url: 'api/Teacher/Exam.ashx?action=getList',
        method: "post",
        data: data
    })
}
//获取试卷详情
export function getExamDetail(data) {
    return request({
        url: `api/Teacher/Exam.ashx?action=getOne&id=${data.id}`,
        method: "get",
        data: data
    })
}
//删除试卷
export function postDelectExam(data) {
    return request({
        url: `api/Teacher/Exam.ashx?action=delete`,
        method: "post",
        data: data
    })
}
//修改/发布/撤销试卷
export function postChangeExam(data) {
    return request({
        url: `api/Teacher/Exam.ashx?action=update`,
        method: "post",
        data: data
    })
}
//修改题目
export function postChangeTitle(data) {
    return request({
        url: `api/Teacher/Topic.ashx?action=update`,
        method: "post",
        data: data
    })
}
//修改教师信息
export function postinfoChange(data){
    return request({
        url: `api/Teacher/TeaUsers.ashx?action=update`,
        method: "post",
        data: data
    })
}