/**
 * 医生预约管理初始化
 */
var DoctorPoint = {
    id: "DoctorPointTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
DoctorPoint.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '编号', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '预约居民身份证', field: 'patientIdcard', visible: true, align: 'center', valign: 'middle'},
            {title: '居民姓名', field: 'patientName', visible: true, align: 'center', valign: 'middle'},
            {title: '医生姓名', field: 'doctorName', visible: true, align: 'center', valign: 'middle'},
            {title: '预约时间', field: 'pointDate', visible: true, align: 'center', valign: 'middle'},
            {title: '预约地点', field: 'pointPlace', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
DoctorPoint.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        DoctorPoint.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加医生预约
 */
DoctorPoint.openAddDoctorPoint = function () {
    var index = layer.open({
        type: 2,
        title: '添加医生预约',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/doctorPoint/doctorPoint_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看医生预约详情
 */
DoctorPoint.openDoctorPointDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '医生预约详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/doctorPoint/doctorPoint_update/' + DoctorPoint.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除医生预约
 */
DoctorPoint.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/doctorPoint/delete", function (data) {
            Feng.success("删除成功!");
            DoctorPoint.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("doctorPointId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询医生预约列表
 */
DoctorPoint.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    DoctorPoint.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = DoctorPoint.initColumn();
    var table = new BSTable(DoctorPoint.id, "/doctorPoint/list", defaultColunms);
    table.setPaginationType("client");
    DoctorPoint.table = table.init();
});
