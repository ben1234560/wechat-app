from application import db
from application.utils.models import BaseModel


# 这里只用到了1对多，如果想了解更多的数据库关系可以移步到我的博客有一篇SQLAlchemy写了
class Department(BaseModel, db.Model):
    """部门表
    tablename 表示注册到数据库的表名称
    primary_key: 主键
    comment: 字段注释
    relationship（其实不用写，多对多才用到）: 表示关系的表，前面的Users是对象名，backref表示对方可以通过它来查到这个表，lazy懒惰式动态加载（可以提高性能）
    """
    __tablename__ = "department"
    id = db.Column(db.Integer, primary_key=True, comment="ID")
    name = db.Column(db.String(64), nullable=True, comment="部门名称")
    describe = db.Column(db.String(512), nullable=False, comment="部门描述")
    user_list = db.relationship('Users', backref='department', lazy='dynamic')


class Users(BaseModel, db.Model):
    """用户信息
    ForeignKey 连接模型的外键，用User查department则是正向查询
    """
    __tablename__ = "tb_user"
    id = db.Column(db.Integer, primary_key=True, comment="主键ID")
    username = db.Column(db.String(64), index=True, comment="用户名")
    password = db.Column(db.String(64), index=True, comment="密码")
    mobile = db.Column(db.String(64), index=True, comment="手机")
    department_id = db.Column(db.Integer, db.ForeignKey("department.id"), comment="部门ID")
