from application import jsonrpc
from flask import render_template, g, request, flash, redirect, url_for, json, jsonify
from flask.json import JSONEncoder
from .models import Users, Department, db
from sqlalchemy import or_
import hashlib


@jsonrpc.method("User.list(username=String)")
def user_list(username):
    """
    全部用户数据，现在是方便开发，所以将全部数据返回
    实际开发中，用户第一次查看公司应该只返回部门，然后点击对应部门再查询对应部门的员工信息。
    这么做的好处是，每次查询只需要用到部门表，极大提高了响应前端请求，减少数据库的压力
    :param username: 确认前端是否用户已登录（前端已校验，这么做是为了双重校验）
    :return: 返回除密码外的全部用户信息
    """
    # 校验用户是否存在
    username = username["username"]
    user_jc = Users.query.filter(Users.username == username).all()
    if len(user_jc) <= 0:
        return {"message": "fail", "error": "无此用户"}

    """用户列表，过滤已删除用户
    show 是否显示的用户
    deleted 是否删除用户
    desc 按照什么排序，下面是sort如果没有则按id排序
    你也可以用简单的:user_list_jc = Users.query.all()
    """
    user_list_jc = Users.query.filter(
        Users.is_show == True,
        Users.is_deleted == False
    ).order_by(
        db.desc(Users.sort),
        db.desc(Users.id)
    ).all()
    data = []
    for user in user_list_jc:
        """遍历对象信息并提取出来，__to_dict__是讲对象转化成字典的方法
        这里的filter是一种传参搜索的方法，还有filter_by则是赋值搜索，一般建议用前者，后者用or等搜索会比较麻烦
        """
        item = user.__to_dict__(['id', "username", 'mobile', 'department_id', 'create_time', 'update_time'])
        department_jc = Department.query.filter(Department.id == item["department_id"]).all()
        for user_department in department_jc:
            """将部门名称提取出来放到列表"""
            one_department_dic = user_department.__to_dict__(['name'])
            item["department_name"] = one_department_dic["name"]
        data.append(item)
    print("user_list_Data-------->", data)
    return data


@jsonrpc.method("Search.user(username=String)")
def search_user(username):
    """
    个人用户列表，未做密码检查
    :param username: 用户名
    :return: 返回用户个人信息
    """
    username = username["username"]
    user_jc = Users.query.filter(Users.username == username).all()
    data = []
    for user in user_jc:
        item = user.__to_dict__(['id', "username", 'mobile', 'department_id', 'create_time', 'update_time'])
        department_jc = Department.query.filter(Department.id == item["department_id"]).all()
        # print("department1--->", department_jc)
        for user_department in department_jc:
            """将部门名称提取出来放到列表"""
            user_department_item = user_department.__to_dict__(['name'])
            item["department_name"] = user_department_item["name"]
        data.append(item)
    print("search_user_data------>", data)
    return data


@jsonrpc.method("Add.user(data=String)")
def add_user(data):
    """
    添加用户
    :param data:传过来的data是字典类型的数据
    :return: 返回成功失败的结果
    为了数据更安全你可以增加事务回滚（一般在订单付款跟第三方支付的时候设置）
    try:
        # 这里写sql语句组 一旦发生异常执行rollback() 相当于什么都没执行
        connect.commit()
        return 'OK'
    except Exception as error:
        print(error)
        connect.rollback()    # 发生异常时执行回滚
        return 'Err'
    """
    user_list_jc = Users.query.filter(
        Users.is_show == True,
        Users.is_deleted == False
    ).order_by(
        db.desc(Users.sort),
        db.desc(Users.id)
    ).all()
    username_list = []
    department_list = []
    department_dic = {}
    for user in user_list_jc:
        user_item = user.__to_dict__(['id', "username"])
        username_list.append(user_item["username"])

    """获取部门名称"""
    department_list_jc = Department.query.filter(
        Department.is_show == True,
        Department.is_deleted == False
    ).order_by(
        db.desc(Department.sort),
        db.desc(Department.id)
    ).all()
    for department_one in department_list_jc:
        department_item = department_one.__to_dict__(['id', "name"])
        department_dic[department_item["name"]] = department_item['id']
        department_list.append(department_item["name"])
    """开始处理小程序发过来的数据"""
    data = data["data"]
    """验证数据"""
    if data["username"] != '' and data['password'] != '' and data['department'] != '' and data['phone'] != '':
        if data["username"] not in username_list and data['department'] in department_list:
            """校验成功后对密码加密并添加数据"""
            ret = hashlib.md5(data["username"].encode('utf-8'))  # 获取用户名，利用不同的用户名来做动态盐 username也可以切片取
            ret.update(data['password'].encode('utf-8'))
            data['password'] = ret.hexdigest()
            """下面如果飘背景颜色是正常的，因为还有值我没添加，让它自动生成"""
            user = Users(
                username=data["username"],
                password=data['password'],
                mobile=data['phone'],
                department_id=department_dic[data['department']],
            )
            db.session.add(user)  # 添加
            db.session.commit()  # 提交执行
            return {'message': 'success', "error": ""}
        else:
            return {'message': 'fail', 'error': '用户已存在'}

    else:
        return {'message': 'fail', 'error': '有值未填写'}


