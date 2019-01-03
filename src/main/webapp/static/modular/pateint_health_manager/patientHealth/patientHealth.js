/**
 * 居民健康信息管理管理初始化
 */
var PatientHealth = {
    id: "PatientHealthTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
PatientHealth.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: '编号', field: 'id', visible: true, align: 'center', valign: 'middle'},
        {title: '居民身份证', field: 'patientIdcard', visible: true, align: 'center', valign: 'middle'},
        {title: '居民姓名', field: 'patientName', visible: true, align: 'center', valign: 'middle'},
        {title: '心跳', field: 'heartJump', visible: true, align: 'center', valign: 'middle'},
        {title: '血压', field: 'bloodPressure', visible: true, align: 'center', valign: 'middle'},
        {title: '血氧', field: 'bloodOx', visible: true, align: 'center', valign: 'middle'},
        {title: '脉搏', field: 'pulse', visible: true, align: 'center', valign: 'middle'},
        {title: '测量日期', field: 'date', visible: true, align: 'center', valign: 'middle'}

    ];
};

/**
 * 检查是否选中
 */
PatientHealth.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        PatientHealth.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加居民健康信息管理
 */
PatientHealth.openAddPatientHealth = function () {
    var index = layer.open({
        type: 2,
        title: '添加居民健康信息管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/patientHealth/patientHealth_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看居民健康信息管理详情
 */
PatientHealth.openPatientHealthDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '居民健康信息管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/patientHealth/patientHealth_update/' + PatientHealth.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除居民健康信息管理
 */
PatientHealth.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/patientHealth/delete", function (data) {
            Feng.success("删除成功!");
            PatientHealth.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("patientHealthId", this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询居民健康信息管理列表
 */
PatientHealth.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    PatientHealth.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = PatientHealth.initColumn();
    var table = new BSTable(PatientHealth.id, "/patientHealth/list", defaultColunms);
    table.setPaginationType("client");
    PatientHealth.table = table.init();
});
