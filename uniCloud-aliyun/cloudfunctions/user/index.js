'use strict';
/**
 * 
 * @param {*} event  action[login,Logout,add,delete,update,query]
 * @param {*} context 
 */
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { action,openid,...otherArgs } = event;
	// const db = uniCloud.database()
	const db = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context 
	})
	let dbRes = {data:[]}
	if(['login','Logout','add','delete','update','query'].includes(action)){
		if(action === 'login'){
			dbRes = await db.collection('user').where({openid}).get()
			if(dbRes.data.length>0) return dbRes.data[0]
			else {
				dbRes = await db.collection("user").add({openid,...otherArgs})
				return dbRes
			}
		}
		if(action === 'update'){
			const dbRes = await db.collection('user').where({openid})
			  .update({
				...otherArgs
			  });
			  return dbRes
		}
		
	}
	//返回数据给客户端
	return event
};
