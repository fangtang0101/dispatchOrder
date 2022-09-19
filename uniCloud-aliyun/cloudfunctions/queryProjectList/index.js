'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let dbRes = {}
	const db = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context 
	})
	// const project = db.collection('project').getTemp()
	// const job = db.collection('job,registration').getTemp()
	// dbRes = await db.collection('project',job).get()
	dbRes = await db.collection('project,job').get()
	return dbRes
	//返回数据给客户端
	// return event
};
