'use strict';
// 新建用户和 更新信息
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.databaseForJQL({event,context })
	const {action,openid,...otherAgs} = event
	if(action === 'add'){
		let res = await db.collection('user').add({...otherAgs})
		return res
	}else if(action === 'update'){
		const res = await db.collection('user').where({openid}).update({...otherAgs});
		return res
	}else{
		return {code:500,errorMessage:'action 不对'}
	}
};
