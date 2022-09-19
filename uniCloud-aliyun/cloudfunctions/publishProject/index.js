'use strict';
// 发布任务
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.databaseForJQL({event,context })
	const {name,payment,registration_deadline,desc,status,need_people,job_list} = event
	const keyMap = {
		name:'项目名称',
		payment:'总报酬',
		registration_deadline:'报名截止时间',
		desc:'项目描述',
		status:'状态',
		need_people:'所需人数',
	}
	for(const key in keyMap){
		if(!event[key]) return {
			code:500,
			errorMessage:`${key}的值必须填写`
		}
	}
	if(job_list.length<1) return {
			code:500,
			errorMessage:`岗位值必须填写`
		}
	// 1.先批量新增 job，拿到 idList

	let res_job = await db.collection('job').add(job_list)
	console.log("res_job  ====",res_job)
	// 2.创建 project
	let res = await db.collection('project').add({
		name,
		payment,
		registration_deadline,
		desc,
		status,
		need_people,
		job_list:res_job.ids 
	})
	console.log("res  ====",res)
	return res
};
