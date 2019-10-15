import request from './network.js'

// 获取学生信息列表
export function getStudentList(data) {
    return request({
        url: `api/Admin/Student.ashx?action=getList`,
        method: 'post',
        data: data
    })
}

// 获取教师信息列表
export function getTeacherList(data) {
    return request({
        url: `api/Admin/Teacher.ashx?action=getList`,
        method: 'post',
        data: data
    })
}

// 删除学生
export function deleteStudent(data) {
    return request({
        url: `api/Admin/Student.ashx?action=delete`,
        method: 'post',
        data: data
    })
}
// 删除教师
export function deleteTeacher(data) {
    return request({
        url: `api/Admin/Teacher.ashx?action=delete`,
        method: 'post',
        data: data
    })
}

// 解绑微信号
export function unBind({uid}) {
    return request({
        url: `api/Admin/Users.ashx?action=untied&uid=${uid}`,
    })
}

// 重置密码
export function resetPwd({ uid }) {
    return request({
        url: `api/Public/User.ashx?action=updatePwd`,
        method: 'post',
        data: {
            uid: uid,
            pwd: "123456"
        }
    })
}


