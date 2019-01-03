/**
 * 居民管理管理初始化
 */
var PatientInfo = {
    id: "PatientInfoTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
PatientInfo.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '居民身份证', field: 'paientIdcard', visible: true, align: 'center', valign: 'middle'},
            {title: '姓名', field: 'paientName', visible: true, align: 'center', valign: 'middle'},
            {title: '医保余额', field: 'paientMoney', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
PatientInfo.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        PatientInfo.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加居民管理
 */
PatientInfo.openAddPatientInfo = function () {
    var index = layer.open({
        type: 2,
        title: '添加居民管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/patientInfo/patientInfo_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看居民管理详情
 */
PatientInfo.openPatientInfoDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '居民管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/patientInfo/patientInfo_update/' + PatientInfo.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除居民管理
 */
PatientInfo.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/patientInfo/delete", function (data) {
            Feng.success("删除成功!");
            PatientInfo.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("patientInfoId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询居民管理列表
 */
PatientInfo.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    PatientInfo.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = PatientInfo.initColumn();
    var table = new BSTable(PatientInfo.id, "/patientInfo/list", defaultColunms);
    table.setPaginationType("client");
    PatientInfo.table = table.init();
});
