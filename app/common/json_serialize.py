# -*- coding:utf-8 -*-
# !/usr/bin/env python3
# -*- coding: utf-8 -*-

import json


def json_serialize(obj):
    obj_dic = value2data(obj)
    return json.dumps(obj_dic)


def value2data(value):
    type_str = str(type(value))
    # print(type_str)
    if type_str == "<class 'list'>":
        # value 为列表
        for index in range(0, value.__len__()):
            value[index] = value2data(value[index])

    elif type_str.__contains__('dict'):
        for key in value:
            value[key] = value2data(value[key])

    elif type_str.__contains__('app.'):
        # value 为自定义类
        value = class2dict(value)

    return value


def class2dict(obj):
    obj_dic = {}

    for key in obj.__dict__.keys():
        value = value2data(obj.__dict__[key])
        if value is not None:
            obj_dic[key] = value

    return obj_dic