@jsonrpc.method("Edit.user(data=String)")
def edit_user(data):
    """
    修改用户信息
    :param data: 用户修改发过来的值
    :return: 返回修改成功或失败
    """
    """拿出department表"""
    department_list = []
    department_dic = {}

    # 获取全部部门信息
    department_list_jc = Department.query.filter(
        Department.is_show == True,
        Department.is_deleted == False
    ).order_by(
        db.desc(Department.sort),
        db.desc(Department.id)
    ).all()
    for department_one in department_list_jc:
        department_item = department_one.__to_dict__(['id', "name"])
        department_dic[department_item["name"]] = department_item['id']
        department_list.append(department_item["name"])
    """开始处理小程序发过来的数据"""
    data = data["data"]
    """验证数据"""
    if data["username"] != '' and data['password'] != '' and data['department'] != '' and data['phone'] != '':
        if data['department'] in department_list:
            """直接获取的是列表，里面包含着对象，要提取出来做单独对象才可以丢该"""
            user_jc = Users.query.filter(Users.username == data["username"]).all()
            user = user_jc[0]
            user.username = data["username"],
            user.password = data['password'],
            user.mobile = data['phone'],
            user.department_id = department_dic[data['department']],
            db.session.commit()
            return {'message': 'success', "error": ""}
        else:
            return {'message': 'fail', 'error': '修改失败'}

    else:
        return {'message': 'fail', 'error': '有值未填写'}


@jsonrpc.method("Search.data(search_data=String)")
def search_data(search_data):
    """
    模糊查询用户及电话号码，如果也要查询部门，则判断语句即可，或者在前端做选择让传过来的值有多个
    :param search_data: 用户名
    :return: 返回用户个人信息
    """
    print("search_data--------->", search_data, type(search_data))
    search_data_str = search_data["search_data"]
    res_list = Users.query.filter(
        or_(Users.username.contains(search_data_str), (Users.mobile.contains(search_data_str)))).all()
    data = []
    for user in res_list:
        item = user.__to_dict__(['id', "username", 'password', 'mobile', 'department_id', 'create_time', 'update_time'])
        department_jc = Department.query.filter(Department.id == item["department_id"]).all()
        for user_department in department_jc:
            """将部门名称提取出来放到列表"""
            user_department_item = user_department.__to_dict__(['name'])
            item["department_name"] = user_department_item["name"]
        data.append(item)
    print("search_data_data------>", data)
    return data


@jsonrpc.method("Department.list")
def department_list():
    """
    全部部门信息
    :return: 返回全部部门信息，并携带一个单独的部门名词列表
    """
    department_list_jc = Department.query.filter(
        Department.is_show == True,
        Department.is_deleted == False
    ).order_by(
        db.desc(Department.sort),
        db.desc(Department.id)
    ).all()
    data = []
    department_name_dic = {}
    department_name_list = []
    for department in department_list_jc:
        item = department.__to_dict__(['id', "name", 'describe', 'user_list', 'create_time', 'update_time'])
        department_name_list.append(item['name'])
        data.append(item)
    department_name_dic["name_list"] = department_name_list
    data.insert(0, department_name_dic)
    print("department_list_data--------->", data)
    return data
