#! /usr/bin/env python3
# -*- coding:utf-8 -*-
from application import init_app, db
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
# 以下这些是便于使用者第一次使用时生成表到数据库，所以不要注释掉
from flask_cors import *
from application.apps.index.models import Department,Users,BaseModelview
from application.apps.index import api
from flask_babelex import Babel
from flask_admin import Admin
from flask_babelex import Babel
from flask_admin import Admin


app = init_app('dev')

# flask_admin
babel = Babel(app)
app.config['BABEL_DEFAULT_LOCALE'] = 'zh_CN'
admin = Admin(app, name='后台管理系统', template_mode='bootstrap3')
admin.add_view(BaseModelview(Users, db.session,name='用户管理'))
admin.add_view(BaseModelview(Department, db.session, name='部门管理'))

# CORS(app, supports_credentials=True)
# 使用终端脚本工具启动和管理flask
manager = Manager(app)

# 启用数据迁移工具
Migrate(app, db)


# 添加数据迁移的命令到终端脚本工具中
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':

    manager.run()
