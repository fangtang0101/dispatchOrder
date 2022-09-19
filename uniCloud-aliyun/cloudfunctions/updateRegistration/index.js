'use strict';
// 新增报名信息
exports.main = async (event, context) => {
	//event为客户端上传的参数 ;增加信息
	console.log('event : ', event)
	const db = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context 
	})
	const {job_id,user_id,role,info} = event
	
	if(!job_id || !user_id || !user_id || !role || !info){
		return {
			code:500,
			mesg:'参数不对'
		}
	}
	
	const collection = db.collection("job")
	
	let res_all = await collection.where({_id:job_id}).get()
	let old_registration_info = []
	if(res_all.data.length>0){
		 old_registration_info = res_all.data[0].registration_info
	}
	const dbRes = await collection.where({_id:job_id})
	  .update({
		registration_info:[...old_registration_info,{user_id,role,info}]
	  });
	return dbRes
};
