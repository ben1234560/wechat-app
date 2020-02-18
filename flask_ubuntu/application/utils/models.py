from application import db
from datetime import datetime
import copy


class BaseModel(object):
    """
    基础类
    default 自动生成创建时间
    onupdate 自动更新时间
    sort 排序，目前用不上，但是商场商品显示需要用
    is_deleted 是否删除
    is_show 是否显示
    """
    create_time = db.Column(db.DateTime, default=datetime.now, comment="创建时间")
    update_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, comment="更新时间")
    sort = db.Column(db.Integer, default=0, comment="排序")
    is_deleted = db.Column(db.Boolean, default=False, comment="逻辑删除")
    is_show = db.Column(db.Boolean, default=True, comment="是否显示")

    def __to_dict__(self, fields=None):
        """把模型转换成字典"""
        try:
            self.create_time = self.create_time.strftime("%Y-%m-%d %H:%M:%S")
        except:
            pass
        try:
            self.update_time = self.update_time.strftime("%Y-%m-%d %H:%M:%S")
        except:
            pass

        data = self.__dict__
        if fields is None:
            """
            深拷贝数据，很多时候我们都需要用到深拷贝，因为数据随时可能变化，如果是浅拷贝，后面数据变化是，也会跟着变化
            """
            data_dict = copy.deepcopy(data)
            if "_sa_instance_state" in data_dict:
                data_dict.pop("_sa_instance_state")
        else:
            data_dict = {}
            for key, value in data.items():
                if key in fields:
                    data_dict[key] = value
        return data_dict
