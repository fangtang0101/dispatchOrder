'use strict';
/**
 * 此云函数主要用于 字典码的维护 包含如下表
 * table：表的名字 [skill]
 * 
 * @param {*} event  action[add,delete,update,query]
 * @param {*} context 
 */
const tableList = ['skill','project-status','user-status','job-position','registration-role','user','registration','job',"project"]
exports.main = async (event, context) => {
	// return {statusCode：400,message:'xxx'}
	//event为客户端上传的参数
	console.log('event : ', event)
	const { action,table,...otherArgs } = event;
	const db = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context 
	})
	let dbRes = {code:888,data:[]}
	if(!['add','delete','update','check'].includes(action)) return {errorMsg:'不支持该action的值'}
	if(!tableList.includes(table)) return {errorMsg:'不支持该table的值'}
	if(action === 'add'){
		dbRes = await db.collection(table).add({...otherArgs})
		return dbRes
	}
	// 查询 所有项目
	if(action === 'check'){
		dbRes = await db.collection('project,job').get() 
		return dbRes
	}
	//返回数据给客户端
	return event
};
