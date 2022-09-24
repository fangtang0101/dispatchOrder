'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const{_id} = event
	// let dbRes = {}
	// // 先保存一份完好的 
	// const db = uniCloud.database()
	// const dbCmd = db.command
	// const $ = db.command.aggregate
	// dbRes = await db.collection('project').aggregate()
	//   .lookup({
	// 	from: 'job',
	// 	localField: 'job_list',
	// 	foreignField: '_id',
	// 	as: 'job_list',
	//   })
	//   .lookup({
	// 	  from:"registration",
	// 	  localField:"job_list.registration_info",
	// 	  foreignField:'_id',
	// 	  as: "registration_info_list",
	//   })
	//   .end()
	// return dbRes
	
	const db = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context 
	})
	const project = db.collection('project').where(`_id == "${_id}"`).getTemp()
	const job = db.collection('job').getTemp()
	const dbRes =  db.collection(project,job).get()
	return dbRes
}
