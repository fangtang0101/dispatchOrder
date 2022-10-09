'use strict';
const appId = 'wxb196d2071dd07e29'
const appSecret = '943ca5f3ee08e94ef5108824d083b6b3'
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${event.code}&grant_type=authorization_code`
	  const res = await uniCloud.httpclient.request(url,{
		dataType:'json'
	  });
	//返回数据给客户端
	//从code2session的结果中取出openid
	const openid = res.data.openid;
	//获取云数据库对象
	const db = uniCloud.database();
	//dbRes为数据库操作结果对象
	let dbRes = await db.collection("user").where({openid}).get(); 
	//判断
	if (dbRes.data.length > 0) return dbRes.data[0]
	 else {
	  //新用户
	  const now = Date.now()
	  dbRes = await db.collection('user').add({createtime:now,openid})
	  return{
		  _id:dbRes.id,
		  openid,
		  createtime:now
	  }
	}
};
