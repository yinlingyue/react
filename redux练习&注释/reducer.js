}//相当于flux里面的dispatcher
//这是传送给store的信息
//告诉store要存什么
//告诉store遇到事情怎么办
//				state是个形参 createStore传过来的
export default function(state, action) {

	//默认的数据存储模式
	//真正的state是放在store里
	if (!state) {
		state = {
			items: [],
			redColor: false
		}
	}

	
	//如果有人给你传值是ADD_ITEM就要执行
	//Object.assign深拷贝（因为有个不成文的规矩 改变state 要深拷贝出来一个）
	//items输出的是：item:[...代表遍历state.items里面的内容, action.text]
	//{}和state合并  
	//生成了{item:[1,2,3]}
	//生成的{item:[1,2,3]} 和 最后一个参数做合并
	//{item:[1,2,3, 输入的值]}
	//也就是{item:[1,2,3]}和{item:[1,2,3, 输入的值]}做合并，合并给了前者
	//最后返回的是state的一个拷贝， 并非是state
	//返回的不是一个state，但是返回的是新要存储到state对象中的终值（redux要求这么返回的）
	if (action.type == "ADD_ITEM") {
		return Object.assign({}, state, {
			items: [...state.items, action.text]
		})                             
	}

	if (action.type == "CHANGE_COLOR") {
		return Object.assign({}, state, {
			redColor: !state.redColor
		})
	}

	//把默认的存储的数据state 返回给store
	return Object.assign({}, state);

